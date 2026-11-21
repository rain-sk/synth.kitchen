/// <reference types="cypress" />

// regression: drag-select over a canvas whose connector element has gone away.
//
// connectionsInRange looked its rects up with `?.getBoundingClientRect()` and then
// dereferenced them without checking, so a connector that was not in the DOM threw
// "Cannot read properties of undefined (reading 'x')" inside useReducer. The boundary tore
// #patch down, and the mousemove handler attached to document.body — which only onMouseUp
// ever detached — then ran positionFromMouseEvent against a container that was no longer
// there, flooding the console with "Cannot read properties of null (reading 'scrollLeft')".
// That is the staging crash in index-BedTz2p5.js.
//
// Same class as cables.cy.ts "skips a cable whose connector button is gone instead of
// crashing"; the reducer must never assume the DOM it reads is the DOM it expects.

// the speaker's input connector — the element the cable plugs into,
// and the one this spec removes out from under the drag
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

		// a connection in state, so connectionsInRange has something to look up
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

					// before the guard this threw in the reducer, so the editor itself
					// disappeared behind the crash boundary
					dragSelect([40, 40], [700, 520]);

					cy.get("#patch").should("exist");
					cy.get(".crash").should("not.exist");
					// both modules survive and the editor is intact. not asserted: the cable
					// still painting — it is drawn from live connector geometry, so with its
					// endpoint gone there is nothing to draw it from. verified separately that
					// a drag with every connector present leaves the cable in #connections
					cy.get(".module").should("have.length", 2);
					cy.get("#connections").should("exist");
				});
			});
	});

	it("ignores modules when the nav is not in the DOM", () => {
		cy.window().then((win) => {
			// modulesInRange read nav[0].clientHeight with no guard at all
			win.document.getElementsByTagName("nav")[0].remove();

			dragSelect([40, 40], [700, 520]);

			cy.get("#patch").should("exist");
			cy.get(".crash").should("not.exist");
		});
	});

	// not covered, on purpose: the mid-drag unmount that lets the null-container scrollLeft
	// flood happen. React nulls the ref on unmount, so nothing outside a real client-side
	// teardown of the editor reaches that state, and removing the node by hand leaves the ref
	// pointing at a detached element — a test built that way would pass with or without the
	// guard. The reducer guards above are the fixable half and they are pinned; the listener
	// detachment on unmount is asserted by nothing here.
});
