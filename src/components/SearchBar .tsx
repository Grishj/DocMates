import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, SHADOWS } from "../theme";
import { AppText } from "./index";

type SearchBarVariant = "default" | "filled" | "outline";

type Suggestion = {
  id: string;
  label: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

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
  // ─── Filter / Suggestions ─────────────────────────────────
  suggestions?: Suggestion[];
  onSuggestionPress?: (item: Suggestion) => void;
  maxSuggestions?: number;
  showSuggestionsOnFocus?: boolean;
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
  suggestions = [],
  onSuggestionPress,
  maxSuggestions = 5,
  showSuggestionsOnFocus = true,
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
    // Small delay so suggestion press registers before dropdown hides
    setTimeout(() => setFocused(false), 150);
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

  const handleSuggestionPress = (item: Suggestion) => {
    onSuggestionPress?.(item);
    onChangeText(item.label);
    inputRef.current?.blur();
  };

  // ─── Filter suggestions based on current value ────────────
  const filteredSuggestions =
    value.length > 0
      ? suggestions
          .filter((s) =>
            s.label.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, maxSuggestions)
      : showSuggestionsOnFocus && focused
      ? suggestions.slice(0, maxSuggestions)
      : [];

  const showDropdown = focused && filteredSuggestions.length > 0;

  return (
    <View style={styles.root}>
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
        <Ionicons
          name="search-outline"
          size={18}
          color={focused ? COLORS.primary : COLORS.textMuted}
        />

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
              <Ionicons name="close" size={14} color={COLORS.white} />
            </TouchableOpacity>
          )}
          {rightElement && (
            <View style={styles.rightElement}>{rightElement}</View>
          )}
        </View>
      </Animated.View>

      {/* ─── Suggestions Dropdown ────────────────────────────── */}
      {showDropdown && (
        <View style={styles.dropdown}>
          {filteredSuggestions.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.suggestionItem,
                index < filteredSuggestions.length - 1 &&
                  styles.suggestionBorder,
              ]}
              onPress={() => handleSuggestionPress(item)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon ?? "search-outline"}
                size={18}
                color={COLORS.textMuted}
                style={styles.suggestionIcon}
              />
              <View style={styles.suggestionText}>
                <AppText
                  variant="caption"
                  weight="medium"
                  color={COLORS.textPrimary}
                  numberOfLines={1}
                >
                  {item.label}
                </AppText>
                {item.subtitle && (
                  <AppText
                    variant="micro"
                    color={COLORS.textMuted}
                    numberOfLines={1}
                  >
                    {item.subtitle}
                  </AppText>
                )}
              </View>
              <Ionicons
                name="arrow-forward-outline"
                size={14}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
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
  root: {
    position: "relative",
    zIndex: 100,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
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
    width: 20,
    height: 20,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.textMuted,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Suggestions Dropdown ──────────────────────────────────
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xs,
    paddingVertical: SPACING.xs,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 999,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
  },
  suggestionBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  suggestionIcon: {
    marginRight: SPACING.sm,
  },
  suggestionText: {
    flex: 1,
  },

  // ─── Disabled ──────────────────────────────────────────────
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
});
