import React, { useContext } from "react";
import { StockContext } from "../../../services/stock/stock.context";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  upOrDownSymbol,
  formatPercentage,
  positiveOrNegative,
} from "./priceFormat.component";

const StockComponent = (stock) => {
  const { stockQuote } = useContext(StockContext);

  const formatMarketCap = (x) =>
    x < 1000000000
      ? (x / 1000000).toFixed(2) + "M"
      : (x / 1000000000).toFixed(2) + "B";
  if (!stockQuote) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.1 }}></View>
      <View style={{ marginBottom: 24, marginTop: 50, alignItems: "center" }}>
        <Text style={styles.companyName}>{stockQuote.name}</Text>
        <Text style={styles.exchange}>
          {stockQuote.exchange}: {stockQuote.symbol}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          marginBottom: 60,
          alignItems: "center",
        }}
      >
        <Text>
          <Text style={styles.latestPrice}>{stock.price} </Text>
          <Text style={{ color: "#6d788c" }}> {stockQuote.currency} </Text>
          <Text>
            <Text style={positiveOrNegative(stockQuote.change)}>
              {stockQuote.change}
            </Text>
            <Text style={positiveOrNegative(stockQuote.change)}>
              ({formatPercentage(stockQuote.change, stockQuote.previous_close)}
              %) {upOrDownSymbol(stockQuote.percent_change)}
            </Text>
          </Text>
        </Text>
        <Text style={styles.latestUpdate}>{Date().toLocaleString()}</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={[styles.column, styles.columnFirst]}>
          <View style={styles.row}>
            <Text style={styles.label}>Open</Text>
            <Text style={styles.value}>{stockQuote.open}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>High</Text>
            <Text style={styles.value}>{stockQuote.high}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Low</Text>
            <Text style={styles.value}>{stockQuote.low}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mkt cap</Text>
            <Text style={styles.value}>
              {formatMarketCap(stockQuote.volume)}
            </Text>
          </View>
        </View>
        <View style={[styles.column, styles.columnSecond]}>
          <View style={styles.row}>
            <Text style={styles.label}>Prev close</Text>
            <Text style={styles.value}>{stockQuote.previous_close}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>52-wk high</Text>
            <Text style={styles.value}>{stockQuote.fifty_two_week.high}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>52-wk low</Text>
            <Text style={styles.value}>{stockQuote.fifty_two_week.low}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#182129",
    padding: 16,
  },
  companyName: {
    color: "#bcc6d9",
    fontWeight: "bold",
    fontSize: 20,
  },
  exchange: {
    color: "#6d788c",
    marginBottom: 6,
  },
  latestPrice: {
    color: "#bcc6d9",
    fontWeight: "bold",
    fontSize: 24,
  },
  latestUpdate: {
    color: "#6d788c",
    fontSize: 12,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderTopColor: "white",
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 16,
    padding: 8,
  },
  column: {
    width: "50%",
  },
  columnFirst: {
    paddingRight: 8,
  },
  columnSecond: {
    paddingLeft: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: "#bcc6d9",
  },
  value: {
    color: "#6d788c",
    fontSize: 14,
  },
});

export default StockComponent;
