import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { COLORS, SPACING, RADIUS } from "../../theme";

type BoxProps = {
  children?: React.ReactNode;
  // spacing
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  // layout
  flex?: number;
  width?: number | string;
  height?: number | string;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  // styling
  bg?: string;
  radius?: number;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  shadow?: boolean;
  style?: ViewStyle;
};

const Box = ({
  children,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  flex,
  width,
  height,
  align,
  justify,
  bg,
  radius,
  border = false,
  borderColor = COLORS.border,
  borderWidth = 1,
  shadow = false,
  style,
}: BoxProps) => {
  const boxStyle: ViewStyle = {
    ...(p !== undefined && { padding: p }),
    ...(px !== undefined && { paddingHorizontal: px }),
    ...(py !== undefined && { paddingVertical: py }),
    ...(pt !== undefined && { paddingTop: pt }),
    ...(pb !== undefined && { paddingBottom: pb }),
    ...(pl !== undefined && { paddingLeft: pl }),
    ...(pr !== undefined && { paddingRight: pr }),
    ...(m !== undefined && { margin: m }),
    ...(mx !== undefined && { marginHorizontal: mx }),
    ...(my !== undefined && { marginVertical: my }),
    ...(mt !== undefined && { marginTop: mt }),
    ...(mb !== undefined && { marginBottom: mb }),
    ...(ml !== undefined && { marginLeft: ml }),
    ...(mr !== undefined && { marginRight: mr }),
    ...(flex !== undefined && { flex }),
    ...(width !== undefined && { width: width as any }),
    ...(height !== undefined && { height: height as any }),
    ...(align && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
    ...(bg && { backgroundColor: bg }),
    ...(radius !== undefined && { borderRadius: radius }),
    ...(border && { borderWidth, borderColor }),
  };

  return (
    <View style={[boxStyle, shadow && styles.shadow, style]}>{children}</View>
  );
};

export default Box;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
});
