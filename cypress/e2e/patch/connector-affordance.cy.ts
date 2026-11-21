/// <reference types="cypress" />

// direction, not module kind, is the organising idea (styles.css, keyed on [data-direction]
// and [data-quiet], computed by isQuietConnector):
//   · nothing active  — outputs prominent and ringed, empty inputs a fifth-sized pip
//   · holding output  — other outputs recede (they cannot take this cable), inputs prominent
//   · holding input   — other inputs recede, including plugged ones, outputs prominent
//   · carrying cable  — breathes, because clicking the pair again unplugs it
// Only the paint moves: the button keeps its 1.2rem box, which is the hit target.

const box = ($el: JQuery<HTMLElement>) => Math.round($el[0].getBoundingClientRect().width);
const bg = ($el: JQuery<HTMLElement>) => getComputedStyle($el[0]).backgroundColor;
const FREE = "rgba(0, 0, 0, 0)";

// oscillator output -> speaker gain: one live cable, so gain is plugged and breathing
const plug = () => {
	cy.get('.connector[data-direction="output"]').last().click();
	cy.wait(150);
	cy.get('.connector[aria-label="gain"]').click({ force: true });
	cy.get("#connections [data-connection-key]").should("have.length", 1);
};

const quietOn = (selector: string) =>
	cy.get(selector).should("have.attr", "data-quiet", "true");
const quietOff = (selector: string) =>
	cy.get(selector).should("have.attr", "data-quiet", "false");

context("connector affordance by direction", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");

		cy.get("#patch").click(140, 420);
		cy.get("#add-module").select("OSCILLATOR");
		cy.get("#module-canvas > div").should("have.length", 2);
	});

	it("at rest: outputs prominent, every free input a pip", () => {
		// speaker's audio input and the oscillator's parameters, same treatment
		quietOn("#0_0_0");
		quietOn('.connector[aria-label="frequency"]');

		cy.get("#0_0_0").then(($el) => {
			expect(box($el), "hit target unchanged").to.equal(19);
			expect(bg($el), "box paints nothing").to.equal(FREE);
			expect(
				parseFloat(getComputedStyle($el[0], "::before").width),
				"pip is a fifth",
			).to.be.within(3, 4.5);
		});

		cy.get('.connector[data-direction="output"]').first().then(($el) => {
			expect($el.attr("data-quiet"), "output is not quiet").to.equal("false");
			expect(bg($el), "output paints solid").to.not.equal(FREE);
			expect(
				getComputedStyle($el[0]).boxShadow,
				"output carries a ring",
			).to.not.equal("none");
		});

		// frame it: #patch is the scroller and the modules sit at the origin, so a
		// screenshot taken without this is just empty canvas
		cy.get("#patch").then(($p) => {
			$p[0].scrollTop = 0;
			$p[0].scrollLeft = 0;
		});
		cy.wait(200);

		cy.screenshot({ caption: "at rest" });
	});

	it("holding an output quiets the other outputs and promotes every input", () => {
		cy.get('.connector[data-direction="output"]').last().click();
		cy.wait(200);

		quietOn('.connector[data-direction="output"]:not(.active)');
		quietOff("#0_0_0");
		cy.get('.connector[data-direction="input"]').each(($el) => {
			expect($el.attr("data-quiet"), "no input recedes").to.equal("false");
			expect($el).to.have.class("highlight");
		});

		cy.screenshot({ caption: "holding an output" });
	});

	it("holding an input quiets every other input, plugged included", () => {
		// plug oscillator -> speaker gain first, so there is a plugged input to quiet
		cy.get('.connector[data-direction="output"]').last().click();
		cy.wait(150);
		cy.get('.connector[aria-label="gain"]').click({ force: true });
		cy.get("#connections [data-connection-key]").should("have.length", 1);

		cy.get('.connector[data-direction="input"]').first().click();
		cy.wait(200);

		cy.get('.connector[data-direction="input"]:not(.active)').each(($el) => {
			expect($el.attr("data-quiet"), "every other input recedes").to.equal("true");
		});
		quietOff('.connector[data-direction="output"]');

		cy.get("#patch").then(($p) => {
			$p[0].scrollTop = 0;
			$p[0].scrollLeft = 0;
		});
		cy.wait(200);

		cy.screenshot({ caption: "holding an input" });
	});

	it("a connector carrying a cable breathes", () => {
		cy.get('.connector[data-direction="output"]').last().click();
		cy.wait(150);
		cy.get('.connector[aria-label="gain"]').click({ force: true });
		cy.get('#connections [data-connection-key]').should("have.length", 1);

		cy.get('.connector[aria-label="gain"]').then(($el) => {
			const cs = getComputedStyle($el[0]);
			expect($el.attr("data-plugged"), "carries a cable").to.equal("true");
			expect(cs.animationName, "it breathes").to.equal("connector-live");
			expect(cs.animationDirection, "fades out and back").to.equal("alternate");
			expect(cs.animationIterationCount, "keeps going").to.equal("infinite");
		});
	});

	it("the reduced-motion selector must be as specific as the animation rule", () => {
		// the media feature itself cannot be emulated here: cypress 15 has no
		// preferReducedMotion config option and no Cypress.automation bridge, so an assertion
		// written against prefers-reduced-motion is decoration — it reads the same whether the
		// rule works or not, which is exactly how a bad version of this shipped past review.
		// what CAN be proven is the cascade, and that was the actual bug: the reduce block
		// needs the same four :not()s as the animation rule or it loses to it. injecting each
		// selector outside the media query settles it in the same engine.
		plug();

		const full =
			'.connector[data-plugged="true"]:not([data-quiet="true"]):not(.active):not(.connected):not(.highlight)';
		const short = '.connector[data-plugged="true"]';

		const inject = (selector: string) =>
			cy.document().then((doc) => {
				const old = doc.getElementById("rm-cascade-probe");
				if (old) old.remove();
				const style = doc.createElement("style");
				style.id = "rm-cascade-probe";
				/* no !important — that would beat specificity and the probe would prove
				   nothing. in the stylesheet the reduce block has no !important either, so
				   this reproduces the same contest: short selector loses, full one ties and
				   wins on source order */
				style.textContent = `${selector} { animation: none; }`;
				doc.head.appendChild(style);
			});

		inject(short);
		cy.get('.connector[aria-label="gain"]').should(
			"have.css",
			"animation-name",
			"connector-live",
		);

		inject(full);
		cy.get('.connector[aria-label="gain"]').should(
			"have.css",
			"animation-name",
			"none",
		);
	});
});
