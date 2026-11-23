

const SPEAKER_INPUT = "#0_0_0";

const output = () =>
	cy.get('.connector[aria-roledescription="output connector"]').first();

const dragSelect = (from: [number, number], to: [number, number]) =>
	cy
		.get("#patch")
		.trigger("mousedown", from[0], from[1], { button: 0 })
		.trigger("mousemove", to[0], to[1], { button: 0 })
		.trigger("mouseup", to[0], to[1], { button: 0 });

context("patch: drag select survives missing DOM", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");

		cy.get("#patch").click(140, 160);
		cy.get("#add-module").select("OSCILLATOR");
		cy.get("#module-canvas > div").should("have.length", 2);

		output().click();
		cy.get(SPEAKER_INPUT).click();
		cy.get("#connections [data-connection-key]").should("have.length", 1);
	});

	it("ignores a connection whose connector element is gone", () => {
		cy.get("#connections [data-connection-key]")
			.first()
			.then(($cable) => {
				const inputKey = $cable.attr("data-input-key") as string;

				cy.window().then((win) => {
					expect(
						win.document.getElementById(inputKey),
						"the connector is in the DOM before we take it away",
					).to.not.be.null;

					win.document.getElementById(inputKey)!.remove();

					dragSelect([40, 40], [700, 520]);

					cy.get("#patch").should("exist");
					cy.get(".crash").should("not.exist");
					cy.get(".module").should("have.length", 2);
					cy.get("#connections").should("exist");
				});
			});
	});

	it("ignores modules when the nav is not in the DOM", () => {
		cy.window().then((win) => {
			win.document.getElementsByTagName("nav")[0].remove();

			dragSelect([40, 40], [700, 520]);

			cy.get("#patch").should("exist");
			cy.get(".crash").should("not.exist");
		});
	});

});
