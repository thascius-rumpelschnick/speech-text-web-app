import React, { createContext } from "react";
import { User } from "../interface/ContainerProps";

export interface AppContext<M extends object> {
    user: User | null,
    model: M,
}

const content = document.getElementById("view-model")?.textContent;
const vm = JSON.parse(content ?? "{}");

export const AppContext = createContext(vm);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ context, children }) => <AppContext.Provider value={ context }>{ children }</AppContext.Provider>;
