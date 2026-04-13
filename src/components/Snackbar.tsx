// components/Snackbar/Snackbar.tsx

import React, { useEffect, useRef } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SHADOWS } from "../theme/shadows";
import { TYPOGRAPHY } from "../theme/typography";

export type SnackbarVariant = "success" | "error" | "warning" | "info";
export type SnackbarPosition = "top" | "bottom";

interface SnackbarProps {
  visible: boolean;
  message: string;
  variant?: SnackbarVariant;
  position?: SnackbarPosition;
  duration?: number;
  onDismiss?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
  icon?: React.ReactNode;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SNACKBAR_MARGIN = 16;

export const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  variant = "info",
  position = "bottom",
  duration = 3000,
  onDismiss,
  action,
  icon,
}) => {
  const translateY = useRef(
    new Animated.Value(position === "bottom" ? 100 : -100),
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 15,
          stiffness: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      handleDismiss();
    }
  }, [visible]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === "bottom" ? 100 : -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  const getBackgroundColor = (): string => {
    switch (variant) {
      case "success":
        return COLORS.success;
      case "error":
        return COLORS.error;
      case "warning":
        return "#F57C00";
      case "info":
      default:
        return COLORS.navy;
    }
  };

  const getIcon = (): string => {
    if (icon) return "";

    switch (variant) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  if (!visible) return null;

  const containerStyle: ViewStyle = {
    position: "absolute",
    [position]: Platform.OS === "ios" ? SNACKBAR_MARGIN + 20 : SNACKBAR_MARGIN,
    left: SNACKBAR_MARGIN,
    right: SNACKBAR_MARGIN,
    backgroundColor: getBackgroundColor(),
    borderRadius: RADIUS.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.card,
  };

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {/* Icon */}
      {icon ? (
        <View style={styles.iconContainer}>{icon}</View>
      ) : (
        <Text style={styles.iconText}>{getIcon()}</Text>
      )}

      {/* Message */}
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>

      {/* Action Button */}
      {action && (
        <Pressable
          onPress={() => {
            action.onPress();
            handleDismiss();
          }}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={styles.actionText}>{action.label}</Text>
        </Pressable>
      )}

      {/* Dismiss Button */}
      {!action && (
        <Pressable onPress={handleDismiss} style={styles.dismissButton}>
          <Text style={styles.dismissText}>✕</Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
    color: COLORS.white,
    marginRight: 12,
  },
  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    flex: 1,
  },
  actionButton: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  actionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: "600",
  },
  dismissButton: {
    marginLeft: 12,
    padding: 4,
  },
  dismissText: {
    fontSize: 18,
    color: COLORS.white,
  },
});
