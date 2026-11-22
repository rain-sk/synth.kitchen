/// <reference types="cypress" />

const dialog = "#auth-dialog";
const scrim = "#auth-scrim";

const editor = () => {
	(cy as any).visitEditor("/patch/new");
	cy.get("#patch").click(140, 420);
	cy.get("#add-module").select("OSCILLATOR");
	cy.get("#module-canvas > div").should("have.length", 2);
};

describe("auth modal", () => {
	it("stays closed without the param", () => {
		editor();
		cy.get(scrim).should("not.exist");
		cy.get(dialog).should("not.exist");
	});

	it("stays closed on a route it was never asked for", () => {
		editor();
		["/patch/random", "/login", "/register", "/reset-password"].forEach((path) => {
			cy.visit(path);
			cy.get(scrim).should("not.exist");
		});
	});

	it("ignores an unknown value", () => {
		editor();
		cy.location("pathname").then((pathname) => {
			cy.visit(`${pathname}?auth=whatever`);
			cy.get(scrim).should("not.exist");
		});
	});

	it("nav login opens it over the editor, canvas intact", () => {
		editor();
		cy.get("#nav-login").click();

		cy.location("search").should("include", "auth=login");
		cy.get(dialog).should("be.visible").and("have.attr", "aria-modal", "true");
		cy.get("#auth-dialog .auth-form").should("exist");
		cy.get("#module-canvas .module").should("have.length", 2);
		cy.focused().should("have.id", "email");
		cy.get("#nav-register").should("have.attr", "href").and("include", "auth=register");
	});

	it("nav register opens it in register mode", () => {
		editor();
		cy.get("#nav-register").click();

		cy.location("search").should("include", "auth=register");
		cy.get("#auth-title").should("have.text", "register");
		cy.get("#confirm-password").should("exist");
	});

	it("escape strips the param and keeps the others", () => {
		editor();
		cy.visit("/patch/new?keep=1&auth=login");
		cy.get(dialog).should("be.visible");
		cy.get(dialog).trigger("keydown", { key: "Escape", bubbles: true });

		cy.url().should("include", "keep=1").and("not.include", "auth=");
		cy.get(scrim).should("not.exist");
	});

	it("the close button strips the param and returns focus to the trigger", () => {
		editor();
		cy.get("#nav-login").click();
		cy.focused().should("have.id", "email");
		cy.get("#auth-close").click();

		cy.location("search").should("not.include", "auth=");
		cy.get(scrim).should("not.exist");
		cy.focused().should("have.id", "nav-login");
	});

	it("back closes the dialog instead of leaving the page", () => {
		editor();
		cy.get("#nav-login").click();
		cy.get(dialog).should("be.visible");

		cy.go("back");

		cy.location("pathname").should("eq", "/patch/new");
		cy.location("search").should("not.include", "auth=");
		cy.get(scrim).should("not.exist");
		cy.get("#module-canvas .module").should("have.length", 2);
	});

	it("clicking the backdrop closes it", () => {
		editor();
		cy.get("#nav-login").click();
		cy.get(scrim).click(20, 20);
		cy.get(scrim).should("not.exist");
	});

	it("the standalone page keeps hosting its own form", () => {
		cy.visit("/login");
		cy.get(dialog).should("not.exist");
		cy.get("#email").should("be.visible");
		cy.get("#submit").should("be.visible");
	});
});
