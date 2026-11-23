import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    try {
      await login(email.trim(), senha);
    } catch (e) {
      Alert.alert("Erro", e.message);
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
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Criar conta" onPress={() => navigation.navigate("Cadastro")} />
    </View>
  );
}   