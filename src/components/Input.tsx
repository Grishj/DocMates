// components/Input/Input.tsx

import React, { useState, forwardRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Pressable,
} from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { TYPOGRAPHY } from "../theme/typography";

export type InputVariant = "outlined" | "filled" | "underlined";
export type InputSize = "sm" | "md" | "lg";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
  showCharacterCount?: boolean;
  maxLength?: number;
}

const INPUT_HEIGHTS = {
  sm: 40,
  md: 48,
  lg: 56,
};

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "outlined",
      size = "md",
      leftIcon,
      rightIcon,
      disabled = false,
      required = false,
      containerStyle,
      inputStyle,
      labelStyle,
      onRightIconPress,
      onLeftIconPress,
      showCharacterCount = false,
      maxLength,
      value,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const getContainerStyle = (): ViewStyle => {
      const baseStyle: ViewStyle = {
        height: INPUT_HEIGHTS[size],
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
      };

      switch (variant) {
        case "outlined":
          return {
            ...baseStyle,
            borderWidth: 1.5,
            borderColor: error
              ? COLORS.error
              : isFocused
                ? COLORS.primary
                : COLORS.border,
            borderRadius: RADIUS.md,
            backgroundColor: disabled ? COLORS.background : COLORS.white,
          };
        case "filled":
          return {
            ...baseStyle,
            backgroundColor: disabled ? COLORS.background : "#F5F5F5",
            borderRadius: RADIUS.md,
            borderBottomWidth: 2,
            borderBottomColor: error
              ? COLORS.error
              : isFocused
                ? COLORS.primary
                : COLORS.border,
          };
        case "underlined":
          return {
            ...baseStyle,
            paddingHorizontal: 0,
            borderBottomWidth: 1.5,
            borderBottomColor: error
              ? COLORS.error
              : isFocused
                ? COLORS.primary
                : COLORS.border,
            backgroundColor: "transparent",
          };
        default:
          return baseStyle;
      }
    };

    const getInputTextStyle = (): TextStyle => {
      return {
        ...TYPOGRAPHY.body,
        flex: 1,
        color: disabled ? COLORS.textMuted : COLORS.textPrimary,
        paddingHorizontal: leftIcon ? 8 : 0,
      };
    };

    const labelTextStyle: TextStyle = {
      ...TYPOGRAPHY.caption,
      color: error ? COLORS.error : COLORS.textSecondary,
      marginBottom: 8,
    };

    const helperTextStyle: TextStyle = {
      ...TYPOGRAPHY.micro,
      color: error ? COLORS.error : COLORS.textMuted,
      marginTop: 4,
    };

    const characterCountStyle: TextStyle = {
      ...TYPOGRAPHY.micro,
      color: COLORS.textMuted,
      marginTop: 4,
      textAlign: "right",
    };

    return (
      <View style={containerStyle}>
        {/* Label */}
        {label && (
          <Text style={[labelTextStyle, labelStyle]}>
            {label}
            {required && <Text style={{ color: COLORS.error }}> *</Text>}
          </Text>
        )}

        {/* Input Container */}
        <View style={getContainerStyle()}>
          {/* Left Icon */}
          {leftIcon && (
            <Pressable
              onPress={onLeftIconPress}
              disabled={!onLeftIconPress}
              style={styles.iconContainer}
            >
              {leftIcon}
            </Pressable>
          )}

          {/* Text Input */}
          <TextInput
            ref={ref}
            style={[getInputTextStyle(), inputStyle]}
            placeholderTextColor={COLORS.textMuted}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            value={value}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <Pressable
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              style={styles.iconContainer}
            >
              {rightIcon}
            </Pressable>
          )}
        </View>

        {/* Helper Text / Error / Character Count */}
        <View style={styles.bottomContainer}>
          {(error || helperText) && (
            <Text style={helperTextStyle}>{error || helperText}</Text>
          )}
          {showCharacterCount && maxLength && (
            <Text style={characterCountStyle}>
              {value?.length || 0}/{maxLength}
            </Text>
          )}
        </View>
      </View>
    );
  },
);
export default Input;
Input.displayName = "Input";

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
