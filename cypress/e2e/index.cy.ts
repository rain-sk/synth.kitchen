{
  const testEmail = "test@synth.kitchen";
  const testPassword = "HbEPBNSht72RYcS81BntMn@f9yXWb83zc4m0s7radVdMxpnPMCJYxU";

  describe("unauthenticated index route", () => {
    beforeEach(() => {
      cy.visit("/logout");
    });

    it("redirects unauthorized users to /patch/new", () => {
      cy.visit("/");
      cy.location().should((loc) => {
        expect(loc.pathname.toString()).to.contain("/patch/new");
      });
    });
  });

  describe("authenticated index route", () => {
    beforeEach(() => {
      (cy as any).register(testEmail, testPassword);
    });

    afterEach(() => {
      (cy as any).delete(testPassword);
    });

    it("redirects authorized users to /dashboard", () => {
      cy.visit("/");
      cy.location().should((loc) => {
        expect(loc.pathname.toString()).to.contain("/dashboard");
      });
    });
  });
}
