import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NewsScreen from "../../features/news/screens/news.screen";
import LivestockScreen from "../../features/stock/screens/livestock.screen";
import { ChatNavigator } from "./chat.navigator";
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
    <Tab.Screen name="Chat" component={ChatNavigator} />
  </Tab.Navigator>
);
