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
import { Searchbar } from "react-native-paper";

import { StreamChat } from "stream-chat";

import { SafeArea } from "../../../components/utility/SafeArea.component";
import { Entypo, AntDesign } from "@expo/vector-icons";
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
  const [value, setValue] = useState(undefined);
  const [searchResults, setSearchResults] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  // DATA FOR MODAL
  const [modalVisible, setModalVisible] = useState(false);
  const [chatRoomName, setChatRoomName] = useState("");
  const [chatRoomDescription, setChatRoomDescription] = useState("");

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
      var result = channel.find((obj) => {
        return obj.id === chan.data.id;
      });
      if (!result) {
        setChannels((channel) => [
          ...channel,
          {
            name: chan.data.name,
            id: chan.id,
            cid: chan.cid,
            description: chan.data.description,
            channel: chan,
          },
        ]);
      }
    });
  }, [chatClient, modalVisible, navigation]);

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

  const handleSearch = (text) => {
    if (!text) {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      channel.filter((query) => {
        const string = query.name.toLowerCase();
        return string.includes(text);
      })
    );
  };

  return (
    <SafeArea>
      <View style={{ padding: 8 }}>
        <Searchbar
          placeholder="Search Channel"
          icon={() => <AntDesign name="search1" size={20} color="black" />}
          clearIcon={() => (
            <Entypo name="circle-with-cross" size={20} color="black" />
          )}
          onChangeText={(text) => {
            setValue(text);
            handleSearch(text);
          }}
          value={value}
        />
      </View>
      <View style={styles.searchResults}>
        {searchResults.map((n) => (
          <TouchableOpacity
            key={n.id}
            activeOpacity={(0, 7)}
            onPress={() =>
              navigation.navigate("ChatRoomNav", {
                screen: "ChatRoom",
                params: {
                  name: n.name,
                  id: n.id,
                  cid: n.cid,
                },
              })
            }
          >
            <Text style={{ ...styles.singleResult }}>
              {n.name} - {n.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
                  navigation.navigate("ChatRoomNav", {
                    screen: "ChatRoom",
                    params: {
                      name: item.name,
                      id: item.id,
                      cid: item.cid,
                    },
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
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: "black" }}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Button
          title="create ChatRoom"
          style={styles.float}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  searchResults: {
    position: "absolute",
    zIndex: 1,
    top: 50,
    margin: 10,
    flex: 1,
    width: "90%",
    backgroundColor: "white",
  },
  singleResult: {
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    shadowColor: "black",
    backgroundColor: "orange",
    elevation: 5,
  },
  float: {
    backgroundColor: "#ee6e73",
    position: "absolute",
    bottom: 0,
  },
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
