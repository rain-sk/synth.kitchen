// The api upgrades every saved patch state at boot, in one transaction, and
// refuses to start if any state is left un-upgraded. These specs run that path
// against the patches that SeedPatches inserts (see
// app/api/src/migration/seeds/patches.ts), which are pre-0.5.6: no patch state
// version, no connections version, and module states with no version at all.
//
// Versions are spelled out here on purpose, rather than imported from
// synth.kitchen-shared: a bump to PATCH_STATE_VERSIONS should make this spec
// fail loudly so the upgrade chain gets a new step instead of silently
// short-circuiting.
const CURRENT_PATCH_STATE_VERSION = "0.5.8";
const CURRENT_CONNECTIONS_STATE_VERSION = "0.5.7";

// first patch in seeds/patches.ts, so the fixture is deterministic
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

      // a 0.5.5 connections map was flat; it has to have been wrapped, not
      // copied from the patch state
      const keys = Object.keys(state.connections.state);
      expect(keys.length).to.be.greaterThan(0);
      for (const key of keys) {
        expect(key, `connection key ${key}`).to.not.equal("modules");
        expect(key, `connection key ${key}`).to.not.equal("modulePositions");
        expect(state.connections.state[key], key).to.have.lengthOf.at.least(2);
      }

      // every module has to carry a version, or it still needs upgrading
      const unversioned = Object.values(state.modules)
        .filter((module: any) => typeof module.state?.version !== "string")
        .map((module: any) => module.type);
      expect(unversioned, "unversioned module states").to.deep.equal([]);
    });
  });

  it("renders the modules and cables of a seeded patch", () => {
    cy.visit(`/patch/${SEEDED_SLUG}`);
    cy.get("#start").click();
    cy.get("#patch", { timeout: 10000 }).should("exist");

    cy.get("#module-canvas > div").its("length").should("be.greaterThan", 1);

    // cables are painted onto a canvas, not drawn as svg paths, so the only
    // honest assertion is whether anything was painted at all. should() polls,
    // because the drawing happens in a requestAnimationFrame.
    cy.get("#connections")
      .should("have.prop", "tagName", "CANVAS")
      .should(($canvas) => {
        const canvas = $canvas[0] as HTMLCanvasElement;
        expect(canvas.width, "canvas width").to.be.greaterThan(0);
        const ctx = canvas.getContext("2d");
        expect(ctx, "canvas context").to.not.equal(null);
        const { data } = ctx!.getImageData(0, 0, canvas.width, canvas.height);
        let painted = 0;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] !== 0) painted++;
        }
        expect(painted, "painted cable pixels").to.be.greaterThan(0);
      });
  });
});
