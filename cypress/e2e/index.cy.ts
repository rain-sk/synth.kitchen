describe("redirect unauthenticated user", () => {
  it("redirects to /patch/new", () => {
    cy.intercept("/patch/new").as("newPatch");
    cy.visit("/");
    cy.wait("@newPatch").then(() => {
      cy.get("#start").should("exist");
    });
  });
});
