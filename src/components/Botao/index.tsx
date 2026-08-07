import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, Pressable, Text } from "react-native";
import { styles } from "./styles";

interface BotaoProps {

  tipo: string;
  titulo: string;
  carregando: boolean;
  habilitado: boolean;
  onClick: () => void;
  margemTopo?: number;
  margemBaixo?: number;

}

// componente que representa o botão com um loader
const Botao = ({
  tipo,
  titulo,
  carregando,
  habilitado,
  onClick,
  margemTopo,
  margemBaixo
}: BotaoProps) => {

  // botão para redirecionar a tela de cadastro de usuário
  if (tipo === "cadastro_usuario") {

    return <Pressable
      style={ [
        styles.botaoCadastroUsuario,
        {
          marginTop: margemTopo ? margemTopo : 30,
          marginBottom: margemBaixo ? margemBaixo : 100
        }
      ] }
      onPress={ onClick }>
      <Ionicons name="person-add-outline" size={ 30 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA } />
      <Text style={ styles.tituloBotaoCadastrarUsuario }>Criar uma conta</Text>
    </Pressable>
  }

  return <Pressable
    style={ [
      styles.botao,
      !habilitado && styles.botaoDesabilitado,
      {
        marginTop: margemTopo ? margemTopo : 30,
        marginBottom: margemBaixo ? margemBaixo : 100
      }
    ] }
    disabled={ !habilitado }
    onPress={ onClick }>
      { !carregando ? <Text style={ styles.titulo }>{ titulo }</Text>
      : <ActivityIndicator color="#fff" size={ 40 } /> }
  </Pressable>
}

export { Botao };

