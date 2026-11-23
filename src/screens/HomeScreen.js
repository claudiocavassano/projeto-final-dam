import { Button, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24 }}>Home</Text>
      <Text>Logado como: {user?.email}</Text>
      <Button title="Ir para o Formulário" onPress={() => navigation.navigate("Formulario")} />
      <Button title="Sair" onPress={logout} />
    </View>
  );
}