// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// The patch runs a real audio engine, so every test run makes noise. Tests never need to *hear*
// the result — they assert on the graph, state and DOM — so the last edge to the speakers is dropped
// and the whole graph is still built and connected underneath it.
// Opt back in with `CYPRESS_AUDIO=on npx cypress run` when you want sound.
//
// Installed with eval rather than by assigning through `win`: cy.window()/`win` are Cypress
// proxies, so an `instanceof win.AudioDestinationNode` check compares against a wrapper and always
// falls through to the real connect. Eval runs in the app realm, where those names are native.
Cypress.on("window:before:load", (win: Window) => {
  if (Cypress.env("audio") === "on") return;

  (win as any).eval(`(function () {
    if (window.__muted) return;
    window.__muted = true;
    window.__droppedSpeakerEdges = 0;

    var nativeConnect = AudioNode.prototype.connect;

    AudioNode.prototype.connect = function (target) {
      // only the destination is an AudioDestinationNode, so this drops speakers and nothing else
      if (target instanceof AudioDestinationNode) {
        window.__droppedSpeakerEdges++;
        return target;
      }

      return nativeConnect.apply(this, arguments);
    };
  })()`);
});
