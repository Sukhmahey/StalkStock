import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { getNewsAPI } from "../../utils/newsapi/newsapi";

export const NewsContext = createContext();

export const NewsContextProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("business");
  const [index, setIndex] = useState(0);

  const fetchNews = async () => {
    const { data } = await axios.get(getNewsAPI(category));
    setNews(data);
    setIndex(1);
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <NewsContext.Provider
      value={{ news, index, setIndex, fetchNews, setCategory }}
    >
      {children}
    </NewsContext.Provider>
  );
};
