import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ROUTES } from "@constants/index";
const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Detail"
        onPress={() =>
          navigation.navigate(ROUTES.HOME, {
            screen: ROUTES.DETAIL,
          })
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
