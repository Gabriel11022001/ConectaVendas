import { Text, View } from "react-native";
import { styles } from "./styles";

interface TituloTelaProps {

  titulo: string;
  subtitulo: string;

}

// componente que representa o título da tela
const TituloTela = ({ titulo, subtitulo }: TituloTelaProps) => {

  return <View style={ styles.containerTitulo }>
    <Text style={ styles.titulo }>{ titulo }</Text>
    <Text style={ styles.subtitulo }>{ subtitulo }</Text>
  </View>
}

export default TituloTela;