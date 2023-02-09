import React, { useState } from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  buttonOpacity,
  colors,
  fonts,
  fontSizeNoUnits,
} from "../../defaultStyles";
import { TouchableCard, Subtitle, SubtitleContainer, Title } from "./styles";
import { ScrollView } from "react-native";
const AnimatedView = Animated.createAnimatedComponent(View);
import Header from "../../components/Header";

export default (props) => {
  const [isCreating, setIsCreating] = useState(props.creating);
  const [isLoading, setIsLoading] = useState(false);
  const [itemData, setItemData] = useState({
    id: props.itemId,
    name: props.text,
    isEditing: false,
  });
  const [innerScorecards, setInnerScorecards] = useState([]);

  const screenWidth = Dimensions.get("window").width;

  const animatedHeight = useSharedValue(10);
  const viewProps = useAnimatedProps(() => {
    return {
      height: animatedHeight.value,
      width: screenWidth * 0.8,
      style: {
        backgroundColor: "#fff",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
    };
  }, [itemData.isEditing]);

  const openTab = async () => {
    setItemData({ ...itemData, isEditing: !itemData.isEditing });

    if (innerScorecards.length == 0 && !itemData.isEditing) {
      setIsLoading(true);
    }
    animatedHeight.value = withSpring(!itemData.isEditing ? 100 : 10);
  };

  const closeTab = async () => {
    setIsLoading(true);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableCard
        activeOpacity={buttonOpacity}
        onPress={() => {
          if (!isCreating) {
            openTab().then(() => {
              setIsLoading(false);
            });
          }
          if (itemData.isEditing) {
            closeTab();
          }
        }}
      >
        <Text style={styles.title} numberOfLines={1}>
          Scorecard
        </Text>
      </TouchableCard>

      <AnimatedView animatedProps={viewProps}>
        {itemData.isEditing && !isLoading ? (
          <ScrollView style={{ width: "100%" }} nestedScrollEnabled={true}>
            <View
              style={{
                alignItems: "flex-start",
                flex: 1,
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text>item1</Text>
              <Text>item2</Text>
            </View>
          </ScrollView>
        ) : null}
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    fontFamily: fonts.spartanR,
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSizeNoUnits.cardText,
    marginLeft: 5,
    paddingRight: 5,
    color: colors.text,
    flex: 2,
  },
  number: {
    textAlign: "center",
    fontFamily: fonts.spartanR,
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSizeNoUnits.cardText,
    color: colors.orange,
    marginLeft: 10,
    flex: 0.5,
  },
});
