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

//
Cypress.on("window:before:load", (win: Window) => {
  if (Cypress.env("audio") === "on") return;

  (win as any).eval(`(function () {
    if (window.__muted) return;
    window.__muted = true;
    window.__droppedSpeakerEdges = 0;

    var nativeConnect = AudioNode.prototype.connect;

    AudioNode.prototype.connect = function (target) {
      if (target instanceof AudioDestinationNode) {
        window.__droppedSpeakerEdges++;
        return target;
      }

      return nativeConnect.apply(this, arguments);
    };
  })()`);
});
