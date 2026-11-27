import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import FiltroObjetos from "../components/FiltroObjetos";
import ObjetoCard from "../components/ObjetoCard";
import { excluirObjeto, listarObjetos } from "../services/objetoService";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [carregando, setCarregando] = useState(true);
  const [saindo, setSaindo] = useState(false);
  const [objetos, setObjetos] = useState([]);
  const [filtroAtual, setFiltroAtual] = useState("todos");
  const [erroLista, setErroLista] = useState("");

  useEffect(() => {
    const cancelarEscuta = listarObjetos(
      (lista) => {
        setObjetos(lista);
        setErroLista("");
        setCarregando(false);
      },
      () => {
        setErroLista("Não foi possível carregar as publicações.");
        setCarregando(false);
      }
    );

    return cancelarEscuta;
  }, []);

  const objetosFiltrados =
    filtroAtual === "todos"
      ? objetos
      : objetos.filter((objeto) => objeto.tipo === filtroAtual);

  async function handleLogout() {
    try {
      setSaindo(true);
      await logout();
    } catch (e) {
      Alert.alert("Erro ao sair", e.message);
    } finally {
      setSaindo(false);
    }
  }

  async function handleExcluir(id) {
    try {
      await excluirObjeto(id);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível excluir a publicação.");
    }
  }

 function handleEditar(objeto) {
    navigation.navigate("Formulario", { objeto });
  }

  function renderObjeto({ item }) {
    return (
      <ObjetoCard
        objeto={item}
        user={user}
        onExcluir={handleExcluir}
        onEditar={handleEditar}
      />
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24 }}>Home</Text>
      <Text>Logado como: {user?.email}</Text>

      <FiltroObjetos
        filtroAtual={filtroAtual}
        onMudarFiltro={setFiltroAtual}
      />

      <Button
        title="Ir para o Formulário"
        onPress={() => navigation.navigate("Formulario")}
        disabled={saindo}
      />

      <Button
        title={saindo ? "Saindo..." : "Sair"}
        onPress={handleLogout}
        disabled={saindo}
      />

      {carregando ? (
        <ActivityIndicator />
      ) : erroLista ? (
        <Text>{erroLista}</Text>
      ) : objetosFiltrados.length === 0 ? (
        <Text>Nenhuma publicação encontrada.</Text>
      ) : (
        <FlatList
          data={objetosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={renderObjeto}
        />
      )}
    </View>
  );
}