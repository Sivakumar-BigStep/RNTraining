import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Colors from "../styles/colors";
import * as Spacing from "../styles/spacing";
import styled from "styled-components/native";

const Styles = StyleSheet.create({
  cardBackground: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.PRIMARY,
    ...Spacing.padding,
    ...Spacing.marginVertical,
  },
  likedBackground: {
    backgroundColor: "#a9ff9e",
    borderColor: "#129e00",
  },
  dislikedBackground: {
    backgroundColor: "#ff866e",
    borderColor: "#cf2200",
  },
  factText: {
    color: "black",
    fontSize: 20,
  },
});

const FunFactCard = ({ funFact }) => {
  return (
    <RootComponent rating={funFact.rating}>
      <Text style={Styles.factText}>{funFact.fact}</Text>
    </RootComponent>
  );
};

const RootComponent = styled.View`
  width: "100%";
  border-width: 1px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.rating === 1
      ? "#a9ff9e"
      : props.rating === -1
      ? "#ff866e"
      : Colors.SECONDARY};
  margin: 8px;
  padding: 4px;
`;

export default FunFactCard;
