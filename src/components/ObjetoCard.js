import { Alert, TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function ObjetoCard({ objeto, user, onExcluir, onEditar, style }) {
  const ehDono = objeto?.uid === user?.uid;

  function confirmarExclusao() {
    Alert.alert(
      "Excluir publicação",
      "Tem certeza de que deseja excluir esta publicação?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => onExcluir(objeto.id) },
      ]
    );
  }

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.titulo}>{objeto?.titulo}</Text>
      <Text style={styles.info}>Tipo: {objeto?.tipo}</Text>
      <Text style={styles.info}>Descrição: {objeto?.descricao}</Text>
      <Text style={styles.info}>Local: {objeto?.local}</Text>
      <Text style={styles.info}>Contato: {objeto?.contato}</Text>
      {ehDono && (
        <View style={styles.botoes}>
          <TouchableOpacity style={styles.botaoEditar} onPress={() => onEditar(objeto)}>
            <Text style={styles.botaoTexto}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoExcluir} onPress={confirmarExclusao}>
            <Text style={styles.botaoTexto}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff", borderRadius: 8, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: "#eee",
  },
  titulo: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: "#333" },
  info: { fontSize: 14, color: "#666", marginBottom: 2 },
  botoes: { flexDirection: "row", gap: 8, marginTop: 10 },
  botaoEditar: {
    flex: 1, backgroundColor: "#2563eb", padding: 10,
    borderRadius: 6, alignItems: "center",
  },
  botaoExcluir: {
    flex: 1, backgroundColor: "#dc2626", padding: 10,
    borderRadius: 6, alignItems: "center",
  },
  botaoTexto: { color: "#fff", fontWeight: "600", fontSize: 14 },
});