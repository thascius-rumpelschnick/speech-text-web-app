import React, { createContext, useState } from "react";
import { User } from "interfaces/ContainerProps";

interface ContextData<M extends object> {
    user: User | null;
    model: M;
}

export interface AppContextData<M extends object> {
    context: ContextData<M>;
    setContext: (context: ContextData<M>) => void;
}

const content = document.getElementById("view-model")?.textContent;
const vm = JSON.parse(content ?? "{}");

export const AppContext = createContext(vm);

interface AppContextProviderProps {
    children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [ context, setContext ] = useState<unknown>(vm);

    return (
        <AppContext.Provider value={{ context, setContext }}>
            {children}
        </AppContext.Provider>
    );
};

interface StorybookContextProviderProps {
    storybookContext: unknown;
    children: React.ReactNode;
}

export const StorybookContextProvider = ({
    storybookContext,
    children,
}: StorybookContextProviderProps) => {
    const [ context, setContext ] = useState<unknown>(storybookContext);

    return (
        <AppContext.Provider value={{ context, setContext }}>
            {children}
        </AppContext.Provider>
    );
};
