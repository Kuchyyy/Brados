import { createContext, useContext } from "react";

export const TeamSheetContext = createContext<() => void>(() => {});

export const useOpenTeam = () => useContext(TeamSheetContext);
