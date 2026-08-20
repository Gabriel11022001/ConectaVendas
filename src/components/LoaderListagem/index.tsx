import { ActivityIndicator, Image, Text, View } from "react-native";
import { styles } from "./styles";

interface LoaderListagemProps {

  carregando: boolean;
  texto?: string;

}

// loader da tela de listagem
const LoaderListagem = ({ carregando, texto }: LoaderListagemProps) => {

  if (!carregando) {

    return null;
  }

  return (
    <View style={ styles.loader }>
      <Image source={ require("@/assets/images/img_loader.png") } style={ styles.img } />
      <ActivityIndicator color={ process.env.EXPO_PUBLIC_COR_SECUNDARIA ?? "#000" } size={ 60 } />
      <Text style={ styles.txtLoader }>{ texto ? texto : "Carregando, aguarde..." }</Text>
    </View>
  );
}

export default LoaderListagem;