import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../../features/chat/screens/chat.screen";
import ChatRoomScreen from "../../features/chat/screens/chatroom.screen";

const Stack = createStackNavigator();

const createScreenOptions = () => ({
  headerShown: true,
});

export const ChatNavigator = () => (
  <Stack.Navigator screenOptions={createScreenOptions}>
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
  </Stack.Navigator>
);
