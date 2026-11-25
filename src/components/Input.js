import { Text, TextInput, View } from "react-native";

export default function Input({ label, error, style, ...props }) {
  return (
    <View>
      {label ? <Text>{label}</Text> : null}

      <TextInput
        style={style}
        autoCapitalize="none"
        {...props}
      />

      {error ? <Text>{error}</Text> : null}
    </View>
  );
}