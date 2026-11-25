import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function CadastroScreen({ navigation }) {
  const { cadastrar } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro() {
    if (!email.trim() || !senha) {
      Alert.alert("Campos obrigatórios", "Informe seu e-mail e sua senha.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Senha muito curta", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);
      await cadastrar(email.trim(), senha);
    } catch (e) {
      Alert.alert("Erro", e.message);
    } finally {
      setCarregando(false);
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

      <Button
        title={carregando ? "Cadastrando..." : "Cadastrar"}
        onPress={handleCadastro}
        disabled={carregando}
      />

      <Button
        title="Já tenho conta"
        onPress={() => navigation.goBack()}
        disabled={carregando}
      />
    </View>
  );
}