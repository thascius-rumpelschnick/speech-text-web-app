import React from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "../../hooks/AppContext";
import App from "./App";

const container = document.getElementById("add");

const root = createRoot(container!);

root.render(
    <AppContextProvider>
        <App />
    </AppContextProvider>,
);
