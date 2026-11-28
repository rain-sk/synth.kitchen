{
  const testEmail = "e2e-test@synth.kitchen";

  describe("auth", () => {
    beforeEach(() => {
      (cy as any).delete(testEmail);
      cy.clearAllLocalStorage();
    });

    it("signs in through the email-code flow (new account)", () => {
      cy.visit("/login");
      cy.intercept("POST", "/api/auth/request-code").as("rc");
      cy.get("#email").focus().type(testEmail);
      cy.get("#submit").click();
      cy.wait("@rc").its("response.body.code").then((code: string) => {
        cy.get("#code").focus().type(code);
        cy.get("#submit").click();
      });
      cy.url().should("include", "/dashboard");
      cy.getAllLocalStorage().then((result) => {
        const store = result[Cypress.config("baseUrl") as string];
        expect(store, `localStorage at ${Cypress.config("baseUrl")}`).to.have.key("jwt");
        (cy as any).delete(testEmail);
      });
    });

    it("signs in again after logout", () => {
      cy.visit("/login");
      cy.intercept("POST", "/api/auth/request-code").as("rc");
      cy.get("#email").focus().type(testEmail);
      cy.get("#submit").click();
      cy.wait("@rc").its("response.body.code").then((code: string) => {
        cy.get("#code").focus().type(code);
        cy.get("#submit").click();
      });
      cy.url().should("include", "/dashboard");

      cy.visit("/logout").wait(1500);
      cy.visit("/login");
      cy.get("#email", { timeout: 15000 }).focus().type(testEmail);
      cy.get("#submit").click();
      cy.wait("@rc").its("response.body.code").then((code: string) => {
        cy.get("#code").focus().type(code);
        cy.get("#submit").click();
      });
      cy.url().should("include", "dashboard");
      (cy as any).delete(testEmail);
    });

    it("invalidates the code on a wrong guess", () => {
      cy.visit("/login");
      cy.intercept("POST", "/api/auth/request-code").as("rc");
      cy.get("#email").focus().type("e2e-invalidate@synth.kitchen");
      cy.get("#submit").click();
      cy.wait("@rc").its("response.body.code").then((code: string) => {
        const wrong = code === "000000" ? "000001" : "000000";
        cy.get("#code").focus().type(wrong);
        cy.get("#submit").click();
        cy.get("#form-errors").should("contain.text", "Something went wrong");
        cy.get("#code").focus().type(code);
        cy.get("#submit").click();
        cy.get("#form-errors").should("contain.text", "Something went wrong");
        (cy as any).delete("e2e-invalidate@synth.kitchen");
      });
    });
  });
}
