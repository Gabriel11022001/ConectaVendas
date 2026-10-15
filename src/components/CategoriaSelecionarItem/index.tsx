import { CategoriaProduto } from "@/types/categoriaProduto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

export type CategoriaSelecionar = {

  categoria: CategoriaProduto;
  selecionada: boolean;

}

interface CategoriaSelecionarItemProps {

  categoria: CategoriaSelecionar;
  onSelecionarCategoria: () => void;

}

// componente representando a categoria do produto
const CategoriaSelecionarItem = ({
  categoria,
  onSelecionarCategoria
}: CategoriaSelecionarItemProps) => {

  return <Pressable
    style={ [
      styles.item,
      categoria.selecionada && styles.itemSelecionado
    ] }
    onPress={ onSelecionarCategoria }>
      <MaterialIcons name="category" size={ 50 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA } />
      <View>
        <Text style={ styles.nomeCategoria }>{ categoria.categoria.nome ?? "" }</Text>
        <Text style={ styles.txtDescricaoCategoria }>{ categoria.categoria.descricao ?? "" }</Text>
      </View>
  </Pressable>
}

export default CategoriaSelecionarItem;