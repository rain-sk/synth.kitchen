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

    it("teardown actually deletes the user", () => {
      const email = "teardown@synth.kitchen";
      const api = Cypress.env("API_URL") as string;
      const login = () =>
        cy.request({
          method: "POST",
          url: `${api}/auth/login`,
          body: { email, password: testPassword },
          failOnStatusCode: false,
        });

      cy.request({
        method: "POST",
        url: `${api}/auth/register`,
        body: { email, password: testPassword },
        failOnStatusCode: false,
      });

      login().then((res) => {
        expect(res.status, "user exists before teardown").to.equal(200);

        (cy as any).delete(email, testPassword);

        login().then((after) => {
          expect(after.status, "login must fail once torn down").to.not.equal(200);
        });
      });
    });
  });
}
