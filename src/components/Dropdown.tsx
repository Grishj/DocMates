import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { COLORS, SPACING, RADIUS } from "../theme";
import AppText from "./ui/Text";

type DropdownOption = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  options: DropdownOption[];
  value?: string | number | null;
  onChange: (option: DropdownOption) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  style?: ViewStyle;
};

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  label,
  error,
  style,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  const handleSelect = (option: DropdownOption) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {/* Label */}
      {label && (
        <AppText
          variant="caption"
          color={COLORS.textSecondary}
          style={styles.label}
        >
          {label}
        </AppText>
      )}

      {/* Trigger */}
      <TouchableOpacity
        style={[
          styles.trigger,
          error ? styles.triggerError : styles.triggerDefault,
          disabled && styles.triggerDisabled,
        ]}
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={0.8}
      >
        <AppText
          variant="body"
          color={
            disabled
              ? COLORS.textMuted
              : selected
                ? COLORS.textPrimary
                : COLORS.textMuted
          }
        >
          {selected ? selected.label : placeholder}
        </AppText>

        {/* Chevron */}
        <View style={[styles.chevron, open && styles.chevronUp]} />
      </TouchableOpacity>

      {/* Error */}
      {error && (
        <AppText variant="micro" color={COLORS.error} style={styles.error}>
          {error}
        </AppText>
      )}

      {/* Modal */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.sheet}>
            <AppText
              variant="caption"
              color={COLORS.textMuted}
              style={styles.sheetLabel}
            >
              {label ?? placeholder}
            </AppText>

            <ScrollView style={{ flexGrow: 0 }}>
              {options.map((item, index) => {
                const isSelected = item.value === value;
                return (
                  <View key={String(item.value)}>
                    <TouchableOpacity
                      style={[styles.option, isSelected && styles.optionSelected]}
                      onPress={() => handleSelect(item)}
                      activeOpacity={0.7}
                    >
                      <AppText
                        variant="body"
                        color={isSelected ? COLORS.primary : COLORS.textPrimary}
                        weight={isSelected ? "semibold" : "regular"}
                      >
                        {item.label}
                      </AppText>
                      {isSelected && <View style={styles.dot} />}
                    </TouchableOpacity>
                    {index < options.length - 1 && <View style={styles.separator} />}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.xs,
  },
  label: {
    marginBottom: SPACING.xs,
  },

  // ─── Trigger ───────────────────────────────────────────────
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1.5,
    borderRadius: RADIUS.md,
  },
  triggerDefault: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  triggerError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.surface,
  },
  triggerDisabled: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },

  // ─── Chevron ───────────────────────────────────────────────
  chevron: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: COLORS.textMuted,
    transform: [{ rotate: "45deg" }],
    marginTop: -4,
  },
  chevronUp: {
    transform: [{ rotate: "-135deg" }],
    marginTop: 4,
  },

  // ─── Error ─────────────────────────────────────────────────
  error: {
    marginTop: SPACING.xs,
  },

  // ─── Modal ─────────────────────────────────────────────────
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    maxHeight: "60%",
  },
  sheetLabel: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.lg,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  optionSelected: {
    backgroundColor: COLORS.background,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
  },
});
