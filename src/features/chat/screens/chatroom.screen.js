import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StreamChat } from "stream-chat";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider as ChatOverlayProvider,
} from "stream-chat-react-native";
import { SafeArea } from "../../../components/utility/SafeArea.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../../../services/auth/auth.context";
import Entypo from "react-native-vector-icons/Entypo";
const chatClient = StreamChat.getInstance("bvdmsd4p8nfu");

const ChatRoomScreen = ({ navigation, route }) => {
  const { id, name } = route.params;

  const { bottom } = useSafeAreaInsets();
  const [channel, setChannel] = useState();

  useEffect(() => {
    navigation.setOptions({ title: `${name}` });

    const createAndWatchChannel = async () => {
      const newChannel = chatClient.channel("messaging", id);
      newChannel.watch();
      setChannel(newChannel);
    };

    createAndWatchChannel();
  }, []);

  return (
    <SafeAreaView>
      <ChatOverlayProvider bottomInset={bottom} topInset={0}>
        <Chat client={chatClient}>
          <Channel channel={channel} keyboardVerticalOffset={0}>
            <View style={StyleSheet.absoluteFill}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </ChatOverlayProvider>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
