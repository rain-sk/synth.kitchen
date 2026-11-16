/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("register" as any, (email: string, password: string) => {
  cy.visit("/logout").wait(1000);
  cy.visit("/register");
  cy.get("#email").focus().type(email);
  cy.get("#password").focus().type(password);
  cy.get("#confirm-password").focus().type(`${password}{enter}`);
  cy.url().should("include", "/dashboard");
  cy.location().then((loc) => {
    if (loc.pathname.toString().includes("login")) {
      (cy as any).login(email, password);
    }
  });
  cy.visit("/logout").wait(1000);
});

Cypress.Commands.add("login" as any, (email: string, password: string) => {
  cy.visit("/logout");
  cy.visit("/login");
  cy.get("#email").focus().type(email);
  cy.get("#password").focus().type(`${password}{enter}`);
  cy.url().should("include", "dashboard");
});

Cypress.Commands.add("delete" as any, (email: string, password: string) => {
  // idempotent teardown: on a fresh database there is usually nothing to
  // delete, and then /login forwards to /register
  cy.visit("/logout");
  cy.visit("/login");
  cy.get("#email").focus().type(email);
  cy.get("#password").focus().type(`${password}{enter}`);

  cy.location("pathname", { timeout: 10000 }).then((pathname) => {
    if (pathname.includes("register") || pathname.includes("login")) {
      return; // no such user, nothing to delete
    }

    cy.visit("/account");
    cy.get("#delete").click();
    cy.get("#password").focus().type(password);
    cy.get("#confirm-delete").click();
  });
});
