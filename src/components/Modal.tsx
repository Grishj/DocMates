// components/Modal/Modal.tsx

import React, { useEffect, useRef } from "react";
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  ViewStyle,
  TextStyle,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SHADOWS } from "../theme/shadows";
import { TYPOGRAPHY } from "../theme/typography";

export type ModalSize = "sm" | "md" | "lg" | "full";
export type ModalPosition = "center" | "bottom" | "top";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  footer?: React.ReactNode;
  headerRight?: React.ReactNode;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  animationType?: "fade" | "slide" | "none";
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const MODAL_WIDTHS = {
  sm: SCREEN_WIDTH * 0.8,
  md: SCREEN_WIDTH * 0.9,
  lg: SCREEN_WIDTH * 0.95,
  full: SCREEN_WIDTH,
};

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  size = "md",
  position = "center",
  showCloseButton = true,
  closeOnBackdropPress = true,
  footer,
  headerRight,
  containerStyle,
  contentStyle,
  animationType = "slide",
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          stiffness: 90,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getModalStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: COLORS.white,
      borderRadius: position === "bottom" ? 0 : RADIUS.lg,
      width: MODAL_WIDTHS[size],
      maxHeight: SCREEN_HEIGHT * 0.9,
      ...SHADOWS.card,
    };

    switch (position) {
      case "bottom":
        return {
          ...baseStyle,
          borderTopLeftRadius: RADIUS.lg,
          borderTopRightRadius: RADIUS.lg,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          width: SCREEN_WIDTH,
        };
      case "top":
        return {
          ...baseStyle,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          width: SCREEN_WIDTH,
        };
      case "center":
      default:
        return baseStyle;
    }
  };

  const getContainerAlignment = (): ViewStyle => {
    switch (position) {
      case "bottom":
        return { justifyContent: "flex-end" };
      case "top":
        return { justifyContent: "flex-start" };
      case "center":
      default:
        return { justifyContent: "center", alignItems: "center" };
    }
  };

  const animatedStyle: ViewStyle = {
    opacity: fadeAnim,
    transform: [
      {
        translateY: animationType === "slide" ? slideAnim : 0,
      },
    ],
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <Pressable
          style={[styles.backdrop, getContainerAlignment()]}
          onPress={closeOnBackdropPress ? onClose : undefined}
        >
          <Animated.View
            style={[animatedStyle]}
            onStartShouldSetResponder={() => true}
          >
            <Pressable
              style={[getModalStyle(), containerStyle]}
              onPress={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton || headerRight) && (
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    {title && <Text style={styles.title}>{title}</Text>}
                  </View>
                  <View style={styles.headerRight}>
                    {headerRight}
                    {showCloseButton && (
                      <Pressable onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>✕</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              )}

              {/* Content */}
              <ScrollView
                style={[styles.content, contentStyle]}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {children}
              </ScrollView>

              {/* Footer */}
              {footer && <View style={styles.footer}>{footer}</View>}
            </Pressable>
          </Animated.View>
        </Pressable>
      </KeyboardAvoidingView>
    </RNModal>
  );
};
export default Modal;
const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
  },
  closeText: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  content: {
    padding: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
