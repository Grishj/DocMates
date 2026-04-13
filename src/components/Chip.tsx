import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../theme";
import AppText from "./ui/Text";

type ChipVariant = "filled" | "outline" | "soft";
type ChipSize = "sm" | "md" | "lg";

type ChipProps = {
  label: string;
  // variants
  variant?: ChipVariant;
  size?: ChipSize;
  // colors
  color?: string;
  textColor?: string;
  // state
  selected?: boolean;
  disabled?: boolean;
  // icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // close/delete
  closable?: boolean;
  onClose?: () => void;
  // press
  onPress?: () => void;
  // style
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Chip = ({
  label,
  variant = "filled",
  size = "md",
  color = COLORS.primary,
  textColor,
  selected = false,
  disabled = false,
  leftIcon,
  rightIcon,
  closable = false,
  onClose,
  onPress,
  style,
  textStyle,
}: ChipProps) => {
  const resolvedTextColor = textColor ?? getTextColor(variant, color, selected);

  const chipStyle = [
    styles.base,
    sizeStyles[size].container,
    getVariantStyle(variant, color, selected),
    disabled && styles.disabled,
    style,
  ];

  const content = (
    <>
      {leftIcon && <View style={styles.iconSlot}>{leftIcon}</View>}

      <AppText
        variant="caption"
        color={resolvedTextColor}
        style={[sizeStyles[size].text, textStyle] as unknown as TextStyle}
      >
        {label}
      </AppText>

      {rightIcon && !closable && (
        <View style={styles.iconSlot}>{rightIcon}</View>
      )}

      {closable && (
        <TouchableOpacity
          onPress={onClose}
          disabled={disabled}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.closeButton}
        >
          <View
            style={[styles.closeLine1, { backgroundColor: resolvedTextColor }]}
          />
          <View
            style={[styles.closeLine2, { backgroundColor: resolvedTextColor }]}
          />
        </TouchableOpacity>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={chipStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.75}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={chipStyle}>{content}</View>;
};

export default Chip;

// ─── Helpers ───────────────────────────────────────────────────
const getVariantStyle = (
  variant: ChipVariant,
  color: string,
  selected: boolean,
): ViewStyle => {
  switch (variant) {
    case "filled":
      return {
        backgroundColor: selected ? color : COLORS.border,
        borderWidth: 0,
      };
    case "outline":
      return {
        backgroundColor: selected ? `${color}15` : "transparent",
        borderWidth: 1.5,
        borderColor: selected ? color : COLORS.border,
      };
    case "soft":
      return {
        backgroundColor: selected ? `${color}20` : COLORS.background,
        borderWidth: 0,
      };
  }
};

const getTextColor = (
  variant: ChipVariant,
  color: string,
  selected: boolean,
): string => {
  switch (variant) {
    case "filled":
      return selected ? COLORS.white : COLORS.textSecondary;
    case "outline":
      return selected ? color : COLORS.textSecondary;
    case "soft":
      return selected ? color : COLORS.textSecondary;
  }
};

// ─── Size Styles ───────────────────────────────────────────────
const sizeStyles: Record<ChipSize, { container: ViewStyle; text: TextStyle }> =
  {
    sm: {
      container: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs / 2,
        gap: SPACING.xs / 2,
      },
      text: { fontSize: 11 },
    },
    md: {
      container: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        gap: SPACING.xs,
      },
      text: { fontSize: 13 },
    },
    lg: {
      container: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        gap: SPACING.sm,
      },
      text: { fontSize: 14 },
    },
  };

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.full,
    alignSelf: "flex-start",
  },
  iconSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SPACING.xs / 2,
  },
  closeLine1: {
    position: "absolute",
    width: 10,
    height: 1.5,
    borderRadius: RADIUS.full,
    transform: [{ rotate: "45deg" }],
  },
  closeLine2: {
    position: "absolute",
    width: 10,
    height: 1.5,
    borderRadius: RADIUS.full,
    transform: [{ rotate: "-45deg" }],
  },
  disabled: {
    opacity: 0.45,
  },
});
