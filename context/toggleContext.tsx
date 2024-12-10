"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface HamburgerContextType {
  toggleHamburger: boolean;
  setToggleHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}

const HamburgerContext = createContext<HamburgerContextType | null>(null);

interface ToggleContextProps {
  children: ReactNode;
}

const ToggleContext: React.FC<ToggleContextProps> = ({ children }) => {
  const [toggleHamburger, setToggleHamburger] = useState(false);

  const toggle = () => setToggleHamburger((prev) => !prev);

  return (
    <HamburgerContext.Provider
      value={{ toggleHamburger, setToggleHamburger, toggle }}
    >
      {children}
    </HamburgerContext.Provider>
  );
};

export const useHamburger = () => {
  const context = useContext(HamburgerContext);
  if (context === null) {
    throw new Error("Context used outside of its provider scope");
  }
  return context;
};

export default ToggleContext;
