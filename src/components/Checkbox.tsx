import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { COLORS, RADIUS, SPACING } from "../theme";
import AppText from "./ui/Text";

type CheckboxSize = "sm" | "md" | "lg";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  color?: string;
  style?: ViewStyle;
};

const SIZES: Record<CheckboxSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
  color = COLORS.primary,
  style,
}: CheckboxProps) => {
  const boxSize = SIZES[size];

  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      onPress={() => onChange(!checked)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.box,
          {
            width: boxSize,
            height: boxSize,
            borderRadius: RADIUS.sm / 2,
            borderColor: disabled
              ? COLORS.buttonDisabled
              : checked
                ? color
                : COLORS.border,
            backgroundColor: checked
              ? disabled
                ? COLORS.buttonDisabled
                : color
              : COLORS.white,
          },
        ]}
      >
        {checked && (
          <View style={styles.checkmark}>
            <View style={[styles.checkShort, { borderColor: COLORS.white }]} />
            <View style={[styles.checkLong, { borderColor: COLORS.white }]} />
          </View>
        )}
      </View>

      {label && (
        <AppText
          variant="caption"
          color={disabled ? COLORS.textMuted : COLORS.textPrimary}
          style={styles.label}
        >
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  box: {
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 3,
    left: 2,
  },
  checkShort: {
    width: 4,
    height: 7,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: "45deg" }],
    marginRight: -1,
  },
  checkLong: {
    width: 7,
    height: 4,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: "-45deg" }],
    marginLeft: -1,
    marginBottom: 2,
  },
  label: {
    flexShrink: 1,
  },
});
