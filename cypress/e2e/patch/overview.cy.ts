/// <reference types="cypress" />

context("patch: overview minimap", () => {
	beforeEach(() => {
		(cy as any).visitEditor("/patch/new");
	});

	it("frames the viewport with the viewport's own aspect ratio", () => {
		cy.viewport(1663, 392);

		cy.get("#patch .module").should("have.length.at.least", 1);

		// the minimap starts collapsed and its rectangle is display:none until expanded
		cy.get("#overview").click();
		cy.get("#scrub-outline").should("be.visible");

		cy.window().then((win) => {
			const main = win.document.getElementById("patch") as HTMLElement;
			const scrub = win.document.getElementById("scrub-area") as HTMLElement;
			const outline = win.document.getElementById("scrub-outline") as HTMLElement;

			const box = outline.getBoundingClientRect();
			const wantRatio = main.clientWidth / main.clientHeight;
			const gotRatio = box.width / box.height;

			// one uniform scale for both axes, so the rectangle keeps the viewport's shape. Normalising x by
			// scrubWidth and y by scrubHeight separately made it twice too tall at this viewport: 381x132.6
			// where the correct box is 322.7x60.6
			expect(
				Math.abs(gotRatio - wantRatio) / wantRatio,
				`outline ratio ${gotRatio.toFixed(3)} vs viewport ratio ${wantRatio.toFixed(3)}`,
			).to.be.lessThan(0.02);

			expect(box.width, "outline must not span the full scrub width").to.be.lessThan(
				scrub.clientWidth,
			);
			expect(box.height, "outline must not span the full scrub height").to.be.lessThan(
				scrub.clientHeight,
			);
			expect(box.width, "outline must be visible").to.be.greaterThan(0);
		});
	});

	// deliberately not asserted here: the rectangle's position while the minimap expands keeps changing
	// under the measurement (the box grows, so offsetY moves with it), and the aspect-ratio test above
	// already pins the maths that was wrong. scroll tracking and the scrub drag stay untested - the drag
	// handler is still a stub
});

