import React, { useContext, useState } from "react";

const ContextTemplate = React.createContext();

export function useContextTemplate() {
  return useContext(ContextTemplate);
}

export function ContextTemplateProvider({ children }) {
  const [data, setData] = useState("mom");

  function hi() {
    console.log("hi");
    return "hii";
  }

  const value = {
    data,
    hi,
    setData,
  };

  return (
    <ContextTemplate.Provider value={value}>
      {children}
    </ContextTemplate.Provider>
  );
}
