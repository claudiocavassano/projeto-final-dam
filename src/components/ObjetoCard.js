import { Alert, Button, Text, View } from "react-native";

export default function ObjetoCard({
  objeto,
  user,
  onExcluir,
  style,
}) {
  const podeExcluir = objeto?.uid === user?.uid;
  const podeChamarExclusao =
    podeExcluir &&
    typeof onExcluir === "function" &&
    objeto?.id;

  function confirmarExclusao() {
    if (!podeChamarExclusao) {
      return;
    }

    Alert.alert(
      "Excluir publicação",
      "Tem certeza de que deseja excluir esta publicação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onExcluir(objeto.id),
        },
      ]
    );
  }

  return (
    <View style={style}>
      <Text>{objeto?.titulo}</Text>
      <Text>Tipo: {objeto?.tipo}</Text>
      <Text>Local: {objeto?.local}</Text>
      <Text>Status: {objeto?.status}</Text>

      {podeChamarExclusao ? (
        <Button title="Excluir" onPress={confirmarExclusao} />
      ) : null}
    </View>
  );
}