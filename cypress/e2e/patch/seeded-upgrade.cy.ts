const CURRENT_PATCH_STATE_VERSION = "0.5.8";
const CURRENT_CONNECTIONS_STATE_VERSION = "0.5.7";

const SEEDED_SLUG = "agile-able-attitude-c090f09e";

const api = (path: string) => `${Cypress.env("API_URL")}${path}`;

describe("patch: boot-time upgrade of seeded patches", () => {
  it("reports no pending state upgrades", () => {
    cy.request(api("/health/status")).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body.pendingStateUpgrades).to.equal(0);
    });
  });

  it("serves a seeded patch in the current state format", () => {
    cy.request(api(`/patch?slug=${SEEDED_SLUG}`)).then((res) => {
      expect(res.status).to.equal(200);
      const state = res.body.patch.state.state;

      expect(state.version).to.equal(CURRENT_PATCH_STATE_VERSION);
      expect(state.connections.version).to.equal(
        CURRENT_CONNECTIONS_STATE_VERSION,
      );

      const keys = Object.keys(state.connections.state);
      expect(keys.length).to.be.greaterThan(0);
      for (const key of keys) {
        expect(key, `connection key ${key}`).to.not.equal("modules");
        expect(key, `connection key ${key}`).to.not.equal("modulePositions");
        expect(state.connections.state[key], key).to.have.lengthOf.at.least(2);
      }

      const unversioned = Object.values(state.modules)
        .filter((module: any) => typeof module.state?.version !== "string")
        .map((module: any) => module.type);
      expect(unversioned, "unversioned module states").to.deep.equal([]);
    });
  });

  it("renders the modules of a seeded patch", () => {
    (cy as any).visitEditor(`/patch/${SEEDED_SLUG}`);

    cy.get("#module-canvas > div").its("length").should("be.greaterThan", 1);

    cy.get("#connections")
      .should("have.prop", "tagName", "svg")
      .and(($c) => {
        expect(
          $c.find("[data-connection-key]").length,
          "rendered cables",
        ).to.be.greaterThan(0);
      });

    cy.get(".connector")
      .its("length")
      .then((count) => expect(count, "module ports").to.be.greaterThan(10));
  });
});
