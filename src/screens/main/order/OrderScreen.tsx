import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "@components/index";

const OrderScreen = () => {
  return (
    <>
      <Header title="My Screen" backgroundColor="red" showBackButton onBack={() => { }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>OrderScreen</Text>
      </View>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
