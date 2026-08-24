import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface CampoCorProps {

  valor: string;
  onDigitarCor: (corDigitada: string) => void;
  habilitado: boolean;
  erro: string;

}

// campo para o usuário informar a cors
const CampoCor = ({
  valor,
  erro,
  habilitado,
  onDigitarCor
}: CampoCorProps) => {

  return <View style={ styles.containerCampo }>
    <View>
      <Text style={ styles.txtSelecioneCor }>Informe uma cor em hexadecimal!</Text>
    </View>
    <View style={ {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      marginBottom: 6
    } }>
      { /** container para apresentar a cor */ }
      <View style={ [
        styles.corApresentar,
        {
          backgroundColor: valor != "" ? valor : (process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000")
        }
      ] } />
      { /** campo para digitar a cor */ }
      <TextInput
        style={ styles.campo }
        value={ valor }
        onChangeText={ onDigitarCor }
        editable={ habilitado }
        inputMode="text"
        keyboardType="default" />
    </View>
    { /** mensagem de erro */ }
    { erro != "" && <Text style={ styles.erro }>{ erro }</Text> }
  </View>
}

export default CampoCor;