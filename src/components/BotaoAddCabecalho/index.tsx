import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import styles from "./styles";

interface BotaoAddCabecalhoProps {

  onClick: () => void;

}

// botão de adicionar que vai aparecer no cabeçalho da tela
const BotaoAddCabecalho = ({ onClick }: BotaoAddCabecalhoProps) => {

  return <Pressable onPress={ onClick } style={ styles.botao }>
    <Ionicons name="add-outline" size={ 40 } color="#fff" />
  </Pressable>
}

export default BotaoAddCabecalho;