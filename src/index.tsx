import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { ThemeProvider } from "./theme-context";
import { AppProvider } from "./reducer";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AppProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppProvider>
  </StrictMode>,
  rootElement
);
