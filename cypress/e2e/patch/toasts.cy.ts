/// <reference types="cypress" />

const stubCreate = (response: Partial<Cypress.ResponseOptions<any>>) =>
	cy.intercept("POST", "**/api/patch/", response).as("create");

describe("patch: toasts", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");
	});

	it("mounts a polite and an assertive live region", () => {
		cy.get('[role="status"][aria-live="polite"]').should("exist");
		cy.get('[role="alert"][aria-live="assertive"]').should("exist");
	});

	it("sits above the toolbar without covering it", () => {
		stubCreate({ body: { patch: { id: "t1", slug: "toast-anchor" } } });

		cy.get("#save-to-cloud").click();
		cy.get(".toast").first().should("exist");

		cy.window().then((win) => {
			const toast = win.document
				.querySelector(".toast")!
				.getBoundingClientRect();
			const toolbar = win.document
				.querySelector(".toolbar")!
				.getBoundingClientRect();

			expect(toast.bottom, "toast clears the toolbar").to.be.at.most(
				toolbar.top + 1,
			);
			expect(toast.right, "toast hugs the right edge").to.be.closeTo(
				win.innerWidth - 8,
				12,
			);
		});
	});

	it("announces saving, then saved, in one toast", () => {
		stubCreate({
			delay: 800,
			body: { patch: { id: "t1", slug: "toast-saved" } },
		});

		cy.get("#save-to-cloud").click();

		cy.get('[data-toast-key^="save:"]').should("have.length", 1);
		cy.get(".toast.pending").should("contain.text", "saving");

		cy.get(".toast.success").should("contain.text", "saved");
		cy.get('[data-toast-key^="save:"]').should("have.length", 1);
	});

	it("survives the navigation that a new patch triggers", () => {
		stubCreate({ body: { patch: { id: "t1", slug: "toast-navigation" } } });

		cy.get("#save-to-cloud").click();

		cy.location("pathname").should("include", "toast-navigation");
		cy.get(".toast.success").should("contain.text", "saved");
	});

	it("offers a retry, and the retry reports back while in flight", () => {
		let attempts = 0;
		cy.intercept("POST", "**/api/patch/", (req) => {
			attempts += 1;
			if (attempts === 1) {
				req.reply({ statusCode: 500, body: { error: "boom" } });
			} else {
				req.reply({
					delay: 900,
					body: { patch: { id: "t1", slug: "toast-retry" } },
				});
			}
		}).as("create");

		cy.get("#save-to-cloud").click();

		cy.get(".toast.error")
			.should("contain.text", "could not save")
			.and("contain.text", "try again");

		cy.get(".toast.error .toast-action").click();

		// the retry has to say so while it is still running: the bubble must go back to pending,
		// not vanish until the request lands
		cy.get(".toast.pending").should("contain.text", "saving");
		cy.get(".toast.error").should("not.exist");
		cy.get('[data-toast-key^="save:"]').should("have.length", 1);

		cy.wait("@create");
		cy.get(".toast.success").should("contain.text", "saved");
		cy.get('[data-toast-key^="save:"]').should("have.length", 1);
	});

	it("keeps the same bubble node across pending→success", () => {
		// guards against Bubble being declared inside ToastsProvider: a component type created during
		// render is a new type every render, so React remounts the bubble on each state change. That
		// re-runs the entry animation mid-notification, swaps the live-region text with remove+add instead
		// of updating it, and drops focus off .toast-action for keyboard users
		cy.intercept("POST", "**/api/patch/", {
			delay: 1500,
			body: { patch: { id: "t1", slug: "toast-node-identity" } },
		});

		cy.get("#save-to-cloud").click();
		cy.get(".toast.pending").should("exist");

		cy.document().then((doc) => {
			(doc.querySelector('[data-toast-key^="save:"]') as HTMLElement).dataset.probeMark = "1";

			cy.get(".toast.success", { timeout: 8000 }).should("exist");
			cy.document().then((doc2) => {
				const after = doc2.querySelector('[data-toast-key^="save:"]') as HTMLElement | null;
				expect(
					after && after.dataset.probeMark,
					"bubble must be updated in place, not remounted",
				).to.equal("1");
			});
		});
	});

	it("dismisses after 15 seconds", () => {
		stubCreate({ body: { patch: { id: "t1", slug: "toast-ttl" } } });

		cy.get("#save-to-cloud").click();
		cy.get(".toast").first().should("exist");

		cy.get('[data-toast-key^="save:"]', { timeout: 16000 }).should(
			"not.exist",
		);
	});

	it("dismisses on click", () => {
		stubCreate({ body: { patch: { id: "t1", slug: "toast-click" } } });

		cy.get("#save-to-cloud").click();
		cy.get('[data-toast-key^="save:"]').should("exist");

		cy.get(".toast .toast-dismiss").first().click();

		cy.get('[data-toast-key^="save:"]').should("not.exist");
	});
});
