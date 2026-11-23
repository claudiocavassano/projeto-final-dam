import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function CadastroScreen({ navigation }) {
  const { cadastrar } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro() {
    try {
      await cadastrar(email.trim(), senha);
    } catch (e) {
      Alert.alert("Erro", e.message);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24 }}>Cadastro</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
      />
      <TextInput
        placeholder="Senha (mín. 6 caracteres)"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
      <Button title="Já tenho conta" onPress={() => navigation.goBack()} />
    </View>
  );
}