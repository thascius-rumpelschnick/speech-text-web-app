import React from "react";
import { createRoot } from "react-dom/client";
import App, { ViewModel } from "./App";

const vm: ViewModel = JSON.parse(document.getElementById("view-model")?.textContent as string);

const container = document.getElementById("index");

const root = createRoot(container!);

root.render(<App { ...vm } />);
