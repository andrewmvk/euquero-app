import React from "react";
import { Text } from "react-native";
import { Card1 } from "./styles";

export default () => {
  return (
    <Card1 style={{ borderLeftColor: "#FF6B0F", borderLeftWidth: 7 }}>
      <Text
        style={{
          textAlign: "left",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          marginLeft: 22,
          color: "#7F7F7F",
        }}
      >
        Mato Grosso do Sul
      </Text>
    </Card1>
  );
};
