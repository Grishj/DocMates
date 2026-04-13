import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { COLORS, TYPOGRAPHY } from "../../theme";

type TextVariant = "h1" | "h2" | "body" | "caption" | "micro" | "nepali";

type TextWeight = "regular" | "medium" | "semibold" | "bold";

type TextAlign = "left" | "center" | "right" | "justify";

type AppTextProps = {
  children: React.ReactNode;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  align?: TextAlign;
  numberOfLines?: number;
  style?: TextStyle;
};

const AppText = ({
  children,
  variant = "body",
  weight,
  color = COLORS.textPrimary,
  align = "left",
  numberOfLines,
  style,
}: AppTextProps) => {
  return (
    <Text
      style={[
        variantStyles[variant],
        weight && weightStyles[weight],
        { color, textAlign: align },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default AppText;

// ─── Variant Styles ────────────────────────────────────────────
const variantStyles: Record<TextVariant, TextStyle> = {
  h1: { ...TYPOGRAPHY.h1 },
  h2: { ...TYPOGRAPHY.h2 },
  body: { ...TYPOGRAPHY.body },
  caption: { ...TYPOGRAPHY.caption },
  micro: { ...TYPOGRAPHY.micro },
  nepali: { ...TYPOGRAPHY.nepaliBody },
};

// ─── Weight Styles ─────────────────────────────────────────────
const weightStyles: Record<TextWeight, TextStyle> = {
  regular: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  semibold: { fontWeight: "600" },
  bold: { fontWeight: "700" },
};
