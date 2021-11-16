import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { SafeArea } from "../../../components/utility/SafeArea.component";
import StockSearch from "../components/stockSearch.component";

const LivestockScreen = () => (
  <SafeArea>
    <View style={styles.container}>
      <StockSearch />
      <View>
        <Text style={styles.stockSymbol}>AAL</Text>
        <Text style={styles.stockName}>American Airlines Group</Text>
        <View style={styles.divider} />
      </View>
    </View>
  </SafeArea>
);

const styles = StyleSheet.create({
  stockSymbol: {
    paddingHorizontal: 10,
    paddingTop: 10,
    color: "#fff",
    fontSize: 20,
  },
  stockName: {
    paddingHorizontal: 10,
    color: "#fff",
  },
  divider: {
    marginTop: 10,
    borderBottomColor: "#2F2F2F",
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default LivestockScreen;
