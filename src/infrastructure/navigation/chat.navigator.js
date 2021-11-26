import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../../features/chat/screens/chat.screen";
import ChatRoomScreen from "../../features/chat/screens/chatroom.screen";

const Stack = createStackNavigator();

const createScreenOptions = () => ({
  headerShown: false,
});
const ChatRoomNav = () => (
  <Stack.Navigator>
    <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
  </Stack.Navigator>
);

export const ChatNavigator = () => (
  <Stack.Navigator screenOptions={createScreenOptions}>
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="ChatRoomNav"
      component={ChatRoomNav}
      options={{
        title: "ChatRoom",
      }}
    />
  </Stack.Navigator>
);
