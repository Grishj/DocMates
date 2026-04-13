import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS, SPACING } from "../../theme";

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  color?: string;
  thickness?: number;
  spacing?: number;
  label?: string;
  labelStyle?: TextStyle;
  style?: ViewStyle;
};

const Divider = ({
  orientation = "horizontal",
  color = COLORS.border,
  thickness = 1,
  spacing = SPACING.md,
  label,
  labelStyle,
  style,
}: DividerProps) => {
  if (orientation === "vertical") {
    return (
      <View
        style={[
          {
            width: thickness,
            alignSelf: "stretch",
            backgroundColor: color,
            marginHorizontal: spacing,
          },
          style,
        ]}
      />
    );
  }

  if (label) {
    return (
      <View style={[styles.labelRow, { marginVertical: spacing }, style]}>
        <View
          style={[styles.line, { backgroundColor: color, height: thickness }]}
        />
        <Text style={[styles.labelText, labelStyle]}>{label}</Text>
        <View
          style={[styles.line, { backgroundColor: color, height: thickness }]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: color,
          marginVertical: spacing,
        },
        style,
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
  },
  labelText: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginHorizontal: SPACING.sm,
  },
});
