import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  AppImage,
  AppText,
  Button,
  Header,
  WrapperContainer,
} from "../../components";
import { TYPOGRAPHY, COLORS } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
const WelcomeScreen = () => {
  return (
    <Header
      title="DocsMate"
      rightText="Save"
      elevated
      backgroundColor={COLORS.primary}
      rightTextColor={COLORS.white}
      rightTextAction={() => handleSave()}
    />
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
