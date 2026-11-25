import { Button, View } from "react-native";

export default function FiltroObjetos({
  filtroAtual,
  onMudarFiltro,
  style,
}) {
  return (
    <View style={style}>
      <Button
        title="Todos"
        onPress={() => onMudarFiltro("todos")}
      />

      <Button
        title="Perdidos"
        onPress={() => onMudarFiltro("perdido")}
      />

      <Button
        title="Encontrados"
        onPress={() => onMudarFiltro("encontrado")}
      />
    </View>
  );
}