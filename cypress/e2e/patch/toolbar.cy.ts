describe("patch: toolbar", () => {
  beforeEach(() => {
    (cy as any).visitEditor("/patch/new");
  });

  it("exposes stable ids for the toolbar controls", () => {
    ["patch-name", "save-to-cloud", "record", "undo", "redo", "draft-reset"].forEach((id) =>
      cy.get(`#${id}`).should("exist"),
    );
  });

  it("names a new patch untitled", () => {
    cy.get("#patch-name")
      .should("have.value", "")
      .and("have.attr", "placeholder", "untitled");
  });

  it("renames the patch from the toolbar", () => {
    cy.get("#patch-name").should("exist").focus().type("testbed");

    cy.get("#patch-name").should("have.value", "testbed");
    cy.title().should("include", "patch/testbed");
  });
});
