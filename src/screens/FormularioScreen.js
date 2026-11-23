import { Button, Text, View } from "react-native";

export default function FormularioScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24 }}>Formulário</Text>
      <Text>Tela provisória. Carlo siviri. </Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}