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
  cy.wait(2000);
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
  cy.wait(2000);
});

Cypress.Commands.add("delete" as any, (email: string, password: string) => {
  cy.visit("/account");
  cy.location().then((loc) => {
    if (loc.pathname.toString().includes("login")) {
      (cy as any).login(email, password).wait(2000);
      cy.visit("/account");
    }
  });
  cy.get("#delete").trigger("click");
  cy.get("#password").focus().type(`${password}{enter}`);
});
