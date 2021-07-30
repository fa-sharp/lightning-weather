import React, { createContext, ReactNode, useContext } from "react";
import useLocalStorage from "../data/useLocalStorage";

type AppState = ReturnType<typeof useLocalStorage>;

const AppContext = createContext<AppState | null>(null);

export const AppWrapper = ({ children }: { children: ReactNode }) => {

    const appState = useLocalStorage();

    return (
        <AppContext.Provider value={appState}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);