import { CategoriaProduto } from "@/types/categoriaProduto";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface CategoriaItemProps {

  categoria: CategoriaProduto;
  onClickEditarCategoria: () => void;
  onClickDeletarCategoria: () => void;

}

// componente que representa o item da categoria
const CategoriaItem = ({ categoria, onClickEditarCategoria, onClickDeletarCategoria }: CategoriaItemProps) => {

  // obter o icone da categoria
  const getIcone = () => {
    
    return <MaterialIcons name="category" size={ 30 } color={ categoria.cor } />;
  }

  const gerarCorDeFundo = (corHex: string): string => {
    const hex = corHex.replace("#", "");

    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return "#F1F1FC";
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const fator = 0.88;

    const novoR = Math.round(r + (255 - r) * fator);
    const novoG = Math.round(g + (255 - g) * fator);
    const novoB = Math.round(b + (255 - b) * fator);

    return `#${novoR.toString(16).padStart(2, "0")}${novoG
      .toString(16)
      .padStart(2, "0")}${novoB.toString(16).padStart(2, "0")}`;
  }

  const getCorFundoIcone = (): string => {

    if (categoria.cor === "#000" || categoria.cor === "#000000") {

      return "#f1f1f1";
    }

    return gerarCorDeFundo(categoria.cor);
  }

  return <View style={ styles.item }>
    <View style={ styles.iconeDadosCategoria }>
      <View style={ [
        styles.containerIcone,
        {
          backgroundColor: getCorFundoIcone()
        }
      ] }>
        { getIcone() }
      </View>
      <View>
        <Text style={ styles.nomeCategoria }>{ categoria.nome }</Text>
        { categoria.descricao && <Text style={ styles.descricao }>{ categoria.descricao ?? "" }</Text> }
      </View>
    </View>
    <View style={ styles.operacoes }>
      { /** mostrar a cor da categoria */ }
      <View style={ [
        styles.operacao,
        styles.corCategoria,
        {
          backgroundColor: categoria.cor ? categoria.cor : process.env.EXPO_PUBLIC_COR_PRIMARIA
        }
      ] } />
      { /** botão de editar categoria */ }
      <Pressable
        style={ styles.operacao }
        onPress={ onClickEditarCategoria }>
          <Feather name="edit" size={ 24 } color="black" />
      </Pressable>
      { /** botão para deletar a categoria */ }
      <Pressable 
        style={ styles.operacao }
        onPress={ onClickDeletarCategoria }>
        <MaterialIcons name="delete-outline" size={ 27 } color="red" />
      </Pressable>
    </View>
  </View>
}

export default CategoriaItem;