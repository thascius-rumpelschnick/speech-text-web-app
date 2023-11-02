import React, { createContext } from "react";

export interface User {
    id: number,
    name: string,
}

export interface AppContext<M extends object> {
    user: User | null
    model: M,
}

let viewModel;
try {
    viewModel = JSON.parse(document.getElementById("view-model")?.textContent as string);
} catch (error) {
    console.debug("AppContext:", error);
}

export const AppContext = createContext(viewModel);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({context, children}) => {
    return <AppContext.Provider value={context}>{ children }</AppContext.Provider>;
};
