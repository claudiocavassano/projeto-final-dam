import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha) {
      Alert.alert("Campos obrigatórios", "Informe seu e-mail e sua senha.");
      return;
    }

    try {
      setCarregando(true);
      await login(email.trim(), senha);
    } catch (e) {
      Alert.alert("Erro", e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24 }}>Login</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
      />

      <Button
        title={carregando ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
        disabled={carregando}
      />

      <Button
        title="Criar conta"
        onPress={() => navigation.navigate("Cadastro")}
        disabled={carregando}
      />
    </View>
  );
}