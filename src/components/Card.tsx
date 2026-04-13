// components/cards/Card.tsx

import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SHADOWS } from "../theme/shadows";

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "flat";
  padding?: number;
  margin?: number;
  style?: ViewStyle;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "elevated",
  padding = 16,
  margin = 0,
  style,
  onPress,
  ...props
}) => {
  const cardStyles = [
    styles.base,
    variant === "elevated" && styles.elevated,
    variant === "outlined" && styles.outlined,
    variant === "flat" && styles.flat,
    { padding, margin },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};
export default Card;
const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
  },
  elevated: {
    ...SHADOWS.card,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  flat: {
    backgroundColor: COLORS.background,
  },
});
