import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [carregando, setCarregando] = useState(false);

  async function handleLogout() {
    try {
      setCarregando(true);
      await logout();
    } catch (e) {
      Alert.alert("Erro ao sair", e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24 }}>Home</Text>
      <Text>Logado como: {user?.email}</Text>

      <Button
        title="Ir para o Formulário"
        onPress={() => navigation.navigate("Formulario")}
        disabled={carregando}
      />

      <Button
        title={carregando ? "Saindo..." : "Sair"}
        onPress={handleLogout}
        disabled={carregando}
      />
    </View>
  );
}