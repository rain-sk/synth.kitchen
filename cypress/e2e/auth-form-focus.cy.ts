
const EMAIL = "e2e-focus-steal@synth.kitchen";
const PASSWORD = "password123";

const activeId = () => cy.document().its("activeElement.id");

const typeKeepingFocus = (id: string, text: string) => {
	cy.get(`#${id}`).focus();
	text.split("").forEach((ch) => {
		cy.get(`#${id}`).type(ch);
		activeId().should("equal", id);
	});
};

describe("auth form focus", () => {
	beforeEach(() => {
		cy.visit("/logout");
		cy.deleteUserByApi(EMAIL, PASSWORD);
	});

	after(() => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
	});

	it("moves focus to the error summary when a submission fails", () => {
		cy.visit("/register");
		cy.get("#email").type(EMAIL);
		cy.get("#password").type(PASSWORD);
		cy.get("#confirm-password").type("different");
		cy.get("#submit").click();

		cy.get("#form-errors").should("be.visible").and("contain", "Passwords do not match");
		activeId().should("equal", "form-errors");
	});

	it("keeps focus in the field while typing over visible errors", () => {
		cy.visit("/register");
		cy.get("#email").type(EMAIL);
		cy.get("#password").type(PASSWORD);
		cy.get("#confirm-password").type("different");
		cy.get("#submit").click();
		cy.get("#form-errors").should("contain", "Passwords do not match");

		cy.get("#confirm-password").clear();
		typeKeepingFocus("confirm-password", "password123");
		cy.get("#confirm-password").should("have.value", "password123");
		activeId().should("equal", "confirm-password");

		cy.get("#email").should("have.value", EMAIL);
		typeKeepingFocus("email", "x");
		cy.get("#email").should("have.value", `${EMAIL}x`);

		cy.get("#form-errors").should("be.visible").and("contain", "Passwords do not match");
	});
});
