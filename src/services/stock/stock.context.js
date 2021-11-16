import axios from "axios";

import React, { createContext, useState, useEffect } from "react";
import { symbolSearchAPI } from "../../utils/stockapi/stockapi";

export const StockContext = createContext();

export const StockContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [stockQuote, setStockQuote] = useState();
  const [stockPrice, setStockPrice] = useState("");
  const [modal, setModal] = useState(false);

  const searchStock = async (searchSymbol = null) => {
    axios
      .get(`https://api.twelvedata.com/symbol_search?symbol=${searchSymbol}`)
      .then((response) => {
        let stk = response.data.data.filter((n) => {
          return n.country === "India" || n.country === "United States";
        });

        setSearchResults(stk);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const getStock = async (symbol = null, exchange = null) => {
    axios
      .get(
        `https://api.twelvedata.com/quote?symbol=${symbol}&exchange=${exchange}&apikey=b1f9cd172d4b469f8e32de79a128861b`
      )
      .then((response) => {
        setStockQuote(response.data);
        axios
          .get(
            `https://api.twelvedata.com/price?symbol=${symbol}&apikey=b1f9cd172d4b469f8e32de79a128861b`
          )
          .then((data) => {
            setStockPrice(data.data);
            setModal(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    searchResults.filter(
      (n) => n.country === "United States" || n.country === "India"
    );
  }, [searchResults]);
  useEffect(() => {
    searchStock();
  }, []);

  return (
    <StockContext.Provider
      value={{
        searchResults,
        modal,
        searchStock,
        getStock,
        stockQuote,
        stockPrice,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};
