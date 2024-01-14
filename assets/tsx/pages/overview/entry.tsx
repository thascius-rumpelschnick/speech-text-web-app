import React from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "hooks/AppContext";
import App from "pages/overview/App";

const container = document.getElementById("overview");

const root = createRoot(container!);

root.render(
    <AppContextProvider>
        <App />
    </AppContextProvider>
);
