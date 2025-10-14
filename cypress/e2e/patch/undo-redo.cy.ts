describe("undo / redo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("creates an undo step when updating a numparam input", () => {
    cy.visit("/");

    cy.get("blank").click();

    cy.get("#start").should("exist");
    cy.get("#start").click({ force: true });

    cy.get("#undo").should("be.disabled");
    cy.get("#redo").should("be.disabled");

    // cy.get("#0 .numparam input").should("exist");
    // cy.get("#0 .numparam input").type("0.5{enter}");
    // // cy.get("#0 .numparam input").eq(0.5);

    // cy.get("#undo").should("not.be.disabled");
    // cy.get("#redo").should("be.disabled");
  });

  // it("restores the value of a numparam input with undo", () => {
  //   cy.visit("/");
  //   cy.get("blank").click();

  //   cy.get("button#start").should("exist");
  //   // cy.get("button#start").click();
  //   // cy.get("#undo").should("be.disabled");
  //   // cy.get("#redo").should("be.disabled");

  //   // cy.get("#0 .numparam input").type("0.5{enter}");
  //   // cy.get("#0 .numparam input").eq(0.5);

  //   // cy.get("#undo").should("not.be.disabled");
  //   // cy.get("#redo").should("be.disabled");

  //   // cy.get("#undo").click();
  //   // cy.get("#undo").should("be.disabled");
  //   // cy.get("#redo").should("not.be.disabled");
  // });
});
