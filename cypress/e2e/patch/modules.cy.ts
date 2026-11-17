/// <reference types="cypress" />

const OUTPUT = "#0";
const osc = () => cy.get(".module:not(#0)");

const addOscillator = () =>
	cy
		.get("#patch")
		.click(140, 160)
		.get("#add-module")
		.select("OSCILLATOR")
		.then(() => osc().should("have.length", 1));

const connectOscillatorToOutput = () =>
	cy
		.get('.connector[aria-roledescription="output connector"]')
		.then(($c) => `#${$c.toArray().filter((el) => el.id !== "0_1_0")[0].id}`)
		.then((out) => {
			cy.get(out).click();
			cy.get("#0_0_0").click();
			return cy.get("#connections [data-connection-key]").should("have.length", 1);
		});

context("modules", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");
	});

	it("selects a module by clicking its body, without opening the palette", () => {
		addOscillator().then(() => {
			cy.get("#add-module").should("not.exist");

			osc().click();
			osc().should("have.class", "selected");
			cy.get("#add-module").should("not.exist");
		});
	});

	// the guard is load-bearing: keyboard is the only removal path while the module menu
	// is commented out (module-ui/module-header.tsx), and it filters id '0' at
	// state/reducers/keyboard-event.ts
	it("cannot delete the output module", () => {
		addOscillator();

		osc().click();
		cy.get(OUTPUT).click();
		osc().should("not.have.class", "selected");

		cy.get(OUTPUT).should("have.class", "selected");
		cy.get("body").type("{backspace}");

		cy.get(OUTPUT).should("exist");
		osc().should("exist");
	});

	it("deletes a selected module and its cables", () => {
		addOscillator();
		connectOscillatorToOutput();

		osc().click();
		osc().should("have.class", "selected");

		cy.get("body").type("{backspace}");

		osc().should("not.exist");
		cy.get("#connections [data-connection-key]").should("have.length", 0);
		cy.get(OUTPUT).should("exist");
	});

	it("cannot delete the output module even while it is the only selection after a delete", () => {
		addOscillator();
		connectOscillatorToOutput();

		osc().click();
		cy.get("body").type("{backspace}");

		// selection falls to the output module's input, which is still '0'
		cy.get("body").type("{backspace}");

		cy.get(OUTPUT).should("exist");
		cy.get("#module-canvas > div").should("have.length", 1);
	});
});
