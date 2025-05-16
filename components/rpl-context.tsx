"use client";

import { Section } from "@/type/type";
import { createContext, useContext, type ReactNode } from "react";

// Define the context type
export interface RPLContextType {
  sections: Section[];
}

// Create the context with a default empty value
const RPLContext = createContext<RPLContextType | undefined>(undefined);

// Provider component
export function RPLProvider({
  children,
  initialQualifications,
}: {
  children: ReactNode;
  initialQualifications: Section[];
}) {
  // The value we'll provide to consumers
  const value: RPLContextType = {
    sections: initialQualifications,
  };

  return <RPLContext.Provider value={value}>{children}</RPLContext.Provider>;
}

// Custom hook for client components to use the context
export function useRPL() {
  const context = useContext(RPLContext);

  if (context === undefined) {
    throw new Error("useRPL must be used within a RPLProvider");
  }

  return context;
}
