
const visitCrash = (region: string, start = true) => {
	cy.visit(`/patch/new?crash=${region}`, {
		onBeforeLoad: (win: Window) => {
			cy.stub(win.navigator, "requestMIDIAccess").resolves({
				inputs: new Map(),
				outputs: new Map(),
				state: "connected",
				on: () => {},
				onstatechange: null,
			} as any);
		},
	});

	if (start) {
		cy.get("#start").click({ force: true });
	}
};

context("patch: error boundary", () => {
	beforeEach(() => {
		Cypress.on("uncaught:exception", (err) =>
			!String(err?.message ?? err).includes("deliberate crash"),
		);
	});

	it("catches a canvas crash and keeps the shell", () => {
		visitCrash("canvas");

		cy.get("#crash-canvas").should("exist");
		cy.get("#crash-canvas").should("have.attr", "role", "alert");
		cy.get("#module-canvas").should("not.exist");
		cy.get("#crash-details").should("contain", "deliberate crash");

		cy.window().then((win) => {
			const crash = (win as any).__synthCrash;
			expect(crash, "crash recorded").to.exist;
			expect(crash.region, "region").to.equal("canvas");
			expect(crash.message, "message").to.contain("deliberate crash");
			expect(crash.patch, "patch state captured for salvage").to.exist;
		});
	});

	it("recovers without a reload", () => {
		visitCrash("canvas");

		cy.get("#crash-canvas").should("exist");

		cy.window().then((win) => ((win as any).__synthCrashOn = false));
		cy.get("#crash-try-again").click();

		cy.get("#crash-canvas").should("not.exist");
		cy.get("#crash-recovered").should("exist");
	});

	it("offers the patch as json for salvage", () => {
		visitCrash("canvas");

		cy.get("#crash-copy-patch").should("exist");
		cy.get("#crash-download-patch").should("exist");
	});

	it("catches a crash above the router", () => {
		visitCrash("app", false);

		cy.get("#crash-app").should("exist");
		cy.get("#crash-copy-patch").should("not.exist");

		cy.window().then((win) => ((win as any).__synthCrashOn = false));
		cy.get("#crash-try-again").click();

		cy.get("#crash-app").should("not.exist");
		cy.get("#crash-recovered").should("exist");
	});
});
