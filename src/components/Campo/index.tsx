import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from './styles';

export enum TipoCampo {

  email,
  senha,
  telefone,
  cpf,
  cnpj,
  cep,
  data,
  default

}

interface CampoProps {

  tipoCampo: TipoCampo;
  placeholder: string;
  valor: string;
  onAlterarValor: (novoValorCampo: string) => void;
  habilitado: boolean;
  erro: string;
  senhaVisivel?: boolean;
  onVisualizarSenha?: () => void;

}

const variaveisAmbiente = process.env;

// componente que representa um campo
const Campo = ({
  tipoCampo,
  placeholder,
  valor,
  onAlterarValor,
  habilitado,
  erro,
  senhaVisivel,
  onVisualizarSenha
}: CampoProps) => {

  const getIconeCampo = () => {

    // icone do campo de e-email
    if (tipoCampo === TipoCampo.email) {

      return <Fontisto name="email" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

    // icone do campo de senha
    if (tipoCampo === TipoCampo.senha) {

      return <FontAwesome name="chain-broken" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />
    }

  }

  // botão de visualizar senha
  const BotaoVisualizarSenha = () => {

    return <Pressable onPress={ onVisualizarSenha }>
      { !senhaVisivel ? <AntDesign name="eye" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } /> 
      : <AntDesign name="eye-invisible" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } /> }
    </Pressable>
  }

  return (
    <View style={ styles.containerCampo }>
      <View style={ styles.campoIcone }>
        { /** icone do campo */ }
        { getIconeCampo() }
        { /** campo de texto */ }
        <TextInput
          style={ styles.campo }
          value={ valor }
          editable={ habilitado }
          placeholder={ placeholder }
          onChangeText={ (novoValorCampo: string) => {
            onAlterarValor(novoValorCampo);
          } }
          keyboardType={
            tipoCampo === TipoCampo.email ? "email-address"
            : (tipoCampo === TipoCampo.senha ? "visible-password"
              : (tipoCampo === TipoCampo.telefone ? "phone-pad"
                : (tipoCampo === TipoCampo.data ? "numeric"
                  : "default"
                )
              )
            )
          }
          inputMode={ tipoCampo === TipoCampo.email ? "email"
            : (tipoCampo === TipoCampo.telefone ? "numeric"
              : "text"
            ) 
          }
          underlineColorAndroid="transparent"
          secureTextEntry={ tipoCampo === TipoCampo.senha && !senhaVisivel } />
        { tipoCampo === TipoCampo.senha && <BotaoVisualizarSenha /> }
      </View>
      { erro != "" && <Text>{ erro }</Text> }
    </View>
  );
}

export default Campo;