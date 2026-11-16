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
  cy.visit("/logout");
  cy.visit("/login");
  cy.get("#email").focus().type(email);
  cy.get("#password").focus().type(`${password}{enter}`);

  cy.location("pathname", { timeout: 10000 }).then((pathname) => {
    if (pathname.includes("register") || pathname.includes("login")) {
      return;
    }

    cy.visit("/account");
    cy.get("#delete").click();
    cy.get("#password").focus().type(password);
    cy.get("#confirm-delete").click();
  });
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

Cypress.Commands.add("deleteUserByApi" as any, (email: string, password: string) => {
  return cy
    .request({
      method: "POST",
      url: api("/auth/login"),
      body: { email, password },
      failOnStatusCode: false,
    })
    .then((res) => {
      if (res.status !== 200) {
        return cy.wrap(null);
      }

      return cy.request({
        method: "DELETE",
        url: api("/auth/user"),
        headers: {
          authorization: `Bearer ${res.body.jwt}`,
          "x-password": password,
        },
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
