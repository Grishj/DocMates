import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ROUTES } from "@constants/index";
const DetailScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>DetailScreen</Text>
      <Button
        title="Go to checkout"
        onPress={() => navigation.navigate(ROUTES.CHECKOUT)}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
