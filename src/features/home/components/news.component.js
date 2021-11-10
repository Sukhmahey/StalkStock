import React from "react";
import { Dimensions, Text, View } from "react-native";
import styled from "styled-components/native";

const TitleText = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 10px;
  color: white;
`;
const NewsContainer = styled.View`
  flex:1
  transform: scaleY(-1);
`;

const NewsComponent = ({ item, index }) => (
  <NewsContainer>
    <TitleText>{item.title}</TitleText>
  </NewsContainer>
);

export default NewsComponent;
