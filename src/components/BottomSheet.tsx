import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  ViewStyle,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../theme";
import AppText from "./ui/Text";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  height?: number | "auto" | "full";
  closable?: boolean;
  scrollable?: boolean;
  showHandle?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const BottomSheet = ({
  visible,
  onClose,
  title,
  height = "auto",
  closable = true,
  scrollable = false,
  showHandle = true,
  showCloseButton = false,
  children,
  style,
  contentStyle,
}: BottomSheetProps) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const lastGestureY = useRef(0);

  // ─── Resolve sheet height ──────────────────────────────────
  const resolvedHeight =
    height === "full"
      ? SCREEN_HEIGHT * 0.92
      : height === "auto"
        ? undefined
        : height;

  // ─── Open / Close animations ───────────────────────────────
  const openSheet = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 14,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => callback?.());
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(SCREEN_HEIGHT);
      openSheet();
    } else {
      closeSheet();
    }
  }, [visible]);

  const handleClose = () => {
    if (!closable) return;
    closeSheet(onClose);
  };

  // ─── Pan Responder (drag to dismiss) ──────────────────────
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 5,
      onPanResponderGrant: () => {
        lastGestureY.current = 0;
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 100 || gesture.vy > 0.5) {
          closeSheet(onClose);
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
    }),
  ).current;

  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={handleClose}
            activeOpacity={1}
          />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            resolvedHeight ? { height: resolvedHeight } : {},
            { transform: [{ translateY }] },
            style,
          ]}
        >
          {/* Handle */}
          {showHandle && (
            <View {...(closable ? panResponder.panHandlers : {})}>
              <View style={styles.handleArea}>
                <View style={styles.handle} />
              </View>
            </View>
          )}

          {/* Header */}
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && (
                <AppText variant="h2" color={COLORS.textPrimary}>
                  {title}
                </AppText>
              )}
              {showCloseButton && closable && (
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <View style={styles.closeIconLine1} />
                  <View style={styles.closeIconLine2} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <ContentWrapper
            style={[styles.content, contentStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={scrollable ? "handled" : undefined}
          >
            {children}
          </ContentWrapper>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },

  // ─── Backdrop ──────────────────────────────────────────────
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  // ─── Sheet ─────────────────────────────────────────────────
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingBottom: SPACING.xxl,
    minHeight: 100,
  },

  // ─── Handle ────────────────────────────────────────────────
  handleArea: {
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.border,
  },

  // ─── Header ────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },

  // ─── Close Button ──────────────────────────────────────────
  closeButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIconLine1: {
    position: "absolute",
    width: 18,
    height: 2,
    backgroundColor: COLORS.textMuted,
    borderRadius: RADIUS.full,
    transform: [{ rotate: "45deg" }],
  },
  closeIconLine2: {
    position: "absolute",
    width: 18,
    height: 2,
    backgroundColor: COLORS.textMuted,
    borderRadius: RADIUS.full,
    transform: [{ rotate: "-45deg" }],
  },

  // ─── Content ───────────────────────────────────────────────
  content: {
    paddingHorizontal: SPACING.lg,
  },
});
