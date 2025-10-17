describe("patch: undo / redo", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#blank").trigger("click");
    cy.get("#start").should("exist").click({ force: true });
  });

  it("creates an undo step when moving a module", () => {
    cy.get("button#undo").should("be.disabled");
    cy.get("button#redo").should("be.disabled");

    cy.get("#0").focus().type("{rightarrow}");

    cy.get("button#undo").should("not.be.disabled");
    cy.get("button#redo").should("be.disabled");
  });

  it("restores the position of a module with undo/redo", () => {
    let initialPosition: any = undefined;
    let modifiedPosition: any = undefined;

    cy.get("#0")
      .then((div) => {
        initialPosition = div.position();
      })
      .focus()
      .type("{rightarrow}")
      .wait(100)
      .then((div) => {
        modifiedPosition = div.position();
        expect(modifiedPosition.left).to.not.equal(initialPosition.left);
      });

    cy.get("button#undo").trigger("click").wait(100);
    cy.get("button#undo").should("be.disabled");
    cy.get("button#redo").should("not.be.disabled");
    cy.get("#0").then((div) => {
      expect(div.position().left).to.equal(initialPosition.left);
    });

    cy.get("button#redo").trigger("click").wait(100);
    cy.get("button#undo").should("not.be.disabled");
    cy.get("button#redo").should("be.disabled");
    cy.get("#0").then((div) => {
      expect(div.position().left).to.deep.equal(modifiedPosition.left);
    });
  });

  it("creates an undo step when updating a numparam input", () => {
    cy.get("button#undo").should("be.disabled");
    cy.get("button#redo").should("be.disabled");

    cy.get("#0 .numparam input")
      .trigger("click")
      .type("0.5{enter}")
      .should("have.value", 0.5);

    cy.get("button#undo").should("not.be.disabled");
    cy.get("button#redo").should("be.disabled");
  });

  it("restores the value of a numparam input with undo/redo", () => {
    cy.get("#0 .numparam input")
      .trigger("click")
      .type("0.5{enter}")
      .should("have.value", 0.5);

    cy.get("button#undo").trigger("click");
    cy.get("#0 .numparam input").should("have.value", 0.45);
    cy.get("button#undo").should("be.disabled");
    cy.get("button#redo").should("not.be.disabled");

    cy.get("button#redo").trigger("click");
    cy.get("#0 .numparam input").should("have.value", 0.5);
    cy.get("button#undo").should("not.be.disabled");
    cy.get("button#redo").should("be.disabled");
  });

  it("fails", () => {
    expect(true).to.equal(false);
  });
});
