import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface TopoHomeProps {

  nomeUsuarioLogado: string;
  onClickNotificacoes: () => void;
  quantidadeNotificacoes: number;
  onClickVoltar: () => void;

}

// componente que representa o topo da tela home
const TopoHome = ({ nomeUsuarioLogado, quantidadeNotificacoes, onClickNotificacoes, onClickVoltar }: TopoHomeProps) => {
  
  return <LinearGradient 
    style={ styles.container }
    colors={ ["#2F2F70", "#474787", "#3F3F80"] }
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }} >
    <View style={ styles.containerBotaoVoltarBotaoNotificacoes }>
      { /** botão de voltar */ }
      <TouchableOpacity onPress={ onClickVoltar }>
        <SimpleLineIcons name="arrow-left" size={ 30 } color="#fff" />
      </TouchableOpacity>
      { /** botão de notificações */ }
      <TouchableOpacity onPress={ onClickNotificacoes } style={ {
        marginEnd: 20
      } }>
        <Ionicons name="notifications-outline" size={ 40 } color="#fff" />
        { /** quantidade de notificações */ }
        <View style={ styles.containerQuantidadeNotificacoes }>
          <Text style={ styles.txtContainerQuantidadeNotificacoes }>{ quantidadeNotificacoes.toString() }</Text>
        </View>
      </TouchableOpacity>
    </View>
    { /** container com mensagem de bem vindo e nome do usuário logado */ }
    <View style={ { marginTop: 30 } }>
      <Text style={ styles.txtMenuTopo }>Bem vindo(a),</Text>
      <Text style={ styles.txtNomeUsuarioLogado }>{ nomeUsuarioLogado }</Text>
      <Text style={ styles.txtMenuTopo }>O que deseja gerenciar hoje?</Text>
    </View>
  </LinearGradient>
}

export default TopoHome;