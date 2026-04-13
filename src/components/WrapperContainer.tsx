import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type WrapperContainerProps = {
  children: React.ReactNode;
  scroll?: boolean;
  keyboardAvoiding?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  backgroundColor?: string;
  disablePadding?: boolean;
};

const WrapperContainer = ({
  children,
  scroll = false,
  keyboardAvoiding = false,
  style,
  contentStyle,
  backgroundColor = "#fff",
  disablePadding = false,
}: WrapperContainerProps) => {
  const paddingStyle: ViewStyle | undefined = disablePadding
    ? undefined
    : styles.padding;

  // Styles that apply to the scrollable/view container itself
  const containerStyle = [
    styles.container,
    { backgroundColor },
    paddingStyle,
    style,
  ];

  const content = scroll ? (
    <ScrollView
      style={[styles.container, { backgroundColor }, style]}
      contentContainerStyle={[styles.scrollContent, paddingStyle, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={containerStyle}>{children}</View>
  );

  if (keyboardAvoiding) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {content}
    </SafeAreaView>
  );
};

export default WrapperContainer;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
