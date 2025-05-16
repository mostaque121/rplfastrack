"use client";

import type { Section } from "@/type/type";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface AppContextData {
  sections: Section[];
}

export interface AppContextValue {
  data: AppContextData;
  setSections: (sections: Section[]) => void;
}

// Create the context
const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppContextProvider({
  children,
  initialSections = [],
}: {
  children: ReactNode;
  initialSections?: Section[];
}) {
  const [data, setData] = useState<AppContextData>({
    sections: initialSections,
  });

  const setSections = (sections: Section[]) => {
    setData({ sections });
  };

  const value: AppContextValue = {
    data,
    setSections,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}
