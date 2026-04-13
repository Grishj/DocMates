import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SPACING } from "../theme";
import Chip from "./Chip";

type ChipOption = {
  label: string;
  value: string | number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

type ChipGroupProps = {
  options: ChipOption[];
  // single or multi select
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  multiple?: boolean;
  // appearance
  variant?: "filled" | "outline" | "soft";
  size?: "sm" | "md" | "lg";
  color?: string;
  wrap?: boolean;
  gap?: number;
  style?: ViewStyle;
};

const ChipGroup = ({
  options,
  value,
  onChange,
  multiple = false,
  variant = "outline",
  size = "md",
  color,
  wrap = true,
  gap = SPACING.sm,
  style,
}: ChipGroupProps) => {
  const isSelected = (optValue: string | number): boolean => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optValue);
    }
    return value === optValue;
  };

  const handlePress = (optValue: string | number) => {
    if (!onChange) return;

    if (multiple && Array.isArray(value)) {
      const already = value.includes(optValue);
      onChange(
        already ? value.filter((v) => v !== optValue) : [...value, optValue],
      );
    } else {
      onChange(optValue);
    }
  };

  return (
    <View style={[styles.container, wrap && styles.wrap, { gap }, style]}>
      {options.map((opt) => (
        <Chip
          key={String(opt.value)}
          label={opt.label}
          variant={variant}
          size={size}
          color={color}
          selected={isSelected(opt.value)}
          onPress={() => handlePress(opt.value)}
          leftIcon={opt.leftIcon}
          rightIcon={opt.rightIcon}
        />
      ))}
    </View>
  );
};

export default ChipGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrap: {
    flexWrap: "wrap",
  },
});
