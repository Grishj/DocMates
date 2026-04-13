import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../theme";
import AppText from "./ui/Text";

type FABSize = "sm" | "md" | "lg";

type FABAction = {
  label: string;
  onPress: () => void;
  color?: string;
  labelColor?: string;
  icon?: React.ReactNode;
  // ✅ per-action style overrides
  buttonStyle?: ViewStyle;
  labelWrapperStyle?: ViewStyle;
};

type FABProps = {
  onPress?: () => void;
  size?: FABSize;
  color?: string;
  iconColor?: string;
  icon?: React.ReactNode;
  actions?: FABAction[];
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  label?: string;
  disabled?: boolean;
  // ✅ style overrides for main FAB
  style?: ViewStyle;
  fabStyle?: ViewStyle;
  actionsContainerStyle?: ViewStyle;
};

const FAB_SIZES: Record<FABSize, number> = {
  sm: 44,
  md: 56,
  lg: 68,
};

const FAB = ({
  onPress,
  size = "md",
  color = COLORS.primary,
  iconColor = COLORS.white,
  icon,
  actions,
  position = "bottom-right",
  label,
  disabled = false,
  style,
  fabStyle,
  actionsContainerStyle,
}: FABProps) => {
  const [open, setOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const actionAnims = useRef(
    (actions ?? []).map(() => ({
      scale: new Animated.Value(0),
      translateY: new Animated.Value(20),
      opacity: new Animated.Value(0),
    })),
  ).current;

  const hasActions = actions && actions.length > 0;

  const openDial = () => {
    setOpen(true);
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      ...actionAnims.map((anim, i) =>
        Animated.parallel([
          Animated.spring(anim.scale, {
            toValue: 1,
            useNativeDriver: true,
            delay: i * 40,
            bounciness: 6,
          }),
          Animated.timing(anim.translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            delay: i * 40,
          }),
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            delay: i * 40,
          }),
        ]),
      ),
    ]).start();
  };

  const closeDial = () => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      ...actionAnims.map((anim) =>
        Animated.parallel([
          Animated.timing(anim.scale, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start(() => setOpen(false));
  };

  const handlePress = () => {
    if (hasActions) {
      open ? closeDial() : openDial();
    } else {
      onPress?.();
    }
  };

  const handleActionPress = (action: FABAction) => {
    closeDial();
    action.onPress();
  };

  const fabSize = FAB_SIZES[size];

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View
      style={[styles.wrapper, positionStyles[position], style]}
      pointerEvents="box-none"
    >
      {/* Backdrop */}
      {hasActions && (
        <Animated.View
          style={[styles.backdrop, { opacity: backdropAnim }]}
          pointerEvents={open ? "box-none" : "none"}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={closeDial}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {/* Speed Dial Actions */}
      {hasActions && (
        <View
          style={[styles.actionsContainer, actionsContainerStyle]}
          pointerEvents="box-none"
        >
          {[...(actions ?? [])].reverse().map((action, i) => {
            const animIndex = actionAnims.length - 1 - i;
            const anim = actionAnims[animIndex];
            return (
              <Animated.View
                key={i}
                style={[
                  styles.actionRow,
                  {
                    opacity: anim.opacity,
                    transform: [
                      { scale: anim.scale },
                      { translateY: anim.translateY },
                    ],
                  },
                ]}
              >
                {/* Action Label */}
                <View
                  style={[styles.actionLabelWrapper, action.labelWrapperStyle]}
                >
                  <AppText
                    variant="caption"
                    color={action.labelColor ?? COLORS.textPrimary}
                    style={styles.actionLabel}
                  >
                    {action.label}
                  </AppText>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: action.color ?? COLORS.navy },
                    action.buttonStyle,
                  ]}
                  onPress={() => handleActionPress(action)}
                  activeOpacity={0.85}
                >
                  {/* ✅ Custom icon or fallback plus */}
                  {action.icon ? (
                    <View style={styles.miniPlus}>{action.icon}</View>
                  ) : (
                    <View style={styles.miniPlus}>
                      <View
                        style={[
                          styles.plusLine,
                          { backgroundColor: COLORS.white },
                        ]}
                      />
                      <View
                        style={[
                          styles.plusLineV,
                          { backgroundColor: COLORS.white },
                        ]}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      )}

      {/* Main FAB */}
      <View style={styles.fabRow}>
        {label && !hasActions && (
          <View style={styles.fabLabelWrapper}>
            <AppText
              variant="caption"
              color={COLORS.textPrimary}
              style={styles.fabLabel}
            >
              {label}
            </AppText>
          </View>
        )}

        <TouchableOpacity
          onPress={handlePress}
          disabled={disabled}
          activeOpacity={0.85}
          style={[
            styles.fab,
            {
              width: fabSize,
              height: fabSize,
              borderRadius: fabSize / 2,
              backgroundColor: disabled ? COLORS.buttonDisabled : color,
            },
            styles.shadow,
            fabStyle, // ✅ main FAB style override
          ]}
        >
          <Animated.View
            style={[
              styles.plusIcon,
              hasActions && { transform: [{ rotate: rotation }] },
            ]}
          >
            {icon ? (
              icon
            ) : (
              <>
                <View
                  style={[styles.plusLine, { backgroundColor: iconColor }]}
                />
                <View
                  style={[styles.plusLineV, { backgroundColor: iconColor }]}
                />
              </>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FAB;

const positionStyles: Record<string, ViewStyle> = {
  "bottom-right": {
    position: "absolute",
    bottom: SPACING.xl,
    right: SPACING.lg,
    alignItems: "flex-end",
  },
  "bottom-left": {
    position: "absolute",
    bottom: SPACING.xl,
    left: SPACING.lg,
    alignItems: "flex-start",
  },
  "bottom-center": {
    position: "absolute",
    bottom: SPACING.xl,
    alignSelf: "center",
    alignItems: "center",
  },
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
  },
  backdrop: {
    position: "absolute",
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 998,
  },
  actionsContainer: {
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
    alignItems: "flex-end",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  actionLabelWrapper: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionLabel: {
    letterSpacing: 0,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  miniPlus: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  fabRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  fabLabelWrapper: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  fabLabel: {
    letterSpacing: 0,
  },
  fab: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  plusIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  plusLine: {
    position: "absolute",
    width: 18,
    height: 2.5,
    borderRadius: RADIUS.full,
  },
  plusLineV: {
    position: "absolute",
    width: 2.5,
    height: 18,
    borderRadius: RADIUS.full,
  },
});
