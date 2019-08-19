import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as webmidi from "webmidi";

import configureStore from "./store";
import "./main.css";

import { App } from "./synth-ui/app";

const appRoot = document.getElementById("root") as HTMLElement;
const store = configureStore();

let _debugMode = window.location.hash === "#sk_debug";
let _webmidiEnabled = true;

webmidi.enable(function(err: string) {
  if (!!err) {
    _webmidiEnabled = false;
  }
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    appRoot
  );
});

export const debugMode = () => _debugMode;
export const webmidiEnabled = () => _webmidiEnabled;

if (debugMode()) console.log("debug mode");
