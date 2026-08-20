import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput, View } from "react-native";
import { styles } from "./styles";

interface FiltroTextoProps {

  placeholder: string;
  texto: string;
  onFiltrar: (texto: string) => void;
  limite?: number;

}

// filtro de texto
const FiltroTexto = ({
  placeholder,
  texto,
  onFiltrar,
  limite
}: FiltroTextoProps) => {

  return <View style={ styles.containerFiltro }>
    <View style={ styles.containerIconeFiltro }>
      <MaterialCommunityIcons name="filter-outline" size={ 24 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000" } />
    </View>
    <TextInput
      style={ styles.campoFiltro }
      value={ texto }
      placeholder={ placeholder }
      maxLength={ limite ? limite : undefined }
      onChangeText={ (textoFiltroDigitado: string) => {
        onFiltrar(textoFiltroDigitado);
      } }
      underlineColorAndroid="transparent" />
  </View>
}

export default FiltroTexto;