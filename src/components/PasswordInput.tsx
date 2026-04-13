// components/Input/PasswordInput.tsx

import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import Input from "./Input";
import { COLORS } from "../theme/colors";

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  showPasswordStrength?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  showPasswordStrength = false,
  value,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getPasswordStrength = (
    password: string,
  ): { strength: string; color: string } => {
    if (!password) return { strength: "", color: COLORS.textMuted };

    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    ].filter(Boolean).length;

    if (length < 6) return { strength: "Weak", color: COLORS.error };
    if (length >= 6 && score >= 2)
      return { strength: "Medium", color: "#F57C00" };
    if (length >= 8 && score >= 3)
      return { strength: "Strong", color: COLORS.success };

    return { strength: "Weak", color: COLORS.error };
  };

  const passwordStrength = getPasswordStrength(value || "");

  const EyeIcon = () => (
    <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
      <Text style={{ fontSize: 20 }}>{isPasswordVisible ? "👁️" : "👁️‍🗨️"}</Text>
    </Pressable>
  );

  return (
    <Input
      {...props}
      value={value}
      secureTextEntry={!isPasswordVisible}
      rightIcon={<EyeIcon />}
      onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
      helperText={
        showPasswordStrength && value
          ? `Password strength: ${passwordStrength.strength}`
          : props.helperText
      }
    />
  );
};
export default PasswordInput;
