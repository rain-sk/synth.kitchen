/// <reference types="cypress" />

// an unconnected parameter socket is painted at a fifth of its box and keeps the whole
// box as its hit target (styles.css, `.connector[aria-roledescription="parameter
// connector"][data-plugged="false"]`). the box is what the click lands on, so the box
// must not move — only the ink shrinks. plugging a cable has to restore full size,
// which is why data-plugged is derived from the connections and not from the drag state:
// `.connected` only ever means "attached to the connector you are holding".

const param = (name: string) =>
	cy.get(
		`.connector[aria-roledescription="parameter connector"][aria-label="${name}"]`,
	);

const boxOf = ($el: JQuery<HTMLElement>) => $el[0].getBoundingClientRect();

context("parameter sockets shrink while unconnected", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");

		cy.get("#patch").click(140, 420);
		cy.get("#add-module").select("OSCILLATOR");
		cy.get("#module-canvas > div").should("have.length", 2);
	});

	it("paints the free socket small, without shrinking the hit target", () => {
		const socket = param("gain");

		socket.should("have.attr", "data-plugged", "false");

		socket.then(($el) => {
			const box = boxOf($el);
			const cs = getComputedStyle($el[0]);
			const dot = getComputedStyle($el[0], "::before");

			// 1.2rem at the default root size
			expect(Math.round(box.width), "hit target width").to.equal(19);
			expect(Math.round(box.height), "hit target height").to.equal(19);
			expect(cs.backgroundColor, "the box paints nothing").to.equal(
				"rgba(0, 0, 0, 0)",
			);

			const dotWidth = parseFloat(dot.width);
			expect(dot.content, "the dot is drawn by ::before").to.equal('""');
			expect(dotWidth, "dot is about a fifth of the box").to.be.within(
				3,
				4.5,
			);
		});
	});

	it("restores full size once a cable is plugged in", () => {
		// the oscillator's output, not the speaker's — gain lives on the speaker and
		// a self-connection is rejected, so .first() here connects nothing
		cy.get('.connector[aria-roledescription="output connector"]')
			.last()
			.click();
		cy.wait(150);
		param("gain").click({ force: true });

		cy.get("#connections [data-connection-key]").should("have.length", 1);
		param("gain").should("have.attr", "data-plugged", "true");

		param("gain").then(($el) => {
			const cs = getComputedStyle($el[0]);
			const dot = getComputedStyle($el[0], "::before");
			expect(cs.backgroundColor, "the box paints again").to.not.equal(
				"rgba(0, 0, 0, 0)",
			);
			expect(dot.content, "no separate dot once plugged").to.not.equal('""');
		});

		cy.screenshot({ caption: "gain modulated" });
	});
});
