import { Text, View } from "react-native";
import { styles } from "./styles";

interface TopoTelaTituloProps {

  titulo: string;
  subtitulo: string;
  icone: any;

}

const TopoTelaTitulo = ({ titulo, subtitulo, icone }: TopoTelaTituloProps) => {

  return <View style={ styles.container }>
    { /** ícone */ }
    <View>
      { icone }
    </View>
    { /** título/subtitulo */ }
    <View style={ styles.containerTituloSubtitulo }>
      <Text style={ styles.titulo }>{ titulo }</Text>
      <Text style={ styles.subtitulo }>{ subtitulo }</Text>
    </View>
  </View>
}

export default TopoTelaTitulo;