import { Botao } from "@/components/Botao";
import Campo, { TipoCampo } from "@/components/Campo";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

// tela de login do app
const Login = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>("");
  const [ senha, setSenha ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");
  const [ erroSenha, setErroSenha ] = useState<string>("");
  const [ senhaVisivel, setSenhaVisivel ] = useState<boolean>(false);

  const onDigitarEmail = (emailDigitado: string): void => {
    setEmail(emailDigitado);
    setErroEmail("");

    if (emailDigitado.trim().length === 0) {
      setErroEmail("Informe o e-mail");
    }

  }

  const onDigitarSenha = (senhaDigitada: string): void => {
    setSenha(senhaDigitada.trim());
    setErroSenha("");

    if (senhaDigitada.trim().length === 0) {
      setErroSenha("Informe a senha");
    }

  }

  // efetuar login no app
  const efetuarLogin = async () => {

    try {
      setCarregando(true);
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  // redirecionar para a tela de esqueci minha senha
  const redirecionarEsqueciSenha = (): void => {

  }

  return (
    <ConectaVendasTela>
      <ScrollView showsHorizontalScrollIndicator={ false }>
        <View style={ styles.viewLogo }>
          <Image
            style={ styles.logo }
            source={ require("@/assets/images/logo_tela_login.png") } />
        </View>
        { /** mensagem de boas vindas */ }
        <Text style={ styles.titulo }>Bem vindo de volta!</Text>
        <Text style={ styles.subtitulo }>Faça login para continuar.</Text>
        { /** campo de e-mail */ }
        <Campo
          tipoCampo={ TipoCampo.email }
          valor={ email }
          onAlterarValor={ onDigitarEmail }
          habilitado={ !carregando }
          erro={ erroEmail }
          placeholder="E-mail" />
        { /** campo da senha */ }
        <Campo
          tipoCampo={ TipoCampo.senha }
          valor={ senha }
          onAlterarValor={ onDigitarSenha }
          habilitado={ !carregando }
          erro={ erroSenha }
          placeholder="Senha"
          senhaVisivel={ senhaVisivel }
          onVisualizarSenha={ () => {
            setSenhaVisivel(!senhaVisivel);
          } } />
        { /** botão de esqueci senha */ }
        <View style={ styles.containerEsqueciSenha }>
          <Pressable
            onPress={ redirecionarEsqueciSenha }>
            <Text style={ styles.txtEsqueciSenha }>Esqueci minha senha</Text>
          </Pressable>
        </View>
        { /** botão de login do app */ }
        <Botao
          titulo="Entrar"
          carregando={ carregando }
          tipo="default"
          margemBaixo={ 10 }
          habilitado={
            !carregando 
            && email != ""
            && senha != ""
            && erroEmail === ""
            && erroSenha === ""
          }
          onClick={ () => {
            efetuarLogin();
          } } />
        { /** container separando o botão do login do botão de registrar-se */ }
        <View style={ styles.containerOu }>
          <View style={ styles.containerOuSeparador } />
          <Text style={ styles.txtOu }>Ou</Text>
          <View style={ styles.containerOuSeparador } />
        </View>
        { /** botão para redirecionar o usuário para a tela de cadastro de perfil */ }  
        <Botao
          tipo="cadastro_usuario"
          carregando={ false }
          habilitado={ true }
          titulo=""
          margemTopo={ 10 }
          onClick={ () => {
            navigation.navigate("cadastro_perfil");
          } } />
      </ScrollView>
    </ConectaVendasTela>
  );
}

export default Login;