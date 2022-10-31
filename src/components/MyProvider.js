import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [activeAnime, setActiveAnime] = useState(false);

  return (
    <MyContext.Provider
      value={{
        activeAnime,
        setActiveAnime,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const MyState = () => {
  return useContext(MyContext);
};

export default MyProvider;
