import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

export enum TipoDialogConfirmar {

  deletar

}

interface DialogConfirmarProps {

  apresentar: boolean;
  msg: string;
  onClickFechar: () => void;
  onClickConfirmar: () => void;
  tipo: TipoDialogConfirmar;
  carregando: boolean;

}

// dialog de confirmar operação
const DialogConfirmar = ({
  apresentar,
  msg,
  onClickConfirmar,
  onClickFechar,
  tipo,
  carregando
}: DialogConfirmarProps) => {

  if (!apresentar) {

    return null;
  }

  return <View style={ styles.dialogContainer }>
    <View style={ styles.corpo }>
      { /** botão fechar */ }
      <View>
        <Pressable
          onPress={ onClickFechar }>
            
        </Pressable>
      </View>
      { /** imagem descritiva */ }
      <Image style={ styles.imgIlustracao } source={ require("@/assets/images/ilustracao_deletar.png") } />
      { /** título/mensagam */ }
      <View style={ styles.containerMensagem }>
        <Text style={ styles.titulo }>Atenção!</Text>
        <Text style={ styles.msg }>{ msg }</Text>
      </View>
      { /** botões */ }
      <View style={ styles.containerBotoes }>
        { /** cancelar */ } 
        <Pressable disabled={ carregando } style={ [ styles.botao ] } onPress={ onClickFechar }>
          <Text style={ styles.txtBotao }>Cancelar</Text>
        </Pressable>
        { /** confirmar */ }
        <Pressable disabled={ carregando } style={ [ styles.botao ] } onPress={ onClickConfirmar }>
          { carregando ? <ActivityIndicator color="#000" size={ 30 } /> : <Text style={ styles.txtBotao }>Confirmar</Text> }
        </Pressable>
      </View>
    </View>
  </View>
}

export default DialogConfirmar;