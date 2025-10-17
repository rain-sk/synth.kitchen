describe("redirect index route", () => {
  it("redirects unauthorized users to /patch/new", () => {
    cy.visit("/");
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain("/patch/new");
    });
  });

  it("redirects authorized users to /dashboard", () => {
    cy.visit("/");
    (cy as any).login(
      "test@synth.kitchen",
      "HbEPBNSht72RYcShk81BntMnf9yXWb83zc4m0s4xk7Ya0G7radVdMxpnPMCJYxU"
    );
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain("/dashboard");
    });
  });
});
