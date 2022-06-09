import React from "react";
import { Dimensions } from "react-native";

import { TopCircle, BottomCircle } from "./styles";

export default () => {
  let circleDiameter = Dimensions.get("window").width * 0.72;

  return (
    <>
      <TopCircle
        style={{
          width: circleDiameter,
          height: circleDiameter,
          leftPosition: 0,
          topPosition: 0,
        }}
      />
      <BottomCircle
        style={{
          width: circleDiameter,
          height: circleDiameter,
          rightPosition: 0,
          bottomPosition: 0,
        }}
      />
    </>
  );
};
