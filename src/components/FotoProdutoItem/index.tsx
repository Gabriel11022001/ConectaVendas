import { FotoProduto } from "@/types/produto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, Pressable, View } from "react-native";
import { styles } from "./styles";

interface FotoProdutoItemProps {

  foto: FotoProduto;
  onRemover: () => void;

}

// componente que representa a foto do produto
const FotoProdutoItem = ({
  foto,
  onRemover
}: FotoProdutoItemProps) => {

  return <View style={ styles.container }>
    { /** foto do produto */ }
    <Image
      style={ styles.foto }
      source={ {
        uri: `data:${ foto.ext };base64,${ foto.base64 }`,
    } } />
    <View style={ styles.containerBotaoOperacoes }>
      { /** botão para remover a foto do produto */ }
      <Pressable onPress={ onRemover }>
        <MaterialIcons name="delete-outline" size={ 50 } color="red" />
      </Pressable>
    </View>
  </View>
}

export { FotoProdutoItem };

