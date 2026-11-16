const visitWithMidi = (behavior: "instant" | "denied" | "hang") =>
  cy.visit("/patch/new", {
    onBeforeLoad: (win: Window) => {
      const access = {
        inputs: new Map(),
        outputs: new Map(),
        state: "connected",
        on: () => {},
        onstatechange: null,
      };
      switch (behavior) {
        case "instant":
          cy.stub(win.navigator, "requestMIDIAccess").resolves(access);
          break;
        case "denied":
          cy.stub(win.navigator, "requestMIDIAccess").rejects(
            new DOMException("Permission denied", "SecurityError"),
          );
          break;
        case "hang":
          cy.stub(win.navigator, "requestMIDIAccess").returns(
            new Promise(() => {}) as unknown as Promise<MIDIAccess>,
          );
          break;
      }
    },
  });

describe("patch: audio/midi start gate", () => {
  (["instant", "denied"] as const).forEach((behavior) => {
    it(`opens the editor when MIDI access is ${behavior}`, () => {
      visitWithMidi(behavior);

      cy.get("#start").click({ force: true });

      cy.get("#patch", { timeout: 10000 }).should("exist");
      cy.get("#init").should("not.exist");
      cy.get("#start-without-midi").should("not.exist");
    });
  });

  it("asks before starting without MIDI when MIDI never answers", () => {
    visitWithMidi("hang");

    cy.get("#start").click({ force: true });

    cy.get("#start-without-midi", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "start without MIDI");
    cy.get("#patch").should("not.exist");

    cy.get("#start-without-midi").click();

    cy.get("#patch").should("exist");
    cy.get("#init").should("not.exist");
  });
});
