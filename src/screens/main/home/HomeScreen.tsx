import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, TYPOGRAPHY, SPACING } from "../../../theme";
const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Text style={{ fontFamily: FONTS.bold }}>HomeScreen</Text>
      <Text style={{ fontFamily: FONTS.regular }}>HomeScreen</Text>
      <Text style={{ fontFamily: FONTS.medium }}>HomeScreen</Text>
      <Text style={{ fontFamily: FONTS.nepali, fontSize: 16 }}>नमस्ते </Text>
      <Text style={[TYPOGRAPHY.h1, { color: COLORS.primary }]}>Hey DevOps</Text>
      <Text
        style={[
          TYPOGRAPHY.body,
          { color: COLORS.textSecondary, marginTop: SPACING.xxxl },
        ]}
      >
        Description text goes here
      </Text>

      <Text style={{ fontFamily: FONTS.nepalibold, fontSize: 20 }}>
        नमस्ते{" "}
      </Text>
      <Text style={{ fontFamily: FONTS.nepalisemibold, fontSize: 66 }}>
        नमस्ते{" "}
      </Text>

      <Button
        title="Go to Detail"
        onPress={() =>
          navigation.navigate(ROUTES.HOME, {
            screen: ROUTES.DETAIL,
          })
        }
      />

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.buttonPrimary,
          padding: SPACING.md,
          marginHorizontal: SPACING.lg,

          marginTop: SPACING.xxl,
          borderRadius: SPACING.xl,
        }}
      >
        <Text
          style={[
            TYPOGRAPHY.body,
            { color: COLORS.buttonPrimaryText, textAlign: "center" },
          ]}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
