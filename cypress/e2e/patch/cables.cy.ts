/// <reference types="cypress" />

const SPEAKER = "#0_0_0";

const cable = () => cy.get("#connections [data-connection-key]");

const cablePath = ($el: JQuery<HTMLElement>) =>
	($el[0] as SVGPathElement).getAttribute("d");

// cables live below modules and connectors, and a short cable can sit mostly
// off-screen or behind the toolbar - centre it in the viewport, then click a
// point along the stroke that is genuinely exposed
const clickCable = (options: Partial<Cypress.ClickOptions> = {}) =>
	cy.window().then((win) => {
		const hit = win.document.querySelector(
			"#connections [data-connection-key] .cable-hit",
		) as SVGPathElement;

		const stroke = () =>
			(hit
				.closest("[data-connection-key]")!
				.querySelector(".cable-accent")!.getAttribute("d") as string)
				.match(/-?\d+(\.\d+)?/g)!
				.map(Number);

		const centreIn = () => {
			const svg = win.document.getElementById("connections")!.getBoundingClientRect();
			const [x1, y1, x2, y2] = stroke();
			return [
				svg.left + (x1 + x2) / 2,
				svg.top + (y1 + y2) / 2,
			] as [number, number];
		};

		const patch = win.document.getElementById("patch") as HTMLElement;
		const [midX, midY] = centreIn();

		patch.scrollTop += midY - win.innerHeight / 2;
		patch.scrollLeft += midX - win.innerWidth / 2;

		return cy.wait(100).then(() => {
			const svg = win.document.getElementById("connections")!.getBoundingClientRect();
			const box = hit.getBoundingClientRect();
			const [x1, y1, x2, y2] = stroke();
			const cable = hit.closest("[data-connection-key]") as HTMLElement;

			const point = Array.from({ length: 40 }, (_, i) => (i + 1) / 41)
				.map((t) => [
					Math.round(svg.left + x1 + (x2 - x1) * t),
					Math.round(svg.top + y1 + (y2 - y1) * t),
				])
				.filter(
					([x, y]) =>
						x > 0 && y > 0 && cable.contains(win.document.elementFromPoint(x, y)),
				);

			expect(point, "an exposed point on the cable stroke").to.not.be.empty;

			cy.wrap(hit).click(point[0][0] - box.left, point[0][1] - box.top, {
				...options,
				force: true,
			});
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

	it("shift-click selects a cable instead of undoing its own focus", () => {
		// pointer order is mousedown → focus → mouseup → click. onFocus applied the press and onClick
		// then toggled the same key back off, so shift-click cancelled itself and multi-select was a no-op
		connect().then(() => {
			cy.get("body").type("{esc}");
			cable().should("have.attr", "aria-pressed", "false");

			cy.get("body").type("{shift}", { release: false });
			clickCable({ shiftKey: true });
			cy.get("body").type("{shift}");

			cable().should("have.attr", "aria-pressed", "true");
		});
	});

	it("activates a connector that already has a cable plugged in", () => {
		connect().then(() => {
			cy.get("body").type("{esc}");

			cable().should("have.attr", "aria-pressed", "false");

			cy.get(SPEAKER).click();

			cy.get(SPEAKER).should("have.class", "active");
			cable().should("have.attr", "aria-pressed", "false");
		});
	});

	it("is reachable by keyboard", () => {
		connect().then(() => {
			cable().should("have.attr", "role", "button");
			cable().should("have.attr", "tabindex", "0");
			cable().focus().should("have.focus");
		});
	});

	it("selects a cable by focusing it, no key needed", () => {
		connect().then(() => {
			cable().should("have.attr", "aria-pressed", "true");

			cy.get("body").type("{esc}");

			cable().should("have.attr", "aria-pressed", "false");

			cable().focus();

			cable().should("have.attr", "aria-pressed", "true");
		});
	});

	it("returns focus to the output connector when its cable is deleted", () => {
		connect().then((out) => {
			cable().focus();

			cy.get("body").type("{backspace}");

			cable().should("have.length", 0);
			cy.focused().should("have.id", out[0].id);
		});
	});

	it("returns focus to the canvas when escape clears selection", () => {
		connect().then(() => {
			cable().focus();

			cy.get("body").type("{esc}");

			cy.focused().should("have.id", "module-canvas");
		});
	});

	it("toggles selection with shift-click", () => {
		connect().then(() => {
			cable().should("have.attr", "aria-pressed", "true");

			// shift must really be held: a pointer press is applied by onFocus (focus precedes click),
			// and that reads the app's modifier state, not the click event's shiftKey
			cy.get("body").type("{shift}", { release: false });
			clickCable({ shiftKey: true });
			cy.get("body").type("{shift}");

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
				expect(rules, ":hover halo").to.contain(".cable:hover .cable-halo");
			});
		});
	});

	// the hit stroke has pointer-events: stroke, so its width IS the target. hover and
	// focus used to reuse it for the halo at 14px, shrinking the cable by ~22% at the
	// moment someone aimed at it. Cypress dispatches synthetic events, which never set
	// Chrome's :hover, so this asserts the stylesheet contract + the resting geometry
	it("never shrinks the hit stroke for hover or focus feedback", () => {
		connect().then(() => {
			cy.get("#connections [data-connection-key] .cable-hit").should(
				"have.css",
				"stroke-width",
				"18px",
			);
			cy.get("#connections [data-connection-key] .cable-halo").should(
				"have.css",
				"stroke-width",
				"14px",
			);

			cy.document().then((doc) => {
				const rules = Array.from(doc.styleSheets)
					.flatMap((sheet) => Array.from(sheet.cssRules))
					.map((rule) => rule.selectorText ?? "")
					.filter(Boolean);

				const touchingHit = rules.filter((sel) => /\.cable:(hover|focus-visible|selected) \.cable-hit/.test(sel));

				expect(touchingHit, "no state rule may restyle the hit stroke").to.be.empty;
				expect(rules, "hover feedback lives on the halo").to.include(".cable:hover .cable-halo");
				expect(rules, "focus feedback lives on the halo").to.include(
					".cable:focus-visible .cable-halo",
				);
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

	it("keeps a selected module above the cable layer", () => {
		connect();

		cy.get("#0 h2").click();
		cy.get("#0").should("have.class", "selected");

		// the ladder is #connections 10 < .module 11 < .module.selected 12. .connector is 12 as well, but
		// .module has a transform so it is its own stacking context - a z-index inside it can never lift a
		// connector above the cable layer, the whole module subtree is ordered by .module's own value.
		// .module.selected sat at 1 from when modules were auto and the canvas was -1, so selecting a module
		// dropped it below #connections and its cables painted over its connectors
		cy.get("#0").then(($module) => {
			cy.get("#connections").then(($layer) => {
				const moduleZ = parseFloat(getComputedStyle($module[0]).zIndex);
				const layerZ = parseFloat(getComputedStyle($layer[0]).zIndex);

				expect(moduleZ, "selected module must stay above #connections").to.be.greaterThan(layerZ);
			});
		});
	});

	it("selects exactly one cable when the keyboard moves focus between cables", () => {
		// the reported defect: shift+tab backwards through cables piled them into a multiselection.
		// selection must follow focus one-for-one, because onFocus has no way to tell "previous
		// focusable" from "add to selection" unless the gesture that moved focus is named - and it is,
		// by pointerFocus in connections.tsx
		cy.get("#patch").click(40, 240);
		cy.get("#add-module").select("DELAY");
		cy.get("#module-canvas > div").should("have.length", 3);

		cy.get('.connector[aria-roledescription="output connector"]').then(($outputs) => {
			cy.get(`#${$outputs[0].id}`).click({ force: true });
			cy.get('.connector[aria-roledescription="input connector"]').eq(0).click({ force: true });

			cy.get(`#${$outputs[1].id}`).click({ force: true });
			cy.get('.connector[aria-roledescription="input connector"]').eq(1).click({ force: true });

			cable().should("have.length", 2);

			cable().eq(0).focus();
			cy.focused().should("have.attr", "data-connection-key");
			cy.get("[data-connection-key][data-selected=true]").should("have.length", 1);

			cable().eq(1).focus();
			cy.focused().should("have.attr", "data-connection-key");
			cy.get("[data-connection-key][data-selected=true]").should("have.length", 1);

			// the defect was shift+tab piling the two into a multiselection, so it has to be a real
			// keypress — .focus() never holds shift when onFocus runs, and passes on the old code too
			cy.focused().type("{shift}{tab}");

			cable().eq(0).should("have.focus");
			cy.get("[data-connection-key][data-selected=true]").should("have.length", 1);
		});
	});

});
