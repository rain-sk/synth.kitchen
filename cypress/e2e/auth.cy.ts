{
  const testEmail = "test@synth.kitchen";
  const testPassword = "HbEPBNSht72RYcS81BntMn@f9yXWb83zc4m0s7radVdMxpnPMCJYxU";

  describe("auth", () => {
    before(() => {
      (cy as any).delete(testEmail, testPassword);
    });
    beforeEach(() => {
      cy.visit("/logout");
      cy.clearAllLocalStorage();
    });
    afterEach(() => {
      (cy as any).delete(testEmail, testPassword);
    });

    it("is possible to register", () => {
      cy.visit("/register");
      cy.get("#email").focus().type(testEmail);
      cy.get("#password").focus().type(testPassword);
      cy.get("#confirm-password").focus().type(testPassword);
      cy.get("#submit").trigger("click");
      cy.wait(10000);

      cy.url().should("include", "account");
      cy.getAllLocalStorage().then((result) => {
        expect(result["http://localhost:8080"]).to.have.key("jwt");
      });
    });

    it("is possible to login", () => {
      (cy as any).register(testEmail, testPassword);
      cy.visit("/logout").wait(100);

      cy.get("#email").focus().type(testEmail);
      cy.get("#password").focus().type(testPassword);
      cy.get("#submit").trigger("click");

      cy.wait(10000);

      cy.url().should("include", "account");
      cy.getAllLocalStorage().then((result) => {
        expect(result["http://localhost:8080"]).to.have.key("jwt");
      });
    });
  });
}
