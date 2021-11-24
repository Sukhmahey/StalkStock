import { sortedIndex } from "lodash";
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { StreamChat } from "stream-chat";
import {
  ChannelList,
  Chat,
  OverlayProvider,
  useChannelsContext,
} from "stream-chat-react-native";
import { SafeArea } from "../../../components/utility/SafeArea.component";

import { AuthContext } from "../../../services/auth/auth.context";

const filters = {};
const options = { limit: 20, messages_limit: 30 };

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const CustomPreviewTitle = ({ channel }) => (
  <Text>
    {channel.data.name} - {channel.data.description}
  </Text>
);

const chatClient = StreamChat.getInstance("bvdmsd4p8nfu");

const ChatScreen = ({ navigation, route }) => {
  const { userData, setChatClient, chanelData, setChannelData } =
    useContext(AuthContext);

  const [channelsKey, setChannelsKey] = useState(1);
  const [channel, setChannels] = useState([]);
  // DATA FOR MODAL
  const [modalVisible, setModalVisible] = useState(false);
  const [chatRoomName, setChatRoomName] = useState("");
  const [chatRoomDescription, setChatRoomDescription] = useState("");

  // HEADER
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        modalVisible ? null : (
          <Button
            onPress={() => setModalVisible(!modalVisible)}
            title="Create"
          />
        ),
      headerLeft: () => null,
    });
  }, [navigation, modalVisible]);

  // INIT STREAM - ONCE
  useEffect(() => {
    const connectStreamUser = async () => {
      try {
        await chatClient.connectUser(
          {
            id: userData.userId,
            name: userData.userName,
          },
          chatClient.devToken(userData.userId)
        );
        console.log("logged in");
        setChatClient(chatClient);
        setChannelsKey(channelsKey + 1);
      } catch (err) {
        console.log("----------ERROR-----------");
        console.log(err);
      }
    };

    if (!chatClient.userID) {
      connectStreamUser();
    }
  }, []);

  useEffect(async () => {
    const channels = await chatClient.queryChannels(filters, sortedIndex, {
      watch: true, // this is the default
      state: true,
    });

    channels.map((chan) => {
      console.log(chan.data.name, chan.id);
      var result = channel.find((obj) => {
        return obj.id === chan.data.id;
      });
      if (!result) {
        setChannels((channel) => [
          ...channel,
          {
            name: chan.data.name,
            id: chan.id,
            description: chan.data.description,
            channel: chan,
          },
        ]);
      }
    });
  }, [chatClient, modalVisible]);

  async function createChatRoom() {
    const channel = chatClient.channel("messaging", makeid(9), {
      name: chatRoomName,
      description: chatRoomDescription,
    });

    try {
      await channel.create();
    } catch (err) {
      console.log(err);
    }

    setModalVisible(!modalVisible);
    setChatRoomName("");
    setChatRoomDescription("");

    setChannelsKey(channelsKey + 1);
  }

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <SafeArea>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create Chat Room</Text>
            <TextInput
              style={styles.input}
              onChangeText={setChatRoomName}
              value={chatRoomName}
              placeholder="Chat Room Name"
            />
            <TextInput
              style={styles.inputMultiline}
              onChangeText={setChatRoomDescription}
              value={chatRoomDescription}
              multiline
              numberOfLines={4}
              maxLength={100}
              placeholder="Short Description"
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={handleCancel}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  createChatRoom();
                }}
              >
                <Text style={styles.textStyle}>Create Room</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1, margin: 8 }}>
        <FlatList
          data={channel}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setChannelData(item.channel);
                  navigation.navigate("ChatRoom", {
                    name: item.name,
                    id: item.id,
                  });
                }}
              >
                <View
                  style={{
                    padding: 12,
                    borderBottomWidth: 0.5,
                    marginBottom: 10,
                    borderColor: "blue",
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 0.2,
    padding: 5,
  },
  inputMultiline: {
    padding: 5,
    width: 200,
    height: 80,
    margin: 12,
    borderWidth: 0.2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: "#888888",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 200,
  },
});

export default ChatScreen;
