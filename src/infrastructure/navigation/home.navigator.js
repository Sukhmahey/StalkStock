import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "react-native";
import NewsScreen from "../../features/home/screens/news.screen";
import LivestockScreen from "../../features/home/screens/livestock.screen";

const Tab = createMaterialTopTabNavigator();

const createScreenOptions = () => ({
  headerShown: false,
  tabBarStyle: { height: 50 },
  tabBarPosition: "bottom",
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
});

export const HomeNavigator = () => (
  <Tab.Navigator screenOptions={createScreenOptions}>
    <Tab.Screen name="News" component={NewsScreen} />
    <Tab.Screen name="LiveStock" component={LivestockScreen} />
  </Tab.Navigator>
);
