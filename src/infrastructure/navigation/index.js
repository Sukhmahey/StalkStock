import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavigator } from "./home.navigator";

export const Navigation = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
