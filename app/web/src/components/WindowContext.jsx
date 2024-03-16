import React, { createContext, useContext, useState } from "react";

const WindowContext = createContext();

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowType, setWindowType] = useState("");

  const openWindow = (type) => {
    setIsWindowOpen(true);
    setWindowType(type);
  };

  const closeWindow = () => {
    setIsWindowOpen(false);
    setWindowType("");
  };

  return (
    <WindowContext.Provider
      value={{ isWindowOpen, windowType, openWindow, closeWindow }}
    >
      {children}
    </WindowContext.Provider>
  );
};
