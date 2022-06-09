import React, { useEffect, useRef } from "react";
import { Animated, View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "../../../assets/images/euquero-logo.svg";

export default (props) => {
  let viewHeight = Dimensions.get("window").height * 0.6;

  const startAnimation = useRef(new Animated.Value(0)).current;
  const lessOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height * 0.25,
          useNativeDriver: true,
        }),
        Animated.timing(lessOpacity, {
          toValue: 0,
          duration: 550,
          useNativeDriver: true,
        }),
      ]).start();
    }, 550);
  }, []);

  return (
    <Animated.View
      style={{
        postion: "absolute",
        flex: 1,
        backgroundColor: "#6a426e",
        justifyContent: "center",
        alignItems: "center",
        opacity: lessOpacity,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: viewHeight,
        }}
      >
        <Animated.View style={{ transform: [{ translateY: startAnimation }] }}>
          <Logo />
        </Animated.View>
      </View>
    </Animated.View>
  );
};
