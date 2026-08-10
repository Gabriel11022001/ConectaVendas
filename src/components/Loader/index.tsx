import { ActivityIndicator, Image, Text, View } from "react-native";
import { styles } from "./styles";

interface LoaderProps {

  carregando: boolean;
  msg?: string;

}

// componente que representa um loader de carregamento
const Loader = (props: LoaderProps) => {

  if (!props.carregando) {

    return null;
  }

  return <View style={ styles.loader }>
    <Image
      source={ require("@/assets/images/logo_splash.png") }
      style={ {
        width: 100,
        height: 100
      } } />
    <Text style={ styles.titulo }>Conecta Vendas</Text>
    <ActivityIndicator color="#fff" size={ 60 } />
    <Text style={ styles.mensagem }>{ props.msg ? props.msg : "Carregando, aguarde..." }</Text>
  </View>
}

export default Loader;