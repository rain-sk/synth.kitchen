describe("patch: undo / redo", () => {
  beforeEach(() => {
    (cy as any).visitEditor("/patch/new");
  });

  it("creates an undo step when moving a module", () => {
    cy.get("button#undo").should("be.disabled");
    cy.get("button#redo").should("be.disabled");

    cy.get("#0").focus().type("{rightarrow}");

    cy.get("button#undo").should("not.be.disabled");
    cy.get("button#redo").should("be.disabled");
  });

  it("restores the position of a module with undo/redo", () => {
    // modules are positioned imperatively through a rAF batch (moveContainerRef → queueAnimation), so a
    // one-shot jQuery .position() snapshot can land before the app has painted anything and then never match
    // the restored value again — that was the intermittent failure here. read the position the app itself
    // wrote (style.left) and let Cypress retry until it settles
    const leftOf = () =>
      cy.get("#0").then(($el) => parseFloat(($el[0] as HTMLElement).style.left));

    cy.get("#0").should(($el) => {
      expect(($el[0] as HTMLElement).style.left, "module has been positioned").to.not.equal("");
    });

    cy.get("button#undo").should("be.disabled");
    cy.get("button#redo").should("be.disabled");

    let initialLeft = 0;
    let movedLeft = 0;

    leftOf().then((left) => {
      initialLeft = left;

      cy.get("#0").focus().type("{rightarrow}");

      leftOf().should((moved) => {
        expect(moved, "arrow moved the module").to.not.equal(initialLeft);
        movedLeft = moved;
      });

      cy.get("button#undo").should("not.be.disabled");
      cy.get("button#undo").trigger("click");

      cy.get("button#undo").should("be.disabled");
      cy.get("button#redo").should("not.be.disabled");
      cy.get("#0").should(($el) => {
        expect(
          parseFloat(($el[0] as HTMLElement).style.left),
          "undo restores the original position",
        ).to.equal(initialLeft);
      });

      cy.get("button#redo").trigger("click");

      cy.get("button#undo").should("not.be.disabled");
      cy.get("button#redo").should("be.disabled");
      cy.get("#0").should(($el) => {
        expect(
          parseFloat(($el[0] as HTMLElement).style.left),
          "redo re-applies the moved position",
        ).to.equal(movedLeft);
      });
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
});
