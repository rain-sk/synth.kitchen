/// <reference types="cypress" />

const api = (path: string) => `${Cypress.env("API_URL")}${path}`;

const EMAIL = "e2e-dashboard@synth.kitchen";
const PASSWORD = "password123";

const SEEDED_SLUG = "agile-able-attitude-c090f09e";

describe("dashboard", () => {
	let seeded: { state: unknown };
	let names: string[] = [];

	before(() => {
		cy.request(api(`/patch?slug=${SEEDED_SLUG}`)).then((res) => {
			seeded = res.body.patch.state;
			names = [];
			[0, 1, 2].forEach(() => {
				(cy as any)
					.seedPatch(EMAIL, PASSWORD, { state: seeded })
					.then((created: any) => names.push(created.name));
			});
		});
	});

	after(() => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
	});

	const visit = () =>
		(cy as any).loginByApi(EMAIL, PASSWORD).then(() => cy.visit("/dashboard"));

	it("lists one card per patch, with no placeholder artwork", () => {
		visit().then(() => {
			cy.get(".patch-card:not(.is-skeleton)").should("have.length", 3);

			names.forEach((name) => {
				cy.contains(".patch-card-name", name).should("exist");
			});

			cy.get(".dash-count").should("contain", "3");

			cy.get(".patch-card-face").each(($el) => {
				expect($el.css("background-image")).to.not.contain("data:image");
			});
		});
	});

	it("filters by name without reloading", () => {
		visit().then(() => {
			const target = names[0];
			const query = target.split("-")[0];

			cy.get("#patch-search").type(query);

			cy.get(".patch-card-name").should("have.length.at.least", 1);
			cy.get(".patch-card-name").each(($el) => {
				expect($el.text().toLowerCase()).to.contain(query.toLowerCase());
			});
			cy.get(".patch-card:not(.is-skeleton)").should("have.length.below", 3 + 1);

			cy.get("#patch-search").clear().type("zzz-no-such-patch");
			cy.get(".patch-card").should("not.exist");
			cy.get(".patch-state-title").should("contain", "nothing matches");

			cy.contains("button", "clear filter").click();
			cy.get("#patch-search").should("have.value", "");
			cy.get(".patch-card:not(.is-skeleton)").should("have.length", 3);
		});
	});

	it("sorts by name, and by recency off createdAt", () => {
		visit().then(() => {
			cy.get("#patch-sort").select("name");
			cy.get(".patch-card-name").then(($a) => {
				const shown = $a.toArray().map((el) => el.textContent ?? "");
				expect(shown).to.deep.equal([...shown].sort((x, y) => x.localeCompare(y)));
			});

			cy.get("#patch-sort").select("nameDesc");
			cy.get(".patch-card-name").then(($a) => {
				const shown = $a.toArray().map((el) => el.textContent ?? "");
				expect(shown).to.deep.equal(
					[...shown].sort((x, y) => y.localeCompare(x)),
				);
			});

			cy.get("#patch-sort").select("newest");
			cy.get(".patch-card:not(.is-skeleton)").then(($cards) => {
				const stamps = $cards
					.toArray()
					.map((el) => Number(el.getAttribute("data-created") ?? -1));

				expect(stamps.length, "cards render").to.be.greaterThan(1);
				expect(new Set(stamps).size, "createdAt varies").to.be.greaterThan(1);
				expect(stamps, "newest first").to.deep.equal(
					[...stamps].sort((a, b) => b - a),
				);
			});
		});
	});

	it("duplicates and opens the copy", () => {
		visit().then(() => {
			cy.get(".patch-card:not(.is-skeleton)")
				.should("have.length.at.least", 3)
				.first()
				.invoke("attr", "data-slug")
				.then((raw) => {
					const slug = String(raw);

					cy.get(`#menu-${slug}`)
						.click()
						.should("have.attr", "aria-expanded", "true");

					cy.get(`#fork-${slug}`).should("be.visible").click();

					cy.location("pathname").should("match", /\/patch\/.+-fork-/);

					cy.visit("/dashboard");
					cy.get(".patch-card:not(.is-skeleton)", { timeout: 15000 })
						.should("have.length.at.least", 4)
						.and(($c) => {
							expect($c.filter(`[data-slug="${slug}"]`).length).to.equal(1);
						});
				});
		});
	});

	it("deletes only after a second press", () => {
		visit().then(() => {
			cy.get(".patch-card:not(.is-skeleton)")
				.should("have.length.at.least", 2)
				.first()
				.invoke("attr", "data-slug")
				.then((raw) => {
					const slug = String(raw);

					cy.get(`#menu-${slug}`).click();

					cy.get(`#delete-${slug}`)
						.should("be.visible")
						.click()
						.should("contain", "tap again")
						.and("have.class", "is-armed");

					cy.get(`[data-slug="${slug}"]`).should("exist");

					cy.get(`#delete-${slug}`).click();

					cy.get(`[data-slug="${slug}"]`).should("not.exist", { timeout: 15000 });
				});
		});
	});

	it("links to a blank patch", () => {
		visit().then(() => {
			cy.get("#new-patch").should("have.attr", "href", "/patch/new");
		});
	});

	it("sends anonymous visitors to login", () => {
		cy.visit("/logout");
		cy.visit("/dashboard");
		cy.url().should("include", "/login");
	});
});
