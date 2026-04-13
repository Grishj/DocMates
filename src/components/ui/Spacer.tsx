import React from "react";
import { View } from "react-native";
import { SPACING } from "../../theme";

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

type SpacerProps = {
  size?: SpacerSize;
  value?: number;
  horizontal?: boolean;
};

const Spacer = ({ size = "md", value, horizontal = false }: SpacerProps) => {
  const space = value ?? SPACING[size];

  return <View style={horizontal ? { width: space } : { height: space }} />;
};

export default Spacer;
