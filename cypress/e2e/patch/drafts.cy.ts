
const EMAIL = "e2e-drafts@synth.kitchen";
const PASSWORD = "password123";
const SEEDED_SLUG = "agile-able-attitude-c090f09e";

const api = (path: string) => `${Cypress.env("API_URL")}${path}`;
const draftKey = (id = "new") => `synth.kitchen:draft:${id}`;

const typeInto = (id: string, value: string) =>
	cy.get(`#${id}`).type(value, { delay: 40 }).should("have.value", value);

const modules = () => cy.get("#module-canvas > div");

const storage = () =>
	cy.getAllLocalStorage().then(
		(result) => result[Cypress.config("baseUrl") as string] ?? {},
	);

const reopen = (path: string, count?: number) => {
	(cy as any).visitEditor(path);
	cy.wait(600);
	if (count !== undefined) modules().should("have.length", count);
};

describe("patch drafts", () => {
	beforeEach(() => {
		cy.clearAllLocalStorage();
		(cy as any).visitEditor("/patch/new");
		cy.get("#patch").click(140, 420);
		cy.get("#add-module").select("OSCILLATOR");
		modules().should("have.length", 2);
		cy.get("#draft-reset").should("be.enabled");
	});

	after(() => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
	});

	it("survives a fresh document, and says so", () => {
		storage().then((store) => {
			expect(store[draftKey()], "draft written").to.be.a("string");
			expect(JSON.parse(store[draftKey()]).version, "version stamped").to.be.a("string");
		});

		reopen("/patch/new", 2);
		cy.get("#draft-reset").should("be.enabled");
	});

	it("revert empties the canvas and discards the draft", () => {
		reopen("/patch/new", 2);

		cy.get("#draft-reset").click();

		modules().should("have.length", 1);
		cy.get("#module-canvas [id='0']").should("exist");
		cy.get("#draft-reset").should("be.disabled");
		storage().then((store) => {
			expect(store, "draft discarded").to.not.have.key(draftKey());
		});
	});

	it("revert restores the server copy, not a blank canvas", () => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
		cy.loginByApi(EMAIL, PASSWORD);
		reopen(`/patch/${SEEDED_SLUG}`);

		modules().should("have.length.gt", 1);
		const seeded = () => modules().its("length");

		seeded().then((count: number) => {
			cy.get("#patch").click(140, 420);
			cy.get("#add-module").select("OSCILLATOR");
			modules().should("have.length", count + 1);
			cy.get("#draft-reset").should("be.enabled");

			reopen(`/patch/${SEEDED_SLUG}`);
			modules().should("have.length", count + 1);
			cy.get("#draft-reset").should("be.enabled");

			cy.get("#draft-reset").click();

			modules().should("have.length", count);
			cy.get("#draft-reset").should("be.disabled");
			storage().then((store) => {
				expect(store, "revert discards the draft").to.not.have.key(
					draftKey(SEEDED_SLUG),
				);
			});
		});
	});

	it("a confirmed save clears the draft", () => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
		cy.intercept({ method: "POST", url: /\/patch\/?(\?.*)?$/ }).as("save");

		cy.get("#save-to-cloud").click();
		cy.get("#auth-dialog").should("exist");
		typeInto("email", EMAIL);
		typeInto("password", PASSWORD);
		typeInto("confirm-password", PASSWORD);
		cy.get("#submit").click();

		cy.wait("@save", { timeout: 10000 })
			.its("response.statusCode")
			.should("eq", 200);
		cy.get("#draft-reset", { timeout: 8000 }).should("be.disabled");

		storage().then((store) => {
			expect(store, "nothing left to protect").to.not.have.key(draftKey());

			const jwt = JSON.parse(store.jwt);
			cy.request({
				url: api("/auth/user"),
				headers: { authorization: `Bearer ${jwt}` },
			})
				.then((res) =>
					cy.request({
						url: api(`/patch?creatorId=${res.body.user.id}`),
						headers: { authorization: `Bearer ${jwt}` },
					}),
				)
				.then((res) => {
					expect(res.status).to.equal(200);
					expect(res.body.patches, "the save landed in the cloud").to.have.length(
						1,
					);
				});
		});
	});

	it("completes the save after a reload between asking and signing in", () => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
		cy.intercept({ method: "POST", url: /\/patch\/?(\?.*)?$/ }).as("save");

		cy.get("#save-to-cloud").click();
		cy.location("search").should("include", "after=save");
		cy.get("#auth-dialog").should("exist");

		cy.reload();

		cy.get("#auth-dialog", { timeout: 20000 }).should("exist");
		cy.location("search").should("include", "after=save");
		storage().then((store) =>
			expect(store[draftKey()], "draft survives the reload").to.be.a("string"),
		);

		typeInto("email", EMAIL);
		typeInto("password", PASSWORD);
		typeInto("confirm-password", PASSWORD);
		cy.get("#submit").click();

		cy.get("#auth-dialog", { timeout: 10000 }).should("not.exist");
		cy.get("#start", { timeout: 20000 }).click();
		cy.get("#patch", { timeout: 20000 }).should("exist");

		cy.get("#module-canvas > div").should("have.length", 2);
		cy.get("#draft-reset").should("be.enabled");

		cy.wait("@save", { timeout: 15000 }).then(({ request, response }) => {
			expect(response?.statusCode, "save accepted").to.eq(200);
			expect(
				Object.keys((request.body as any).state.state.modules),
				"saved the canvas, not a blank patch",
			).to.have.length(2);
		});
		cy.location("search").should("not.include", "after=save");
		cy.get("#draft-reset", { timeout: 8000 }).should("be.disabled");
	});


	it("cancelling the ask drops the pending save", () => {
		cy.get("#save-to-cloud").click();
		cy.location("search").should("include", "after=save");

		cy.get("#auth-close").click();

		cy.location("search").should("not.include", "after=save");
		cy.get("#auth-dialog").should("not.exist");
		cy.get("#draft-reset").should("be.enabled");
	});

	it("saving the same patch twice updates it rather than duplicating", () => {
		cy.deleteUserByApi(EMAIL, PASSWORD);
		cy.intercept("POST", /\/patch\/?(\?.*)?$/).as("create");
		cy.intercept("PUT", /\/patch\//).as("update");

		cy.get("#save-to-cloud").click();
		cy.get("#auth-dialog").should("exist");
		typeInto("email", EMAIL);
		typeInto("password", PASSWORD);
		typeInto("confirm-password", PASSWORD);
		cy.get("#submit").click();

		cy.wait("@create", { timeout: 15000 })
			.its("response.statusCode")
			.should("eq", 200);
		cy.get("#patch", { timeout: 20000 }).should("exist");
		cy.get("#draft-reset", { timeout: 8000 }).should("be.disabled");

		const slug = () => cy.location("pathname");

		slug().then((first: string) => {
			cy.get("#patch-name").clear().type("renamed");
			cy.get("#draft-reset").should("be.enabled");

			cy.get("#save-to-cloud").click();

			cy.wait("@update", { timeout: 15000 })
				.its("response.statusCode")
				.should("eq", 200);
			slug().should("eq", first);
			cy.get("#draft-reset", { timeout: 8000 }).should("be.disabled");

			storage().then((store) => {
				const jwt = JSON.parse(store.jwt);
				cy.request({
					url: api("/auth/user"),
					headers: { authorization: `Bearer ${jwt}` },
				})
					.then((res) =>
						cy.request({
							url: api(`/patch?creatorId=${res.body.user.id}`),
							headers: { authorization: `Bearer ${jwt}` },
						}),
					)
					.then((res) => {
						expect(
							res.body.patches,
							"one patch, not a duplicate",
						).to.have.length(1);
					});
			});
		});
	});


	it("keeps the pending save when switching the ask to login", () => {
		cy.get("#save-to-cloud").click();
		cy.location("search").should("include", "after=save");

		cy.get("#auth-switch").click();

		cy.location("search").should("include", "auth=login");
		cy.location("search").should("include", "after=save");
		cy.get("#auth-dialog").should("exist");
	});


	it("logging out keeps the draft", () => {
		storage().then((store) => {
			expect(store[draftKey()], "draft before logout").to.be.a("string");

			cy.visit("/logout");
			cy.wait(1500);

			storage().then((after) => {
				expect(after[draftKey()], "draft survives signing out").to.be.a("string");
			});
		});
	});
});
