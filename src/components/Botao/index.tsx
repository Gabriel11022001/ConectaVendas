import { ActivityIndicator, Pressable, Text } from "react-native";
import { styles } from "./styles";

interface BotaoProps {

  tipo: string;
  titulo: string;
  carregando: boolean;
  habilitado: boolean;
  onClick: () => void;

}

// componente que representa o botão com um loader
const Botao = ({
  tipo,
  titulo,
  carregando,
  habilitado,
  onClick
}: BotaoProps) => {

  return <Pressable
    style={ [
      styles.botao,
      !habilitado && styles.botaoDesabilitado
    ] }
    disabled={ !habilitado }
    onPress={ onClick }>
      { !carregando ? <Text style={ styles.titulo }>{ titulo }</Text>
      : <ActivityIndicator color="#fff" size={ 40 } /> }
  </Pressable>
}

export { Botao };

