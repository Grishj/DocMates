import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type ColumnProps = {
  children: React.ReactNode;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  gap?: number;
  flex?: number;
  style?: ViewStyle;
};

const Column = ({
  children,
  align = "flex-start",
  justify = "flex-start",
  gap = 0,
  flex,
  style,
}: ColumnProps) => {
  return (
    <View
      style={[
        styles.column,
        {
          alignItems: align,
          justifyContent: justify,
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

export default Column;

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
});
