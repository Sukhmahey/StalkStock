import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavigator } from "./home.navigator";
import { AccountNavigator } from "./account.navigator";
import { ChatNavigator } from "./chat.navigator";
import { AuthContext } from "../../services/auth/auth.context";

export const Navigation = () => {
  const { auth } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {auth ? <HomeNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
