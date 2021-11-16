import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { StockContext } from "../../../services/stock/stock.context";
import { Searchbar } from "react-native-paper";
import StockComponent from "./stock.component";
import { Entypo } from "@expo/vector-icons";

const StockSearch = () => {
  const {
    searchResults,
    searchStock,
    stockQuote,
    getStock,
    stockPrice,
    modal,
  } = useContext(StockContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [click, setClick] = useState(true);
  const [value, setValue] = useState("");

  const handleSearch = () => {
    setModalVisible(true);
  };

  // const handleSearch = (text) => {
  //   if (!text) {
  //     setSearchResults([]);
  //     return;
  //   }
  //   setSearchResults(
  //     articles.filter((query) => {
  //       const string = query.title.toLowerCase();
  //       return string.includes(text);
  //     })
  //   );
  // };

  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        placeholder="Stock by company name"
        onChangeText={(text) => {
          setValue(text);
          searchStock(text);
        }}
        value={value}
      />
      <ScrollView style={styles.searchResults}>
        {searchResults.map((n) => (
          <TouchableOpacity
            key={`${n.symbol}${n.exchange}${n.country}${n.instrument_name}${
              n.exchange_timezone
            }${n.currency}${Math.random()}`}
            activeOpacity={(0, 7)}
            onPress={() => {
              getStock(n.symbol, n.exchange);
              handleSearch();
            }}
          >
            <Text style={{ ...styles.singleResult }}>
              {n.instrument_name} ({n.exchange}/{n.country})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
          <Entypo name="circle-with-cross" size={30} color="white" />
        </TouchableOpacity>
        <View style={{ height: "100%" }}>
          <StockComponent stock={stockQuote} price={stockPrice.price} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResults: {
    zIndex: 1,
    margin: 10,
    flexGrow: 1,
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

export default StockSearch;
