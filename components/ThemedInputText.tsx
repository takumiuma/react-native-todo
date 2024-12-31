import { TextInput, type TextInputProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextInputProps & {
  text: string;
  lightColor?: string;
  darkColor?: string;
  type?: "default";
};

export function ThemedInputText({
  style,
  lightColor,
  darkColor,
  text,
  type = "default",
  placeholder = "placeholder",
  onChangeText,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, "border");

  return (
    <TextInput
      style={[{ color, borderColor }, type === "default" ? styles.default : undefined, , style]}
      onChangeText={onChangeText}
      value={text}
      placeholder={placeholder}
      placeholderTextColor={color}
      selectionColor={color}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
