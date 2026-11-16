describe("patch: toolbar", () => {
  beforeEach(() => {
    (cy as any).visitEditor("/patch/new");
  });

  // save-to-disk is not asserted: the SaveToDisk component is never rendered,
  // there is no entry point for it in the toolbar
  it("exposes stable ids for the toolbar controls", () => {
    ["patch-name", "save-to-cloud", "record", "undo", "redo"].forEach((id) =>
      cy.get(`#${id}`).should("exist"),
    );
  });

  it("names a new patch untitled", () => {
    cy.get("#patch-name")
      .should("have.value", "")
      .and("have.attr", "placeholder", "untitled");
  });

  it("renames the patch from the toolbar", () => {
    // the field gets recreated when the fetched patch lands, so cy.type() on its
    // own can land on a detached node. focus() re-resolves the subject first
    cy.get("#patch-name").should("exist").focus().type("testbed");

    cy.get("#patch-name").should("have.value", "testbed");
    cy.title().should("include", "patch/testbed");
  });
});
