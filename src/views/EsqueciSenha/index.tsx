import { Botao } from "@/components/Botao";
import Campo, { TipoCampo } from "@/components/Campo";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import TituloTela from "@/components/TituloTela";
import { Validador } from "@/utils/validacoes";
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { styles } from "./styles";

// tela de recuperação de senha
const EsqueciSenha = () => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");

  const onDigitarEmail = (emailDigitado: string): void => {
    setEmail(emailDigitado);
    setErroEmail("");

    if (emailDigitado.trim().length === 0) {
      setErroEmail("Informe o e-mail");
    } else if (!Validador.validarEmail(emailDigitado)) {
      setErroEmail("E-mail inválido");
    }

  }

  // enviar link de recuperação do e-mail
  const enviarLinkRecuperacao = async () => {

    try {
      setCarregando(true);
    } catch (e) {

    } finally {
      
    }

  }

  return <ConectaVendasTela>
    <ScrollView showsHorizontalScrollIndicator={ false }>
      { /** imagem representando a recuperação de senha */ }
      <View style={ styles.containerImageRecuperarSenha }>
        <Image source={ require("@/assets/images/img_resetar_senha.png") } style={ styles.imgRecuperarSenha } />
      </View>
      { /** título da tela */ }
      <TituloTela 
        titulo="Recuperar Senha" 
        subtitulo="Informe o e-mail cadastrado que enviaremos um link para você redifinir sua senha." />
      { /** campo para o usuário informar o e-mail */ }
      <Campo 
        tipoCampo={ TipoCampo.email }
        placeholder="Digite seu e-mail"
        valor={ email }
        erro={ erroEmail }
        habilitado={ !carregando }
        onAlterarValor={ (emailDigitado: string) => {
          onDigitarEmail(emailDigitado);
        } } />
      { /** botão para recuperar a senha */ }
      <Botao
        tipo="default"
        carregando={ carregando }
        habilitado={ email != "" && erroEmail === "" }
        titulo="Enviar link de recuperação"
        onClick={ enviarLinkRecuperacao } />
    </ScrollView>
  </ConectaVendasTela>
}

export default EsqueciSenha;