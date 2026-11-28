
const EMAIL = "e2e-focus-steal@synth.kitchen";

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
		cy.deleteUserByApi(EMAIL);
	});

	after(() => {
		cy.deleteUserByApi(EMAIL);
	});

	it("moves focus to the error summary when a submission fails", () => {
		cy.visit("/login");
		cy.intercept("POST", "/api/auth/request-code").as("rc");
		cy.get("#email").type(EMAIL);
		cy.get("#submit").click();
		cy.wait("@rc").its("response.body.code").then(() => {
			cy.get("#code").focus().type("000000");
			cy.get("#submit").click();
			cy.get("#form-errors").should("be.visible").and("contain", "Something went wrong");
			activeId().should("equal", "form-errors");
		});
	});

	it("keeps focus in the field while typing over visible errors", () => {
		cy.visit("/login");
		cy.intercept("POST", "/api/auth/request-code").as("rc");
		cy.get("#email").type(EMAIL);
		cy.get("#submit").click();
		cy.wait("@rc").its("response.body.code").then(() => {
			cy.get("#code").focus().type("000000");
			cy.get("#submit").click();
			cy.get("#form-errors").should("contain", "Something went wrong");

			cy.get("#code").clear();
			typeKeepingFocus("code", "123456");
			cy.get("#code").should("have.value", "123456");
			activeId().should("equal", "code");

			cy.get("#form-errors").should("be.visible").and("contain", "Something went wrong");
		});
	});
});
