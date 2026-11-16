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
  // Idempotent teardown. This runs in beforeEach, so on a fresh database the
  // user usually does not exist yet - and then /login forwards to /register.
  // It does its own login rather than calling cy.login(), because login()
  // asserts a dashboard redirect and setup must not fail when there is
  // nothing to delete.
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

Cypress.Commands.add(
  "waitForUrl" as any,
  (patterns: string[], timeout = 5000) =>
    cy.location({ timeout } as any).then((loc) => {
      const pathname = loc.pathname;

      if (!patterns.some((pat) => pathname.includes(pat))) {
        throw new Error(
          `Expected URL to contain one of ${JSON.stringify(patterns)} but got "${pathname}"`,
        );
      }

      return pathname;
    }),
);
