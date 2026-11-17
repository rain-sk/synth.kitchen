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

	it("offers a retry when saving fails", () => {
		stubCreate({ statusCode: 500, body: { error: "boom" } });

		cy.get("#save-to-cloud").click();

		cy.get(".toast.error")
			.should("contain.text", "could not save")
			.and("contain.text", "try again");

		cy.get(".toast.error .toast-action").click();

		cy.get('[data-toast-key^="save:"]').should("exist");
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
