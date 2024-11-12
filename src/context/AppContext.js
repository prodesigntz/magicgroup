"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "@/firebase/firebaseInit";

/// Create a context with a default value of null for the user
const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isFetchingAuthUser, setIsFetchingAuthUser] = useState(true);
  const { auth } = firebase;

  //auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setIsFetchingAuthUser(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // Define a function to log out the user
  const unSetAuthUser = () => {
    setAuthUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        authUser,
        setAuthUser,
        unSetAuthUser,
        isFetchingAuthUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
