import { Text, View } from "react-native";
import styles from "./styles";

type ContadorFotosAdicionadasProps = {

  quantidade: number;

}

// contador de fotos adicionadas
const ContadorFotosAdicionadas = ({ quantidade }: ContadorFotosAdicionadasProps) => {

  return <View style={ styles.container }>
    <Text style={ styles.texto }>Fotos adicionadas</Text>
    <Text style={ { marginStart: 5 } }>( { quantidade } )</Text>
  </View>
}

export { ContadorFotosAdicionadas };

