import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

import { Navigation } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";
import { NewsContextProvider } from "./src/services/news/news.context";

const App = () => (
  <SafeAreaProvider>
    <StatusBar />
    <ThemeProvider theme={theme}>
      <NewsContextProvider>
        <Navigation />
      </NewsContextProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
