const SPEAKER_INPUT = "#0_0_0";
const OSC = "#module-canvas > div:not(#0)";

const output = () =>
	cy.get('.connector[aria-roledescription="output connector"]').first();

const positionOf = (selector: string) =>
	cy
		.get(selector)
		.should(($el) => {
			expect($el[0].style.left, "position painted").to.not.equal("");
		})
		.then(($el) => {
			const el = $el[0] as HTMLElement;
			return [parseFloat(el.style.left), parseFloat(el.style.top)];
		});

const radius = (selector: string) =>
	positionOf(selector).then((p) => Math.hypot(p[0], p[1]));

const renderOrder = () =>
	cy
		.get("#module-canvas > div")
		.then((divs) => Array.from(divs, (div) => div.id));

context("module reordering", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");

		cy.get("#patch").click(140, 160);
		cy.get("#add-module").select("OSCILLATOR");
		cy.get("#module-canvas > div").should("have.length", 2);

		output().click();
		cy.get(SPEAKER_INPUT).click();
		cy.get("#connections [data-connection-key]").should("have.length", 1);
	});

	it("keeps components mounted as render order changes", () => {
		radius("#0").then((speakerRadius) => {
			radius(OSC).then((oscRadius) => {
				expect(
					speakerRadius,
					"the output module starts further from the origin",
				).to.be.greaterThan(oscRadius);
			});
		});

		let oscElement: HTMLElement;
		let oscText: string;
		cy.get(OSC).then(($el) => {
			oscElement = $el[0];
			oscText = $el.text();
		});

		cy.get(OSC).click(20, 8).type("{rightarrow}".repeat(30));

		renderOrder().should(($order) => {
			expect($order[0], "output moves ahead in the sort").to.equal("0");
			expect($order[1], "oscillator reorders behind").to.equal(
				oscElement.id,
			);
		});

		cy.get(OSC).should(($el) => {
			expect(
				$el[0],
				"reordering must not remount the oscillator",
			).to.equal(oscElement);
		});
		cy.get(OSC).should(($el) => {
			expect($el.text(), "internal text survives reorder").to.equal(oscText);
		});
		cy.get("#connections [data-connection-key]").should("have.length", 1);
	});
});
