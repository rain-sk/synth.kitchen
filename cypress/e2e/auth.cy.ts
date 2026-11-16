{
  const testEmail = "test@synth.kitchen";
  const testPassword = "HbEPBNSht72RYcS81BntMn@f9yXWb83zc4m0s7radVdMxpnPMCJYxU";

  describe("auth", () => {
    beforeEach(() => {
      (cy as any).delete(testEmail, testPassword);
      cy.clearAllLocalStorage();
    });

    it("is possible to register", () => {
      cy.visit("/register");
      cy.get("#email").focus().type(testEmail);
      cy.get("#password").focus().type(testPassword);
      cy.get("#confirm-password").focus().type(`${testPassword}{enter}`);
      cy.url().should("include", "/dashboard");
      cy.getAllLocalStorage().then((result) => {
        const store = result[Cypress.config("baseUrl") as string];
        expect(store, `localStorage at ${Cypress.config("baseUrl")}`).to.have.key(
          "jwt",
        );
        (cy as any).delete(testEmail, testPassword);
      });
    });

    it("is possible to login", () => {
      (cy as any).register(testEmail, testPassword);
      cy.visit("/logout").wait(100);

      cy.get("#email").focus().type(testEmail);
      cy.get("#password").focus().type(`${testPassword}{enter}`);

      cy.url().should("include", "dashboard");
      cy.getAllLocalStorage().then((result) => {
        const store = result[Cypress.config("baseUrl") as string];
        expect(store, `localStorage at ${Cypress.config("baseUrl")}`).to.have.key(
          "jwt",
        );
        expect(store.jwt).to.exist;
      });
    });
  });
}
