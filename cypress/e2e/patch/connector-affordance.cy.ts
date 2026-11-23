
const FREE = "rgba(0, 0, 0, 0)";

const box = ($el: JQuery<HTMLElement>) => Math.round($el[0].getBoundingClientRect().width);
const bg = ($el: JQuery<HTMLElement>) => getComputedStyle($el[0]).backgroundColor;
const pip = ($el: JQuery<HTMLElement>) =>
	parseFloat(getComputedStyle($el[0], "::before").width);

const speakerOut = '#0_1_0[data-direction="output"]';
const oscOut = '.connector[data-direction="output"]:not(#0_1_0)';
const gain = '.connector[aria-label="gain"]';

const plugOscToGain = () => {
	cy.get(oscOut).click();
	cy.wait(150);
	cy.get(gain).click({ force: true });
	cy.get("#connections [data-connection-key]").should("have.length", 1);
};

context("connector affordance", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");
		cy.get("#patch").click(140, 420);
		cy.get("#add-module").select("OSCILLATOR");
		cy.get("#module-canvas > div").should("have.length", 2);
	});

	it("every input is present, small while free", () => {
		cy.get("#0_0_0").should("exist");
		cy.get('.connector[data-direction="input"]').should("have.length.at.least", 5);

		cy.get('#0_0_0').then(($el) => {
			expect($el.attr("data-quiet"), "free input is quiet").to.equal("true");
			expect(box($el), "hit target is untouched").to.equal(19);
			expect(bg($el), "box paints nothing").to.equal(FREE);
			expect(pip($el), "pip is a fifth").to.be.within(3, 4.5);
		});
	});

	it("an input with a cable is normal sized", () => {
		plugOscToGain();

		cy.get(gain).then(($el) => {
			expect($el.attr("data-quiet"), "not quiet once wired").to.equal("false");
			expect(bg($el), "paints solid").to.not.equal(FREE);
			expect(box($el), "full size").to.equal(19);
		});
	});

	it("focus grows a free input, like hover does", () => {
		cy.get("#0_0_0").then(($el) => {
			expect(pip($el), "small before focus").to.be.below(5);
		});

		cy.get("#0_0_0").focus();

		cy.get("#0_0_0").then(($el) => {
			expect(bg($el), "focus paints the box").to.not.equal(FREE);
			expect(pip($el), "halo, roughly twice the box").to.be.greaterThan(30);
		});
	});

	it("outputs are never quiet and carry a ring", () => {
		cy.get('[data-direction="output"]').each(($el) => {
			expect($el.attr("data-quiet"), "output is never quiet").to.equal("false");
			expect(bg($el), "paints solid").to.not.equal(FREE);
			expect(getComputedStyle($el[0]).boxShadow, "ring").to.not.equal("none");
		});
	});

	it("nothing animates until a connector is active", () => {
		plugOscToGain();

		cy.get(".connector").each(($el) => {
			expect(
				getComputedStyle($el[0]).animationName,
				`resting ${$el.attr("aria-label")}`,
			).to.equal("none");
		});
	});

	it("only the inputs on the active output animate", () => {
		plugOscToGain();

		cy.get(gain).then(($el) => {
			expect($el.attr("data-live"), "nothing is held").to.equal("false");
			expect(getComputedStyle($el[0]).animationName).to.equal("none");
		});

		cy.get(speakerOut).click();
		cy.wait(200);

		cy.get(gain).then(($el) => {
			expect($el.attr("data-live"), "wired to another output").to.equal("false");
			expect(getComputedStyle($el[0]).animationName).to.equal("none");
		});

		cy.get(speakerOut).click();
		cy.wait(200);
		cy.get(gain).should("have.attr", "data-live", "false");

		cy.get(oscOut).click();
		cy.wait(200);

		cy.get(gain).then(($el) => {
			expect($el.attr("data-live"), "wired to the held output").to.equal("true");
			expect(getComputedStyle($el[0]).animationName, "so it breathes").to.equal(
				"connector-live",
			);
			expect(getComputedStyle($el[0]).animationDirection).to.equal("alternate");
		});

		cy.get(speakerOut).then(($el) => {
			expect($el.attr("data-live"), "outputs do not breathe").to.equal("false");
			expect(getComputedStyle($el[0]).animationName).to.equal("none");
		});

		cy.get(gain).then(($el) => {
			const colour = getComputedStyle($el[0]).backgroundColor;
			expect(colour, "keeps the connected colour, just faded").to.match(/232, 106, 136/);
			cy.wait(700);
			cy.get(gain).then(($again) => {
				expect(
					getComputedStyle($again[0]).backgroundColor,
					"the alpha is moving",
				).to.not.equal(colour);
			});
		});

		cy.get("#patch").then(($p) => {
			$p[0].scrollTop = 0;
			$p[0].scrollLeft = 0;
		});
		cy.wait(200);
		cy.screenshot({ caption: "oscillator output held, gain breathing" });
	});
});
