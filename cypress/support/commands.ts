/// <reference types="cypress" />

const api = (path: string) => `${Cypress.env("API_URL")}${path}`;

const setJwt = (jwt: string) =>
  cy.window().then((win) => {
    win.localStorage.setItem("jwt", JSON.stringify(jwt));
  });

const apiSignIn = (email: string): Cypress.Chainable<string> => {
  return cy
    .request({
      method: "POST",
      url: api("/auth/request-code"),
      body: { email },
      failOnStatusCode: false,
    })
    .then((res) => {
      const code = res.body?.code;
      expect(res.status, `request-code ${JSON.stringify(res.body)}`).to.equal(200);
      expect(code, "e2e test echo of the code (TEST_CODE_ECHO=1)").to.be.a("string").and.not.empty;
      return cy.request({
        method: "POST",
        url: api("/auth/verify-code"),
        body: { email, code },
        failOnStatusCode: false,
      });
    })
    .then((res) => {
      expect(res.status, `verify-code ${JSON.stringify(res.body)}`).to.equal(200);
      const jwt = res.body?.jwt;
      expect(jwt, "jwt from verify-code").to.be.a("string").and.not.empty;
      return jwt as string;
    });
};

Cypress.Commands.add("apiSignIn" as any, (email: string) => {
  return apiSignIn(email).then((jwt) => setJwt(jwt).then(() => jwt));
});

Cypress.Commands.add("register" as any, (email: string, password?: string) => {
  cy.visit("/logout").wait(1000);
  cy.visit("/login");
  cy.intercept("POST", "/api/auth/request-code").as("rc");
  cy.get("#email").focus().type(email);
  cy.get("#submit").click();
  cy.wait("@rc")
    .its("response.body.code")
    .then((code: string) => {
      cy.get("#code").focus().type(code);
      cy.get("#submit").click();
    });
  cy.url().should("include", "/dashboard");
});

Cypress.Commands.add("login" as any, (email: string, password?: string) => {
  cy.visit("/logout");
  cy.visit("/login");
  cy.intercept("POST", "/api/auth/request-code").as("rc");
  cy.get("#email").focus().type(email);
  cy.get("#submit").click();
  cy.wait("@rc")
    .its("response.body.code")
    .then((code: string) => {
      cy.get("#code").focus().type(code);
      cy.get("#submit").click();
    });
  cy.url().should("include", "dashboard");
});

Cypress.Commands.add("delete" as any, (email: string, password?: string) => {
  return (cy as any).deleteUserByApi(email, password);
});

Cypress.Commands.add("loginByApi" as any, (email: string, password?: string) => {
  cy.visit("/logout");
  return apiSignIn(email).then((jwt) => {
    return setJwt(jwt).then(() => jwt as string);
  });
});

Cypress.Commands.add("deleteUserByApi" as any, (email: string, password?: string) => {
  cy.visit("/logout");
  return apiSignIn(email).then((jwt) =>
    throughRestart(() =>
      cy.request({
        method: "DELETE",
        url: api("/auth/user"),
        headers: { authorization: `Bearer ${jwt}` },
        failOnStatusCode: false,
      }),
    ).then((deleted) => {
      expect(
        deleted.status,
        `delete user: ${deleted.status} ${JSON.stringify(deleted.body ?? "")}`,
      ).to.equal(200);
      return deleted;
    }),
  );
});

const throughRestart = (
  req: () => Cypress.Chainable<Cypress.Response<any>>,
  tries = 4,
): Cypress.Chainable<Cypress.Response<any>> =>
  req().then((res) => {
    if (res.status === 200 || res.status === 404 || tries <= 0) {
      return cy.wrap(res);
    }
    cy.wait(1000);
    return throughRestart(req, tries - 1);
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

Cypress.Commands.add("visitEditor" as any, (path: string = "/patch/new", extra: object = {}) => {
  cy.visit(path, {
    ...extra,
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
