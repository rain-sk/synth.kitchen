const draftKey = (id = "new") => `synth.kitchen:draft:${id}`;

const storage = () =>
	cy.getAllLocalStorage().then(
		(result) => result[Cypress.config("baseUrl") as string] ?? {},
	);

const speakerPosition = () =>
	cy.get("#0").then(($el) => {
		const el = $el[0] as HTMLElement;
		return [parseFloat(el.style.left), parseFloat(el.style.top)];
	});

describe("patch drafts: a fresh /patch/new", () => {
	beforeEach(() => {
		cy.clearAllLocalStorage();
		(cy as any).visitEditor("/patch/new");
		cy.get("#patch", { timeout: 20000 }).should("exist");
	});

	it("offers no revert until the output module has been moved", () => {
		cy.get("#draft-state").should("not.exist");
		cy.get("#draft-reset").should("not.exist");

		cy.wait(1500);

		cy.get("#draft-state").should("not.exist");
		cy.get("#draft-reset").should("not.exist");
		storage().then((store) =>
			expect(store[draftKey()], "an untouched new patch writes no draft").to.be
				.undefined,
		);

		cy.get("#0").focus().type("{rightarrow}");

		cy.get("#draft-state", { timeout: 5000 }).should("exist");
		cy.get("#draft-reset", { timeout: 5000 }).should("exist");
	});

	it("revert puts the output module back where it was", () => {
		speakerPosition().then((origin) => {
			cy.get("#0").focus().type("{rightarrow}{downarrow}");

			cy.get("#draft-reset", { timeout: 5000 }).should("exist");

			speakerPosition().then((moved) => {
				expect(moved, "the keyboard moved the module").to.not.deep.equal(
					origin,
				);

				cy.get("#draft-reset").click();

				speakerPosition().then((restored) => {
					expect(
						restored,
						"revert restored the original position, not a recomputed one",
					).to.deep.equal(origin);
				});

				cy.get("#draft-state", { timeout: 8000 }).should("not.exist");
				storage().then((store) =>
					expect(store[draftKey()], "revert discarded the draft").to.be
						.undefined,
				);
			});
		});
	});

	it("revert restores every module to where it was, and keeps nothing added", () => {
		speakerPosition().then((origin) => {
			cy.get("#0").focus().type("{downarrow}{downarrow}");

			cy.get("#patch").click(140, 420);
			cy.get("#add-module").select("OSCILLATOR");
			cy.get("#module-canvas > div").should("have.length", 2);

			cy.get("#draft-reset").click();

			cy.get("#module-canvas > div").should("have.length", 1);
			speakerPosition().then((restored) => {
				expect(restored, "the output came back to its original spot").to.deep.equal(
					origin,
				);
			});
			cy.get("#draft-state", { timeout: 8000 }).should("not.exist");
		});
	});
});
