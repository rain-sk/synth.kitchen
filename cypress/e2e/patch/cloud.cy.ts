const api = (path: string) => `${Cypress.env("API_URL")}${path}`;

const EMAIL = "e2e-fixtures@synth.kitchen";
const PASSWORD = "password123";

const SEEDED_SLUG = "agile-able-attitude-c090f09e";

describe("patch: saved to the cloud", () => {
  let patch: { id: string; slug: string; name: string };
  let moduleIds: string[];

  before(() => {
    cy.request(api(`/patch?slug=${SEEDED_SLUG}`)).then((res) => {
      moduleIds = Object.keys(res.body.patch.state.state.modules);
      (cy as any)
        .seedPatch(EMAIL, PASSWORD, { state: res.body.patch.state })
        .then((created: any) => {
          patch = created;
        });
    });
  });

  after(() => {
    cy.deleteUserByApi(EMAIL, PASSWORD);
  });

  it("creates a patch with its own slug and name", () => {
    expect(patch.slug).to.be.a("string").and.not.equal(SEEDED_SLUG);
    expect(patch.name).to.be.a("string").and.not.equal("");
    expect(moduleIds.length).to.be.greaterThan(1);
  });

  it("serves it back over the api with its state", () => {
    cy.loginByApi(EMAIL, PASSWORD).then((token: string) =>
      cy.request({
        url: api(`/patch?id=${patch.id}`),
        headers: { authorization: `Bearer ${token}` },
      }),
    ).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body.patch.slug).to.equal(patch.slug);
      expect(Object.keys(res.body.patch.state.state.modules)).to.have.members(
        moduleIds,
      );
    });
  });

  it("renders it in the editor", () => {
    cy.loginByApi(EMAIL, PASSWORD);
    cy.visitEditor(`/patch/${patch.slug}`);

    cy.get("#module-canvas > div")
      .its("length")
      .should("be.equal", moduleIds.length);
  });
});
