import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type RowProps = {
  children: React.ReactNode;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  wrap?: boolean;
  gap?: number;
  flex?: number;
  style?: ViewStyle;
};

const Row = ({
  children,
  align = "center",
  justify = "flex-start",
  wrap = false,
  gap = 0,
  flex,
  style,
}: RowProps) => {
  return (
    <View
      style={[
        styles.row,
        {
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? "wrap" : "nowrap",
          gap,
          ...(flex !== undefined && { flex }),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
