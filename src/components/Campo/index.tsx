import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from './styles';

export enum TipoCampo {

  email,
  senha,
  telefone,
  telefoneFixo,
  cpf,
  cnpj,
  cep,
  data,
  default,
  identificacao,
  nomeCategoria,
  descricaoCategoria,
  descricao,
  valorMonetario,
  estoque,
  nomePessoa,
  razaoSocial,
  rg,
  dataNascimento,
  dataFundacao,
  nomeFantasia,
  logradouro,
  bairro,
  numero,
  complemento

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
  tamanhoMaximo?: number;

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
  onVisualizarSenha,
  tamanhoMaximo
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

    // icone do campo de nome
    if (tipoCampo === TipoCampo.identificacao || tipoCampo === TipoCampo.cpf
      || tipoCampo === TipoCampo.nomePessoa
      || tipoCampo === TipoCampo.rg
    ) {

      return <Octicons name="person" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

    // icone do campo de telefone
    if (tipoCampo === TipoCampo.telefone || tipoCampo === TipoCampo.telefoneFixo) {

      return <Feather name="phone" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

    // icone do campo de data
    if (tipoCampo === TipoCampo.data) {

      return <Fontisto name="date" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

    // icone da categoria
    if (tipoCampo === TipoCampo.nomeCategoria || tipoCampo === TipoCampo.descricaoCategoria
      || tipoCampo === TipoCampo.descricao
    ) {

      return <AntDesign name="tag" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

    // icone do campo de estoque
    if (tipoCampo === TipoCampo.estoque) {

      return <Feather name="box" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

    // icone do valor monetário
    if (tipoCampo === TipoCampo.valorMonetario) {

      return <MaterialIcons name="attach-money" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

    // icone de calendário
    if (tipoCampo === TipoCampo.dataNascimento
      || tipoCampo === TipoCampo.dataFundacao
    ) {

      return <FontAwesome name="calendar" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

    // icone de cnpj
    if (tipoCampo === TipoCampo.cnpj) {

      return <Feather name="home" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } />;
    }

  }

  // botão de visualizar senha
  const BotaoVisualizarSenha = () => {

    return <Pressable onPress={ onVisualizarSenha }>
      { !senhaVisivel ? <AntDesign name="eye" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } /> 
      : <AntDesign name="eye-invisible" size={ 30 } color={ variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA } /> }
    </Pressable>
  }

  // aplicar mascara de telefone
  const aplicarMascaraTelefone = (telefone: string): string => {
    const apenasNumeros = telefone.replace(/\D/g, "");

    if (apenasNumeros.length <= 10) {

      return apenasNumeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return apenasNumeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  }

  // aplicar mascara telefone fixo
  const aplicarMascaraTelefoneFixo = (telefoneFixo: string): string => {
    const numeros = telefoneFixo.replace(/\D/g, "").slice(0, 10);

    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  // aplicar mascara de data
  const aplicarMascaraData = (data: string): string => {
    const apenasNumeros = data.replace(/\D/g, "");

    return apenasNumeros
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
      .substring(0, 10);
  }

  // aplicar máscara de CPF
  const aplicarMascaraCpf = (cpf: string): string => {
    const apenasNumeros = cpf.replace(/\D/g, "");

    return apenasNumeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  }

  // aplicar mascara de valor monetário no campo
  const aplicarMascaraValorMonetario = (valor: string): string => {
    const numero = Number(valor.replace(/\D/g, "")) / 100;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numero);
  }

  // aplicar mascara de numero inteiro
  const aplicarMascaraNumeroInteiro = (numero: string): string => {

    return numero.replace(/\D/g, "");
  }

  // aplicar mascara cnpj
  const aplicarMascaraCnpj = (cnpjDigitado: string): string => {

    return cnpjDigitado
      .replace(/\D/g, "")
      .slice(0, 14)
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  // aplicar máscara de rg
  const aplicarMascaraRg = (rg: string): string => {

    return rg
      .replace(/\D/g, "")
      .slice(0, 9)
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  // aplicar mascara de cep
  const aplicarMascaraCEP = (cep: string): string => {

    return cep
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/^(\d{5})(\d)/, "$1-$2");
  }

  // aplicar mascara no campo
  const aplicarMascaraCampo = (valorDigitado: string, tipoCampo: TipoCampo): string => {

    // cep
    if (tipoCampo === TipoCampo.cep) {

      return aplicarMascaraCEP(valorDigitado);
    }

    // cnpj
    if (tipoCampo === TipoCampo.cnpj) {

      return aplicarMascaraCnpj(valorDigitado);
    }

    // telefone
    if (tipoCampo === TipoCampo.telefone) {

      return aplicarMascaraTelefone(valorDigitado);
    }

    // aplicar mascara de rg
    if (tipoCampo === TipoCampo.rg) {

      return aplicarMascaraRg(valorDigitado);
    }

    // telefone fixo
    if (tipoCampo === TipoCampo.telefoneFixo) {

      return aplicarMascaraTelefoneFixo(valorDigitado);
    }

    // data
    if (tipoCampo === TipoCampo.data
      || tipoCampo === TipoCampo.dataNascimento
      || tipoCampo === TipoCampo.dataFundacao
    ) {

      return aplicarMascaraData(valorDigitado);
    }

    // cpf
    if (tipoCampo === TipoCampo.cpf) {

      return aplicarMascaraCpf(valorDigitado);
    }

    // valor monetário
    if (tipoCampo === TipoCampo.valorMonetario) {

      return aplicarMascaraValorMonetario(valorDigitado);
    }

    // aplicar mascara de numero inteiro
    if (tipoCampo === TipoCampo.estoque) {

      return aplicarMascaraNumeroInteiro(valorDigitado);
    }

    return valorDigitado;
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
            const valorCampoComMascara: string = aplicarMascaraCampo(novoValorCampo, tipoCampo);
            onAlterarValor(valorCampoComMascara);
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
          secureTextEntry={ tipoCampo === TipoCampo.senha && !senhaVisivel }
          multiline={ tipoCampo === TipoCampo.descricaoCategoria }
          maxLength={ tamanhoMaximo ? tamanhoMaximo : undefined } />
        { tipoCampo === TipoCampo.senha && <BotaoVisualizarSenha /> }
        { /** tamanho máximo do campo */ }
        { tamanhoMaximo && <View style={ styles.containerCaracteresCategoria }>
          <Text>{ valor.length }</Text>
          <Text>/</Text>
          <Text>{ tamanhoMaximo.toString() }</Text>
        </View> }
      </View>
      { erro != "" && <Text style={ styles.erro }>{ erro }</Text> }
    </View>
  );
}

export default Campo;