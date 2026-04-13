import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const getSpinnerColor = () => {
    if (variant === "outline" || variant === "ghost")
      return COLORS.buttonPrimary;
    if (variant === "secondary") return COLORS.buttonSecondaryText;
    return COLORS.buttonPrimaryText;
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variantStyles[variant].container,
        sizeStyles[size].container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getSpinnerColor()} size="small" />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              styles.baseText,
              variantStyles[variant].text,
              sizeStyles[size].text,
              isDisabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

// ─── Base ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    backgroundColor: COLORS.buttonDisabled,
    borderColor: COLORS.buttonDisabled,
  },
  disabledText: {
    color: COLORS.buttonDisabledText,
  },
  baseText: {
    ...TYPOGRAPHY.caption,
    fontWeight: "bold",
    textAlign: "center",
  },
});

// ─── Variant Styles ────────────────────────────────────────────
const variantStyles: Record<
  ButtonVariant,
  { container: ViewStyle; text: TextStyle }
> = {
  primary: {
    container: {
      backgroundColor: COLORS.buttonPrimary,
      borderColor: COLORS.buttonPrimary,
    },
    text: {
      color: COLORS.buttonPrimaryText,
    },
  },
  secondary: {
    container: {
      backgroundColor: COLORS.buttonSecondary,
      borderColor: COLORS.buttonSecondary,
    },
    text: {
      color: COLORS.buttonSecondaryText,
    },
  },
  outline: {
    container: {
      backgroundColor: "transparent",
      borderColor: COLORS.buttonPrimary,
    },
    text: {
      color: COLORS.buttonPrimary,
    },
  },
  ghost: {
    container: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    text: {
      color: COLORS.buttonPrimary,
    },
  },
  danger: {
    container: {
      backgroundColor: COLORS.error,
      borderColor: COLORS.error,
    },
    text: {
      color: COLORS.white,
    },
  },
};

// ─── Size Styles ───────────────────────────────────────────────
const sizeStyles: Record<
  ButtonSize,
  { container: ViewStyle; text: TextStyle }
> = {
  sm: {
    container: {
      paddingVertical: SPACING.xs,
      paddingHorizontal: SPACING.md,
    },
    text: { fontSize: 12 },
  },
  md: {
    container: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.lg,
    },
    text: { fontSize: 14 },
  },
  lg: {
    container: {
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.xl,
    },
    text: { fontSize: 16 },
  },
};
