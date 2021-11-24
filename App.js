import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

import { Navigation } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";
import { NewsContextProvider } from "./src/services/news/news.context";
import { StockContextProvider } from "./src/services/stock/stock.context";
import { AuthContextProvider } from "./src/services/auth/auth.context";
import firebase from "@react-native-firebase/app";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCPJdVxlfc4G2FepPSRkMX6yZskZgrXkcY",
    appId: "1:1069795074116:android:10cf16782666e2aec4dc11",
    projectId: "stalkstock-dec0c",
    messagingSenderId: "1069795074116",
    databaseURL: "https://stalkstock-dec0c.firebaseio.com",
    storageBucket:
      "https://console.firebase.google.com/project/stalkstock-dec0c/storage/stalkstock-dec0c.appspot.com/files",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const App = () => (
  <SafeAreaProvider>
    <StatusBar />
    <ThemeProvider theme={theme}>
      <NewsContextProvider>
        <StockContextProvider>
          <AuthContextProvider>
            <Navigation />
          </AuthContextProvider>
        </StockContextProvider>
      </NewsContextProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
