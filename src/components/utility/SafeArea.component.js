import styled from "styled-components/native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`;

export const SafeArea = ({ children }) => (
  <SafeAreaContainer>{children}</SafeAreaContainer>
);
