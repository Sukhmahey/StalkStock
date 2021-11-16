import React from "react";
import {
  Text,
  Image,
  Dimensions,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";

const WINDOW_WIDTH = Dimensions.get("window").width;

const TitleText = styled(Text)`
  margin-top: 10px;
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 10px;
  color: white;
`;
const DescriptionText = styled(Text)`
  color: white;
  font-size: 18px;
  padding-bottom: 10px;
`;
const NewsContainer = styled.View`
  flex: 1;
  background-color: #282c35;
`;

const NewsComponent = ({ item, index }) => (
  <NewsContainer>
    <Image
      source={{ uri: item.urlToImage }}
      style={{
        height: "40%",
        resizeMode: "stretch",
        width: WINDOW_WIDTH,
        backgroundColor: "black",
      }}
    />
    <View
      style={{
        backgroundColor: "#282C35",
      }}
    >
      <TitleText>{item.title}</TitleText>
      <DescriptionText numberOfLines={4}>{item.description}</DescriptionText>
    </View>

    <ImageBackground
      blurRadius={30}
      style={styles.footer}
      source={{ uri: item.urlToImage }}
    >
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <Text style={{ fontSize: 15, color: "white" }}>
          `{item?.content?.slice(0, 45)}...`
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
          Read More
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  </NewsContainer>
);

const styles = StyleSheet.create({
  footer: {
    height: 60,
    width: WINDOW_WIDTH,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#d7be69",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default NewsComponent;
