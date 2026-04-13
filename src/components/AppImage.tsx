import React from "react";
import {
  Image,
  View,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  ActivityIndicator,
} from "react-native";
import { COLORS, RADIUS } from "../theme";

type ImageVariant = "default" | "rounded" | "circle" | "cover";

type AppImageProps = {
  source: string | number;
  width?: number | string;
  height?: number | string;
  variant?: ImageVariant;
  fallbackColor?: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
};

const AppImage = ({
  source,
  width = "100%",
  height = 200,
  variant = "default",
  fallbackColor = COLORS.border,
  style,
  containerStyle,
}: AppImageProps) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const imageSource = typeof source === "string" ? { uri: source } : source;

  return (
    <View
      style={[
        styles.container,
        { width: width as any, height: height as any },
        variantStyles[variant],
        containerStyle,
      ]}
    >
      {!error ? (
        <>
          <Image
            source={imageSource}
            style={[styles.image, variantStyles[variant], style]}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
            resizeMode="cover"
          />
          {loading && (
            <View
              style={[styles.placeholder, { backgroundColor: fallbackColor }]}
            >
              <ActivityIndicator color={COLORS.primary} size="small" />
            </View>
          )}
        </>
      ) : (
        <View
          style={[styles.placeholder, { backgroundColor: fallbackColor }]}
        />
      )}
    </View>
  );
};

export default AppImage;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

const variantStyles: Record<ImageVariant, ViewStyle> = {
  default: { borderRadius: 0 },
  rounded: { borderRadius: RADIUS.md },
  circle: { borderRadius: RADIUS.full },
  cover: { borderRadius: 0 },
};
