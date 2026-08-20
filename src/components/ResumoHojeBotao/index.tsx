import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

type ResumoHojeBotaoProps = {

  onRedirecionar: () => void;

}

/**
 * componente que representa um botão
 * que ao ser clicado redirecionar o usuário para a tela
 * de resumo do dia
 */ 
const ResumoHojeBotao = ({ onRedirecionar }: ResumoHojeBotaoProps) => <Pressable style={ styles.container } onPress={ onRedirecionar }>
  <View style={ styles.containerConteudo }>
    <View style={ styles.icone }>
      <MaterialIcons name="insights" size={ 30 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "" } />
    </View>
    <View style={ {
      marginEnd: 10
    } }>
      <Text style={ styles.titulo }>Resumo de hoje</Text>
      <Text style={ styles.subtitulo }>Acompanhe seus principais indicadores e resultados do dia.</Text>
    </View>
  </View>
  <View style={ [
    styles.containerConteudo,
    {
      justifyContent: "flex-end"
    }
  ] }>
    <Text style={ styles.txtVerResumo }>Ver resumo</Text>
    <AntDesign name="arrow-right" size={ 20 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "" } />
  </View>
</Pressable>

export default ResumoHojeBotao;