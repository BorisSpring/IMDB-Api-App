import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import store from "./Store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ToggleColorProvider } from "./utils/ToggleColorMode";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToggleColorProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ToggleColorProvider>
  </React.StrictMode>
);
