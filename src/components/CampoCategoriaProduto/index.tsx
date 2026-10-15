import { CategoriaProduto } from "@/types/categoriaProduto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface CampoCategoriaProduto {

  categoriaSelecionada: CategoriaProduto | null;
  onSelecionarCategoria: () => void;

} 

// campo para selecionar a categoria do produto
const CampoCategoriaProduto = ({ categoriaSelecionada, onSelecionarCategoria }: CampoCategoriaProduto) => {

  return <Pressable
    onPress={ onSelecionarCategoria }
    style={ styles.containerCampo }>
      { /** ícone de categoria */ }
      <MaterialIcons name="category" size={ 30 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA } />
      { /** container apresentando os dados da categoria ou o texto informando para selecionar */ }
      <View style={ styles.containerDadosCategoria }>
        { categoriaSelecionada ? <View>
          <Text style={ styles.nomeCategoria }>{ categoriaSelecionada.nome ?? "" }</Text>
          <Text style={ styles.txtDescricaoCategoria }>{ categoriaSelecionada.descricao ?? "" }</Text>
        </View> : <View>
          <Text>Selecione a categoria para o produto...</Text>
        </View> }
      </View>
      <MaterialIcons name="arrow-forward-ios" size={ 30 } color="#000" />
  </Pressable>
}

export default CampoCategoriaProduto;