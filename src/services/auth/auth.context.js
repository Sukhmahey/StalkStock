import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannelData] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userData,
        setUserData,
        chatClient,
        setChatClient,
        channel,
        setChannelData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
