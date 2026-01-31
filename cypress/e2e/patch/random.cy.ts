describe("unauthenticated /patch/random route", () => {
  before(() => {
    cy.visit("/logout");
  });

  it("loads a random patch", () => {
    cy.visit("/patch/random");
    cy.wait(1000);
    cy.url().should("not.contain", "/patch/new");
  });
});
