import styled from "styled-components/native";

const sizes = { small: 1, medium: 2, large: 3 };
const positions = {
  left: "margin-left",
  right: "margin-right",
  top: "margin-top",
  bottom: "margin-bottom",
};
const getSize = (props) => {
  const sizeIndex = sizes[props.size];
  const value = props.theme.space[sizeIndex];
  return value;
};
const getPosition = (props) => {
  const positiontype = props.positiontype;
  const positionVariant = positions[positiontype];
  return positionVariant;
};

export const Spacer = styled.View`
  ${(props) => getPosition(props)}: ${(props) => getSize(props)};
`;
