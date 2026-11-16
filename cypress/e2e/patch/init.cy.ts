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
          // Some platforms never settle requestMIDIAccess(): no MIDI service,
          // or a permission prompt that is never answered.
          cy.stub(win.navigator, "requestMIDIAccess").returns(
            new Promise(() => {}) as unknown as Promise<MIDIAccess>,
          );
          break;
      }
    },
  });

describe("patch: audio/midi start gate", () => {
  (["instant", "denied", "hang"] as const).forEach((behavior) => {
    it(`opens the editor when MIDI access is ${behavior}`, () => {
      visitWithMidi(behavior);

      cy.get("#start").should("be.visible").click();

      cy.get("#patch", { timeout: 10000 }).should("exist");
      cy.get("#init").should("not.exist");
      cy.contains("starting midi").should("not.exist");
    });
  });
});
