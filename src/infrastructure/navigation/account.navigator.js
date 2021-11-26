import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../features/account/screens/login.screen";
const Stack = createStackNavigator();

const createScreenOptions = () => ({
  headerShown: true,
});

export const AccountNavigator = () => (
  <Stack.Navigator screenOptions={createScreenOptions}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
