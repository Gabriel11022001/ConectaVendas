import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";
import styles from "./styles";

// componente indicando dicas para tirar boas fotos
const BoasFotos = () => {

  return <View style={ styles.container }>
    <View style={ styles.containerTopo }>
      <Text style={ styles.titulo }>Dicas para boas fotos</Text>
      <AntDesign name="alert" size={ 30 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA } />
    </View>
    <View style={ styles.dica }>
      <AntDesign name="arrow-right" size={ 24 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA } />
      <Text style={ styles.dicaTexto }>Use boa iluminação</Text>
    </View>
    <View style={ styles.dica }>
      <AntDesign name="arrow-right" size={ 24 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA } />
      <Text style={ styles.dicaTexto }>Mostre o produto de diferentes ângulos</Text>
    </View>
    <View style={ styles.dica }>
      <AntDesign name="arrow-right" size={ 24 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA } />
      <Text style={ styles.dicaTexto }>Foco nítido e fundo limpo</Text>
    </View>
    <View style={ styles.dica }>
      <AntDesign name="arrow-right" size={ 24 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA } />
      <Text style={ styles.dicaTexto }>Imagem em alta resolução</Text>
    </View>
  </View>
}

export default BoasFotos;