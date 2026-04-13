import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    StatusBar,
    Platform,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../../theme";
import AppText from "./Text";

type HeaderVariant = "default" | "transparent" | "colored";

type HeaderProps = {
    // title
    title?: string;
    subtitle?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    // left side
    showBackButton?: boolean;
    onBack?: () => void;
    leftIcon?: React.ReactNode;
    leftAction?: () => void;
    leftIconStyle?: ViewStyle;
    leftText?: string;
    leftTextColor?: string;
    leftTextAction?: () => void;
    leftTextStyle?: TextStyle;
    // right side
    rightIcon?: React.ReactNode;
    rightAction?: () => void;
    rightIconStyle?: ViewStyle;
    rightIcon2?: React.ReactNode;
    rightAction2?: () => void;
    rightIcon2Style?: ViewStyle;
    rightText?: string;
    rightTextColor?: string;
    rightTextAction?: () => void;
    rightTextStyle?: TextStyle;
    // center element (replaces title)
    centerElement?: React.ReactNode;
    // bottom element
    bottomElement?: React.ReactNode;
    // variant
    variant?: HeaderVariant;
    // styling
    backgroundColor?: string;
    titleColor?: string;
    iconColor?: string;
    elevated?: boolean;
    style?: ViewStyle;
};

const Header = ({
    title,
    subtitle,
    titleStyle,
    subtitleStyle,
    showBackButton = false,
    onBack,
    leftIcon,
    leftAction,
    leftIconStyle,
    leftText,
    leftTextColor,
    leftTextAction,
    leftTextStyle,
    rightIcon,
    rightAction,
    rightIconStyle,
    rightIcon2,
    rightAction2,
    rightIcon2Style,
    rightText,
    rightTextColor,
    rightTextAction,
    rightTextStyle,
    centerElement,
    bottomElement,
    variant = "default",
    backgroundColor,
    titleColor,
    iconColor,
    elevated = false,
    style,
}: HeaderProps) => {
    const resolvedBg = backgroundColor ?? variantConfig[variant].backgroundColor;
    const resolvedTitleColor = titleColor ?? variantConfig[variant].titleColor;
    const resolvedIconColor = iconColor ?? variantConfig[variant].iconColor;

    return (
        <View
            style={[
                styles.wrapper,
                { backgroundColor: resolvedBg },
                elevated && styles.elevated,
                style,
            ]}
        >
            <StatusBar
                barStyle={variant === "colored" ? "light-content" : "dark-content"}
                backgroundColor={resolvedBg}
            />

            {/* ─── Main Row ─────────────────────────────────────── */}
            <View style={styles.row}>

                {/* ─── Left ─────────────────────────────────────── */}
                <View style={styles.side}>
                    {/* Back button */}
                    {showBackButton && (
                        <TouchableOpacity
                            onPress={onBack}
                            style={[styles.iconButton, leftIconStyle]}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            activeOpacity={0.7}
                        >
                            <BackIcon color={resolvedIconColor} />
                        </TouchableOpacity>
                    )}

                    {/* Left icon */}
                    {!showBackButton && leftIcon && (
                        <TouchableOpacity
                            onPress={leftAction}
                            style={[styles.iconButton, leftIconStyle]}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            activeOpacity={0.7}
                            disabled={!leftAction}
                        >
                            {leftIcon}
                        </TouchableOpacity>
                    )}

                    {/* Left text */}
                    {!showBackButton && !leftIcon && leftText && (
                        <TouchableOpacity
                            onPress={leftTextAction}
                            disabled={!leftTextAction}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            activeOpacity={leftTextAction ? 0.7 : 1}
                        >
                            <AppText
                                variant="caption"
                                weight="semibold"
                                color={leftTextColor ?? resolvedIconColor}
                                style={leftTextStyle}
                            >
                                {leftText}
                            </AppText>
                        </TouchableOpacity>
                    )}
                </View>

                {/* ─── Center ───────────────────────────────────── */}
                <View style={styles.center}>
                    {centerElement ? (
                        centerElement
                    ) : (
                        <>
                            {title && (
                                <AppText
                                    variant="h2"
                                    color={resolvedTitleColor}
                                    align="center"
                                    numberOfLines={1}
                                    style={titleStyle}
                                >
                                    {title}
                                </AppText>
                            )}
                            {subtitle && (
                                <AppText
                                    variant="micro"
                                    color={resolvedIconColor}
                                    align="center"
                                    numberOfLines={1}
                                    style={subtitleStyle}
                                >
                                    {subtitle}
                                </AppText>
                            )}
                        </>
                    )}
                </View>

                {/* ─── Right ────────────────────────────────────── */}
                <View style={[styles.side, styles.rightSide]}>
                    {/* Right icon 2 */}
                    {rightIcon2 && (
                        <TouchableOpacity
                            onPress={rightAction2}
                            style={[styles.iconButton, rightIcon2Style]}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            activeOpacity={0.7}
                            disabled={!rightAction2}
                        >
                            {rightIcon2}
                        </TouchableOpacity>
                    )}

                    {/* Right icon */}
                    {rightIcon && (
                        <TouchableOpacity
                            onPress={rightAction}
                            style={[styles.iconButton, rightIconStyle]}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            activeOpacity={0.7}
                            disabled={!rightAction}
                        >
                            {rightIcon}
                        </TouchableOpacity>
                    )}

                    {/* Right text */}
                    {!rightIcon && !rightIcon2 && rightText && (
                        <TouchableOpacity
                            onPress={rightTextAction}
                            disabled={!rightTextAction}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            activeOpacity={rightTextAction ? 0.7 : 1}
                        >
                            <AppText
                                variant="caption"
                                weight="semibold"
                                color={rightTextColor ?? COLORS.primary}
                                style={rightTextStyle}
                            >
                                {rightText}
                            </AppText>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* ─── Bottom Element ───────────────────────────────── */}
            {bottomElement && (
                <View style={styles.bottomElement}>{bottomElement}</View>
            )}
        </View>
    );
};

export default Header;

// ─── Back Icon ─────────────────────────────────────────────────
const BackIcon = ({ color = COLORS.textPrimary }: { color?: string }) => (
    <View style={backIconStyles.wrapper}>
        <View style={[backIconStyles.lineTop, { backgroundColor: color }]} />
        <View style={[backIconStyles.lineBottom, { backgroundColor: color }]} />
        <View style={[backIconStyles.lineMiddle, { backgroundColor: color }]} />
    </View>
);

const backIconStyles = StyleSheet.create({
    wrapper: {
        width: 20,
        height: 20,
        justifyContent: "center",
    },
    lineTop: {
        position: "absolute",
        width: 10,
        height: 2,
        borderRadius: 2,
        top: 4,
        left: 0,
        transform: [{ rotate: "-45deg" }],
    },
    lineBottom: {
        position: "absolute",
        width: 10,
        height: 2,
        borderRadius: 2,
        bottom: 4,
        left: 0,
        transform: [{ rotate: "45deg" }],
    },
    lineMiddle: {
        width: 16,
        height: 2,
        borderRadius: 2,
    },
});

// ─── Variant Config ────────────────────────────────────────────
const variantConfig: Record<
    HeaderVariant,
    { backgroundColor: string; titleColor: string; iconColor: string }
> = {
    default: {
        backgroundColor: COLORS.surface,
        titleColor: COLORS.textPrimary,
        iconColor: COLORS.textSecondary,
    },
    transparent: {
        backgroundColor: "transparent",
        titleColor: COLORS.textPrimary,
        iconColor: COLORS.textPrimary,
    },
    colored: {
        backgroundColor: COLORS.primary,
        titleColor: COLORS.white,
        iconColor: COLORS.white,
    },
};

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
    wrapper: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.sm,
        zIndex: 10,
    },
    elevated: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 52,
    },
    side: {
        minWidth: 80,
        flexDirection: "row",
        alignItems: "center",
    },
    rightSide: {
        justifyContent: "flex-end",
        gap: SPACING.xs,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.full,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomElement: {
        paddingTop: SPACING.sm,
        paddingBottom: SPACING.xs,
    },
});