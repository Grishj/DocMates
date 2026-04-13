import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from "react-native";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../theme";
import { AppText } from "./index";

type SearchBarVariant = "default" | "filled" | "outline";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  variant?: SearchBarVariant;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  loading?: boolean;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
  inputStyle?: TextStyle;
};

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search...",
  variant = "default",
  onFocus,
  onBlur,
  onSubmit,
  onClear,
  disabled = false,
  autoFocus = false,
  rightElement,
  style,
  inputStyle,
}: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
    Animated.spring(scaleAnim, {
      toValue: 1.01,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const handleClear = () => {
    onChangeText("");
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        variantStyles[variant].container,
        focused && variantStyles[variant].focused,
        disabled && styles.disabled,
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      {/* Search Icon */}
      <View style={styles.searchIcon}>
        <View style={styles.searchCircle} />
        <View style={styles.searchHandle} />
      </View>

      {/* Input */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={onSubmit}
        editable={!disabled}
        autoFocus={autoFocus}
        returnKeyType="search"
        style={[
          styles.input,
          variantStyles[variant].input,
          disabled && styles.disabledText,
          inputStyle,
        ]}
      />

      {/* Right side */}
      <View style={styles.rightSlot}>
        {value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.clearLine1} />
            <View style={styles.clearLine2} />
          </TouchableOpacity>
        )}
        {rightElement && (
          <View style={styles.rightElement}>{rightElement}</View>
        )}
      </View>
    </Animated.View>
  );
};

export default SearchBar;

// ─── Variant Styles ────────────────────────────────────────────
const variantStyles: Record<
  SearchBarVariant,
  { container: ViewStyle; focused: ViewStyle; input: TextStyle }
> = {
  default: {
    container: {
      backgroundColor: COLORS.background,
      borderWidth: 1.5,
      borderColor: "transparent",
      borderRadius: RADIUS.full,
    },
    focused: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.surface,
    },
    input: {
      color: COLORS.textPrimary,
    },
  },
  filled: {
    container: {
      backgroundColor: COLORS.background,
      borderWidth: 1.5,
      borderColor: "transparent",
      borderRadius: RADIUS.md,
    },
    focused: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.surface,
    },
    input: {
      color: COLORS.textPrimary,
    },
  },
  outline: {
    container: {
      backgroundColor: COLORS.surface,
      borderWidth: 1.5,
      borderColor: COLORS.border,
      borderRadius: RADIUS.full,
    },
    focused: {
      borderColor: COLORS.primary,
    },
    input: {
      color: COLORS.textPrimary,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },

  // ─── Search Icon ───────────────────────────────────────────
  searchIcon: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  searchCircle: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
    position: "absolute",
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 5,
    height: 2,
    backgroundColor: COLORS.textMuted,
    borderRadius: RADIUS.full,
    position: "absolute",
    bottom: 1,
    right: 0,
    transform: [{ rotate: "45deg" }],
  },

  // ─── Input ─────────────────────────────────────────────────
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    letterSpacing: 0,
    paddingVertical: 0,
    color: COLORS.textPrimary,
  },

  // ─── Right Slot ────────────────────────────────────────────
  rightSlot: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  rightElement: {
    marginLeft: SPACING.xs,
  },

  // ─── Clear Button ──────────────────────────────────────────
  clearButton: {
    width: 18,
    height: 18,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.textMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  clearLine1: {
    position: "absolute",
    width: 9,
    height: 1.5,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    transform: [{ rotate: "45deg" }],
  },
  clearLine2: {
    position: "absolute",
    width: 9,
    height: 1.5,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    transform: [{ rotate: "-45deg" }],
  },

  // ─── Disabled ──────────────────────────────────────────────
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
});
