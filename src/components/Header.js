import { Text, View } from "react-native";

export default function Header({ title, subtitle, style, titleStyle, subtitleStyle }) {
  return (
    <View style={style}>
      {title ? <Text style={titleStyle}>{title}</Text> : null}
      {subtitle ? <Text style={subtitleStyle}>{subtitle}</Text> : null}
    </View>
  );
}