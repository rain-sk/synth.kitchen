describe("redirect unauthenticated user", () => {
  it("redirects to /patch/new", () => {
    cy.visit("/");
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain("/patch/new");
    });
  });
});
