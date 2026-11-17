/// <reference types="cypress" />

const SPEAKER = "#0_0_0";

const cable = () => cy.get("#connections [data-connection-key]");

const cablePath = ($el: JQuery<HTMLElement>) =>
	($el[0] as SVGPathElement).getAttribute("d");

// cables sit below modules (z-index 10 vs 11), so the middle of a cable may be
// covered by a module card - click a point along the stroke that is really exposed
const clickCable = (options: Partial<Cypress.ClickOptions> = {}) =>
	cy.window().then((win) => {
		const hit = win.document.querySelector(
			"#connections [data-connection-key] .cable-hit",
		) as SVGPathElement;
		const cable = hit.closest("[data-connection-key]") as HTMLElement;
		const svg = win.document
			.getElementById("connections")!
			.getBoundingClientRect();
		const box = hit.getBoundingClientRect();
		const [x1, y1, x2, y2] = (hit.getAttribute("d") as string)
			.match(/-?\d+(\.\d+)?/g)!
			.map(Number);

		const point = Array.from({ length: 40 }, (_, i) => (i + 1) / 41)
			.map((t) => [
				Math.round(svg.left + x1 + (x2 - x1) * t),
				Math.round(svg.top + y1 + (y2 - y1) * t),
			])
			.find(([x, y]) => cable.contains(win.document.elementFromPoint(x, y)));

		expect(point, "an exposed point on the cable stroke").to.not.be.undefined;

		cy.wrap(hit).click(point![0] - box.left, point![1] - box.top, {
			...options,
			force: true,
		});
	});

const oscillatorOutput = () =>
	cy
		.get('.connector[aria-roledescription="output connector"]')
		.then(($c) => {
			const extra = $c.toArray().filter((el) => el.id !== "0_1_0");
			expect(extra.length, "oscillator output").to.be.greaterThan(0);
			return `#${extra[0].id}`;
		});

const connect = () =>
	oscillatorOutput().then((out) => {
		cy.get(out).click();
		cy.get(SPEAKER).click();
		return cy.get(out);
	});

context("patch: cables", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");

		cy.get("#patch").click(140, 160);
		cy.get("#add-module").select("OSCILLATOR");
		cy.get("#module-canvas > div").should("have.length", 2);
	});

	it("draws a cable element per connection", () => {
		cable().should("have.length", 0);

		connect().then((out) => {
			cable().should("have.length", 1);
			cable().should("have.attr", "data-output-key", out[0].id);
			cable().should("have.attr", "data-input-key", "0_0_0");
			cable().should("have.attr", "aria-label");
		});
	});

	it("auto-selects a cable when it is created", () => {
		connect().then(() => {
			cable().should("have.attr", "aria-pressed", "true");
		});
	});

	it("is reachable by keyboard", () => {
		connect().then(() => {
			cable().should("have.attr", "role", "button");
			cable().should("have.attr", "tabindex", "0");
			cable().focus().should("have.focus");
		});
	});

	it("toggles selection with shift-click", () => {
		connect().then(() => {
			cable().should("have.attr", "aria-pressed", "true");

			clickCable({ shiftKey: true });

			cable().should("have.attr", "aria-pressed", "false");
		});
	});

	it("does not offer to add a module when a cable is clicked", () => {
		connect().then(() => {
			cy.get("#add-module").should("not.exist");

			clickCable();

			cy.get("#add-module").should("not.exist");
			cable().should("have.attr", "aria-pressed", "true");
		});
	});

	it("ships a hover affordance for cables", () => {
		connect().then(() => {
			cy.get("#connections [data-connection-key] .cable-accent").should(
				"have.css",
				"stroke-width",
				"3px",
			);

			cy.document().then((doc) => {
				const rules = Array.from(doc.styleSheets)
					.flatMap((sheet) => Array.from(sheet.cssRules))
					.map((rule) => rule.cssText)
					.join("\n");

				expect(rules, ":hover accent").to.contain(".cable:hover .cable-accent");
				expect(rules, ":hover halo").to.contain(".cable:hover .cable-hit");
			});
		});
	});

	it("follows the canvas when it scrolls", () => {
		connect().then(() => {
			cy.get("#connections [data-connection-key] .cable-hit").then((hit) => {
				const before = cablePath(hit);

				cy.get("#patch").then(($patch) => {
					($patch[0] as HTMLElement).scrollTop += 200;

					cy.get("#connections [data-connection-key] .cable-hit").should(
						($el) => {
							expect(cablePath($el), "cable follows scroll").to.not.eq(before);
						},
					);
				});
			});
		});
	});
});
