/// <reference types="cypress" />

const api = (path: string) => `${Cypress.env("API_URL")}${path}`;

const setJwt = (jwt: string) =>
  cy.window().then((win) => {
    win.localStorage.setItem("jwt", JSON.stringify(jwt));
  });

Cypress.Commands.add("register" as any, (email: string, password: string) => {
  cy.visit("/logout").wait(1000);
  cy.visit("/register");
  cy.get("#email").focus().type(email);
  cy.get("#password").focus().type(password);
  cy.get("#confirm-password").focus().type(`${password}{enter}`);
  cy.url().should("include", "/dashboard");
  cy.location().then((loc) => {
    if (loc.pathname.toString().includes("login")) {
      (cy as any).login(email, password);
    }
  });
  cy.visit("/logout").wait(1000);
});

Cypress.Commands.add("login" as any, (email: string, password: string) => {
  cy.visit("/logout");
  cy.visit("/login");
  cy.get("#email").focus().type(email);
  cy.get("#password").focus().type(`${password}{enter}`);
  cy.url().should("include", "dashboard");
});

Cypress.Commands.add("delete" as any, (email: string, password: string) => {
  // Teardown only, via the API. The previous UI flow typed the credentials, then read
  // `cy.location("pathname", { timeout })` with a bare `.then` — a query without an assertion
  // yields immediately, so it always saw `/login` (measured: `/login` at once, `/dashboard` 2s
  // later), early-returned, and deleted nothing. Users persisted between runs, and
  // `POST /auth/register` answering 200 with the existing account's jwt hid it.
  // `deleteUserByApi` is idempotent (no user -> no-op) and origin-agnostic.
  return (cy as any).deleteUserByApi(email, password);
});

Cypress.Commands.add("loginByApi" as any, (email: string, password: string) => {
  cy.visit("/logout");

  return cy
    .request({
      method: "POST",
      url: api("/auth/login"),
      body: { email, password },
      failOnStatusCode: false,
    })
    .then((res) =>
      res.status === 200
        ? res
        : cy.request({
            method: "POST",
            url: api("/auth/register"),
            body: { email, password },
          }),
    )
    .then((res) => {
      expect(res.status, `auth ${JSON.stringify(res.body)}`).to.equal(200);
      return setJwt(res.body.jwt).then(() => res.body.jwt as string);
    });
});

// teardown must survive the e2e stack restarting the api under it (see AGENTS.md gotcha 12): the
// vite proxy answers 500 with an empty text/plain body while the upstream is coming back, and a
// single such hiccup used to fail a spec whose assertions were all correct. Retry across the
// restart, then assert, so a genuine failure still fails loudly. 404 counts as done: no user.
const throughRestart = (
  req: () => Cypress.Chainable<Cypress.Response<any>>,
  tries = 4,
): Cypress.Chainable<Cypress.Response<any>> =>
  req().then((res) => {
    if (res.status === 200 || res.status === 404 || tries <= 0) {
      return res;
    }
    cy.wait(1000);
    return throughRestart(req, tries - 1);
  });

Cypress.Commands.add("deleteUserByApi" as any, (email: string, password: string) => {
  return throughRestart(() =>
    cy.request({
      method: "POST",
      url: api("/auth/login"),
      body: { email, password },
      failOnStatusCode: false,
    }),
  ).then((res) => {
    if (res.status !== 200) {
      return cy.wrap(null);
    }

    return throughRestart(() =>
      cy.request({
        method: "DELETE",
        url: api("/auth/user"),
        headers: {
          authorization: `Bearer ${res.body.jwt}`,
          "x-password": password,
        },
        failOnStatusCode: false,
      }),
    ).then((deleted) => {
      expect(
        deleted.status,
        `delete user: ${deleted.status} ${JSON.stringify(deleted.body ?? "")}`,
      ).to.equal(200);
      return deleted;
    });
  });
});

Cypress.Commands.add("seedPatch" as any, (email: string, password: string, patch: object) => {
  return (cy as any).loginByApi(email, password).then((jwt: string) =>
    cy
      .request({
        method: "POST",
        url: api("/patch/"),
        headers: { authorization: `Bearer ${jwt}` },
        body: patch,
      })
      .then((res) => {
        expect(res.status, `seed ${JSON.stringify(res.body)}`).to.equal(200);
        return res.body.patch;
      }),
  );
});

Cypress.Commands.add("deletePatchByApi" as any, (id: string, jwt: string) => {
  return cy.request({
    method: "DELETE",
    url: api(`/patch/${id}`),
    headers: { authorization: `Bearer ${jwt}` },
  });
});

Cypress.Commands.add("visitEditor" as any, (path = "/patch/new") => {
  cy.visit(path, {
    onBeforeLoad: (win: Window) => {
      cy.stub(win.navigator, "requestMIDIAccess").resolves({
        inputs: new Map(),
        outputs: new Map(),
        state: "connected",
        on: () => {},
        onstatechange: null,
      });
    },
  });

  cy.get("#start").click({ force: true });
  cy.get("#patch", { timeout: 10000 }).should("exist");
});
