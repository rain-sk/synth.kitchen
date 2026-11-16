const EMPTY_CANVAS_CLICK: [number, number] = [120, 140];

const openBlankPatch = () => {
  (cy as any).visitEditor("/patch/new");
  cy.get("#0").should("exist");
};

describe("patch: adding modules", () => {
  beforeEach(openBlankPatch);

  it("opens the palette where the empty canvas was clicked", () => {
    cy.get("#add-module").should("not.exist");

    cy.get("#patch").click(...EMPTY_CANVAS_CLICK);

    cy.get("#add-module").should("be.visible").should("have.focus");

    cy.get("#patch").then(($patch) => {
      const rect = $patch[0].getBoundingClientRect();
      cy.get("#add-module").should(($picker) => {
        const box = $picker[0].getBoundingClientRect();
        expect(box.left + box.width / 2).to.be.closeTo(
          rect.left + EMPTY_CANVAS_CLICK[0],
          40,
        );
        expect(box.top + box.height / 2).to.be.closeTo(
          rect.top + EMPTY_CANVAS_CLICK[1] - 40,
          40,
        );
      });
    });
  });

  it("closes the palette with escape", () => {
    cy.get("#patch").click(...EMPTY_CANVAS_CLICK);
    cy.get("#add-module").should("be.visible");

    cy.get("#add-module").type("{esc}");

    cy.get("#add-module").should("not.exist");
  });

  it("does not open the palette when clicking a module", () => {
    cy.get("#0")
      .then(($module) => {
        const box = $module[0].getBoundingClientRect();
        cy.get("#patch").then(($patch) => {
          const rect = $patch[0].getBoundingClientRect();
          cy.get("#patch").click(
            Math.round(box.left + box.width / 2 - rect.left),
            Math.round(box.top + box.height / 2 - rect.top),
          );
        });
      })
      .wait(200);

    cy.get("#add-module").should("not.exist");
  });

  it("adds the chosen module at the clicked position", () => {
    cy.get("#patch").click(...EMPTY_CANVAS_CLICK);
    cy.get("#add-module").select("OSCILLATOR");

    cy.get("#module-canvas > div")
      .its("length")
      .should("equal", 2)
      .then(() => {
        cy.get("#module-canvas > div:not(#0)").should("contain.text", "oscillator");
      });
  });
});
