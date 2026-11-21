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

	it("frames every module that is visible in the viewport", () => {
		cy.viewport(1000, 580);

		cy.get("#patch").click(140, 160);
		cy.get("#add-module").select("OSCILLATOR");
		cy.get("#module-canvas > div").should("have.length", 2);

		cy.get("#overview").click();
		cy.wait(1500);

		cy.window().then((win) => {
			const main = win.document.getElementById("patch") as HTMLElement;
			const scrub = win.document.getElementById("scrub-area") as HTMLElement;
			const outline = win.document.getElementById(
				"scrub-outline",
			) as HTMLElement;
			const url = (
				win.getComputedStyle(scrub).backgroundImage || ""
			)
				.replace(/^url\(["']?/, "")
				.replace(/["']?\)$/, "");

			return new win.Promise((resolve) => {
				const img = new win.Image();
				img.onload = () => resolve({ win, img });
				img.onerror = () => resolve({ win, img });
				img.src = url;
			});
		}).then(({ win, img }: any) => {
			const main = win.document.getElementById("patch") as HTMLElement;
			const scrub = win.document.getElementById("scrub-area") as HTMLElement;
			const outline = win.document.getElementById(
				"scrub-outline",
			) as HTMLElement;
			const s = scrub.getBoundingClientRect();
			const o = outline.getBoundingClientRect();
			const mr = main.getBoundingClientRect();

			// one uniform contain scale against the snapshot's own frame, which is the frame the
			// image was actually painted in
			const scale = Math.min(
				scrub.clientWidth / img.naturalWidth,
				scrub.clientHeight / img.naturalHeight,
			);
			const offsetX = (scrub.clientWidth - img.naturalWidth * scale) / 2;
			const offsetY = (scrub.clientHeight - img.naturalHeight * scale) / 2;

			const modules = Array.from(
				win.document.querySelectorAll("#module-canvas .module"),
			) as HTMLElement[];

			const visible = modules.filter((m) => {
				const r = m.getBoundingClientRect();
				return (
					r.right > mr.left &&
					r.left < mr.right &&
					r.bottom > mr.top &&
					r.top < mr.bottom
				);
			});

			expect(visible.length, "at least one module is visible").to.be.greaterThan(0);

			visible.forEach((m) => {
				const left = offsetX + m.offsetLeft * scale;
				const top = offsetY + m.offsetTop * scale;
				const right = left + m.offsetWidth * scale;
				const bottom = top + m.offsetHeight * scale;

				expect(left, `${m.id} left inside outline`).to.be.at.least(
					o.left - s.left - 2,
				);
				expect(top, `${m.id} top inside outline`).to.be.at.least(
					o.top - s.top - 2,
				);
				expect(right, `${m.id} right inside outline`).to.be.at.most(
					o.right - s.left + 2,
				);
				expect(bottom, `${m.id} bottom inside outline`).to.be.at.most(
					o.bottom - s.top + 2,
				);
			});
		});
	});

	// deliberately not asserted here: the rectangle's position while the minimap expands keeps changing
	// under the measurement (the box grows, so offsetY moves with it), and the aspect-ratio test above
	// already pins the maths that was wrong. scroll tracking and the scrub drag stay untested - the drag
	// handler is still a stub
});

