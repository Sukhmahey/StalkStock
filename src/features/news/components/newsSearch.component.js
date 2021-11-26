import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { NewsContext } from "../../../services/news/news.context";
import { Searchbar } from "react-native-paper";
import NewsComponent from "./news.component";
import { Entypo, AntDesign } from "@expo/vector-icons";

const NewsSearch = () => {
  const {
    news: { articles },
  } = useContext(NewsContext);

  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState([]);
  const [value, setValue] = useState("");

  const handleModal = (n) => {
    setModalVisible(true);
    setCurrentNews(n);
  };
  const handleSearch = (text) => {
    if (!text) {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      articles.filter((query) => {
        const string = query.title.toLowerCase();
        return string.includes(text);
      })
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        placeholder="Search for news"
        icon={() => <AntDesign name="search1" size={20} color="black" />}
        clearIcon={() => (
          <Entypo name="circle-with-cross" size={20} color="black" />
        )}
        onChangeText={(text) => {
          handleSearch(text);
          setValue(text);
        }}
        value={value}
      />
      <View style={styles.searchResults}>
        {searchResults.slice(0, 30).map((n) => (
          <TouchableOpacity
            key={n.title}
            activeOpacity={(0, 7)}
            onPress={() => handleModal(n)}
          >
            <Text style={{ ...styles.singleResult }}>{n.title}</Text>
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
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            position: "absolute",
            zIndex: 1,
            right: 0,
            margin: 20,
          }}
        >
          <Entypo name="circle-with-cross" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ height: "100%" }}>
          <NewsComponent item={currentNews} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResults: {
    position: "absolute",
    zIndex: 1,
    top: 50,
    margin: 10,
  },
  singleResult: {
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    shadowColor: "black",
    backgroundColor: "white",
    elevation: 5,
  },
});

export default NewsSearch;
