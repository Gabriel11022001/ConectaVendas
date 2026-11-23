import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type AlertaErroProps = {

  msgAlerta: string;
  onFechar: () => void;
  onOk: () => void;

}

// alerta de erro
const AlertaErro = (props: AlertaErroProps) => {

  if (!props.msgAlerta) {

    return null;
  }

  return <View style={ styles.container }>
    <View style={ styles.corpoAlertaErro }>
      { /** botão para fechar o alerta de erro */ }
      <View style={ styles.containerBotaoFechar }>
        <TouchableOpacity
          onPress={ props.onFechar }>
            <AntDesign name="close" size={ 30 } color="black" />
        </TouchableOpacity>
      </View>
      { /** container icone alerta */ }
      <View style={ styles.containerIconeAlerta }>
        <Feather name="alert-octagon" size={ 50 } color="red" />
      </View>
      { /** título */ }
      <Text style={ styles.titulo }>Atenção!</Text>
      { /** mensagem */ }
      <Text style={ styles.msg }>{ props.msgAlerta.trim() }</Text>
      { /** botão de ok */ }
      <TouchableOpacity
        style={ styles.btnOk }
        onPress={ props.onOk }>
        <Text style={ styles.txtBtnOk }>OK</Text>
      </TouchableOpacity>
    </View>
  </View>
}

export default AlertaErro;