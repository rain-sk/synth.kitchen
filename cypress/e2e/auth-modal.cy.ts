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

	it("an unknown account reports in place instead of bouncing to /register", () => {
		editor();
		cy.get("#nav-login").click();
		cy.get("#email").type("nobody-here@synth.kitchen");
		cy.get("#password").type("wrong-password");
		cy.get("#submit").click();

		cy.get(dialog).should("be.visible");
		cy.location().should((loc) => {
			expect(loc.pathname, "never left the editor").to.equal("/patch/new");
			expect(loc.search, "still the dialog").to.include("auth=login");
		});
		cy.get("#module-canvas > div").should("have.length", 2);
		cy.get("#form-errors").should("contain.text", "no account for that email");
	});

	it("the dialog's own switch changes mode without leaving the page", () => {
		editor();
		cy.get("#nav-login").click();
		cy.get("#email").type("nobody-here@synth.kitchen");
		cy.get("#password").type("wrong-password");
		cy.get("#submit").click();
		cy.get("#form-errors").should("contain.text", "no account");

		cy.get("#auth-switch").click();

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

	it("an unknown account reports in place instead of bouncing to /register", () => {
		editor();
		cy.get("#nav-login").click();
		cy.get("#email").type("nobody-here@synth.kitchen");
		cy.get("#password").type("wrong-password");
		cy.get("#submit").click();

		cy.get(dialog).should("be.visible");
		cy.location().should((loc) => {
			expect(loc.pathname, "never left the editor").to.equal("/patch/new");
			expect(loc.search, "still the dialog").to.include("auth=login");
		});
		cy.get("#module-canvas > div").should("have.length", 2);
		cy.get("#form-errors").should("contain.text", "no account for that email");
	});

	it("the standalone page keeps hosting its own form", () => {
		cy.visit("/login");
		cy.get(dialog).should("not.exist");
		cy.get("#email").should("be.visible");
		cy.get("#submit").should("be.visible");
	});
});

const api = (path: string) => `${Cypress.env("API_URL")}${path}`;
const EMAIL = "e2e-modal@synth.kitchen";
const PASSWORD = "password123";

describe("auth modal: interrupted save", () => {
	beforeEach(() => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
		cy.clearAllLocalStorage();
		editor();
	});

	after(() => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
		cy.clearAllLocalStorage();
	});

	it("asks to sign in instead of firing a save that cannot succeed", () => {
		cy.window().then((win) => ((win as any).__probe = "alive"));

		cy.get("#save-to-cloud").click();

		cy.get(dialog).should("be.visible").and("contain.text", "register");
		cy.location("search").should("include", "auth=register");
		cy.get("#module-canvas .module").should("have.length", 2);
		cy.get(".toast.info").should("contain.text", "sign in to save");
	});

	it("closes without a reload and completes the save it was asked for", () => {
		cy.window().then((win) => ((win as any).__probe = "alive"));

		cy.get("#save-to-cloud").click();
		cy.get(dialog).should("be.visible");

		cy.get("#email").type(EMAIL);
		cy.get("#password").type(PASSWORD);
		cy.get("#confirm-password").type(PASSWORD);
		cy.get("#submit").click();

		cy.window().should((win) => {
			expect((win as any).__probe, "same window: no reload").to.equal("alive");
		});
		cy.get(scrim).should("not.exist");
		cy.location("search").should("not.include", "auth=");
		cy.get("#module-canvas .module").should("have.length", 2);
		cy.get(".toast.success").should("contain.text", "saved");

		cy.getAllLocalStorage().then((result) => {
			// stored JSON-stringified, the way useJwt reads it back
			const jwt = JSON.parse(result[Cypress.config("baseUrl") as string].jwt);
			expect(jwt, "session from the registration jwt").to.be.a("string").and.not.empty;
			cy.request({
				url: api("/auth/user"),
				headers: { authorization: `Bearer ${jwt}` },
			})
				.then((res) => {
					expect(res.status).to.equal(200);
					return cy.request({
						url: api(`/patch?creatorId=${res.body.user.id}`),
						headers: { authorization: `Bearer ${jwt}` },
					});
				})
				.then((res) => {
					expect(res.status).to.equal(200);
					expect(
						res.body.patches,
						"an account created seconds ago already owns the patch",
					).to.have.length(1);
				});
		});
	});

	it("returns focus to the save button when the dialog closes", () => {
		cy.get("#save-to-cloud").click();
		cy.focused().should("have.id", "email");
		cy.get("#auth-close").click();
		cy.focused().should("have.id", "save-to-cloud");
	});
});
