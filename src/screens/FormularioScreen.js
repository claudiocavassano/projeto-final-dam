import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { criarObjeto, editarObjeto } from "../services/objetoService";

export default function FormularioScreen({ navigation, route }) {
  const { user } = useAuth();
  const objetoEditando = route?.params?.objeto || null;

  const [titulo, setTitulo] = useState(objetoEditando?.titulo || "");
  const [descricao, setDescricao] = useState(objetoEditando?.descricao || "");
  const [tipo, setTipo] = useState(objetoEditando?.tipo || "perdido");
  const [categoria, setCategoria] = useState(objetoEditando?.categoria || "");
  const [local, setLocal] = useState(objetoEditando?.local || "");
  const [contato, setContato] = useState(objetoEditando?.contato || "");
  const [carregando, setCarregando] = useState(false);

  async function salvar() {
    if (!titulo.trim() || !descricao.trim() || !local.trim() || !contato.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha título, descrição, local e contato.");
      return;
    }

    setCarregando(true);
    try {
      const dados = { titulo, descricao, tipo, categoria, local, contato, uid: user.uid };

      if (objetoEditando) {
        await editarObjeto(objetoEditando.id, dados);
        Alert.alert("Sucesso", "Publicação atualizada!");
      } else {
        await criarObjeto(dados);
        Alert.alert("Sucesso", "Objeto publicado!");
      }

      navigation.goBack();
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar. Tente novamente.");
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        {objetoEditando ? "Editar publicação" : "Nova publicação"}
      </Text>

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[styles.tipoBotao, tipo === "perdido" && styles.tipoSelecionado]}
          onPress={() => setTipo("perdido")}
        >
          <Text style={[styles.tipoTexto, tipo === "perdido" && styles.tipoTextoSelecionado]}>
            Perdido
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tipoBotao, tipo === "encontrado" && styles.tipoSelecionado]}
          onPress={() => setTipo("encontrado")}
        >
          <Text style={[styles.tipoTexto, tipo === "encontrado" && styles.tipoTextoSelecionado]}>
            Encontrado
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Título *</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Ex: Carteira preta" />

      <Text style={styles.label}>Descrição *</Text>
      <TextInput
        style={[styles.input, styles.inputMultilinha]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descreva o objeto..."
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder="Ex: Documento, Eletrônico..." />

      <Text style={styles.label}>Local *</Text>
      <TextInput style={styles.input} value={local} onChangeText={setLocal} placeholder="Ex: Biblioteca, Refeitório..." />

      <Text style={styles.label}>Contato *</Text>
      <TextInput style={styles.input} value={contato} onChangeText={setContato} placeholder="Ex: (81) 99999-9999" keyboardType="phone-pad" />

      <TouchableOpacity style={styles.botao} onPress={salvar} disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>
            {objetoEditando ? "Salvar alterações" : "Publicar"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 24, color: "#333" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#555" },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 8,
    padding: 12, marginBottom: 16, fontSize: 15, backgroundColor: "#fff",
  },
  inputMultilinha: { height: 100, textAlignVertical: "top" },
  tipoContainer: { flexDirection: "row", gap: 12, marginBottom: 16 },
  tipoBotao: {
    flex: 1, padding: 12, borderRadius: 8,
    borderWidth: 1, borderColor: "#ddd", alignItems: "center", backgroundColor: "#fff",
  },
  tipoSelecionado: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  tipoTexto: { fontSize: 15, color: "#555", fontWeight: "600" },
  tipoTextoSelecionado: { color: "#fff" },
  botao: {
    backgroundColor: "#2563eb", padding: 16,
    borderRadius: 8, alignItems: "center", marginTop: 8,
  },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  botaoCancelar: { padding: 16, alignItems: "center", marginTop: 8 },
  botaoCancelarTexto: { color: "#888", fontSize: 15 },
});