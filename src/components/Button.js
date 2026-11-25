import { Text, TouchableOpacity } from "react-native";

export default function Button({
  title,
  onPress,
  disabled,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}