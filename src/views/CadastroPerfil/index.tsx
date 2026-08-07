import { Botao } from "@/components/Botao";
import Campo, { TipoCampo } from "@/components/Campo";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import TituloTela from "@/components/TituloTela";
import { useState } from "react";
import { ScrollView } from "react-native";

enum TipoCampoDigitar {

  nomeCompleto,
  email,
  telefone,
  cpf,
  dataNascimento,
  senha,
  senhaConfirmar

}

type CampoDigitar = {

  valor: string;
  campo: TipoCampoDigitar;

}

// tela de cadastro de perfil do usuário
const CadastroPerfil = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ nomeCompleto, setNomeCompleto ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ telefone, setTelefone ] = useState<string>("");
  const [ cpf, setCpf ] = useState<string>("");
  const [ dataNascimento, setDataNascimento ] = useState<string>("");
  const [ senha, setSenha ] = useState<string>("");
  const [ confirmarSenha, setConfirmarSenha ] = useState<string>("");
  const [ erroNomeCompleto, setErroNomeCompleto ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");
  const [ erroTelefone, setErroTelefone ] = useState<string>("");
  const [ erroCpf, setErroCpf ] = useState<string>("");
  const [ erroDataNascimento, setErroDataNascimento ] = useState<string>("");
  const [ erroSenha, setErroSenha ] = useState<string>("");
  const [ erroConfirmarSenha, setErroConfirmarSenha ] = useState<string>("");

  const onDigitarCampo = ({ valor, campo }: CampoDigitar): void => {

    switch(campo) {
      // validar nome completo
      case TipoCampoDigitar.nomeCompleto:
        setNomeCompleto(valor);
        setErroNomeCompleto("");

        if (valor.trim().length === 0) {
          setErroNomeCompleto("Informe o nome completo");
        }

        break;
      // validar e-mail
      case TipoCampoDigitar.email:
        setEmail(valor);
        setErroEmail("");

        if (valor.trim().length === 0) {
          setErroEmail("Informe o e-mail");
        }

        break;
      // validar telefone
      case TipoCampoDigitar.telefone:
        setTelefone(valor);
        setErroTelefone("");

        if (valor.trim().length === 0) {
          setErroTelefone("Informe o telefone");
        }

        break;
    }

  }

  // efetuar o cadastro do usuário
  const cadastrar = async () => {

  }

  return <ConectaVendasTela>
    <ScrollView showsHorizontalScrollIndicator={ false }>
      { /** título da tela */ }
      <TituloTela
        titulo="Cadastro de Perfil"
        subtitulo="Cadastre seu perfil para utilizar os recursos do applicativo." />
      { /** campo do nome completo */ }
      <Campo
        tipoCampo={ TipoCampo.identificacao }
        placeholder="Nome Completo"
        valor={ nomeCompleto }
        erro={ erroNomeCompleto }
        habilitado={ true }
        onAlterarValor={ (nomeCompletoDigitado: string) => {
          onDigitarCampo({
            valor: nomeCompletoDigitado,
            campo: TipoCampoDigitar.nomeCompleto
          });
        } } />
      { /** campo do e-mail */ }
      <Campo
        tipoCampo={ TipoCampo.email }
        placeholder="E-mail"
        habilitado={ true }
        erro={ erroEmail }
        valor={ email }
        onAlterarValor={ (emailDigitado: string) => onDigitarCampo(
          {
            campo: TipoCampoDigitar.email,
            valor: emailDigitado
          }
        ) } />
      { /** campo de telefone */ }
      <Campo
        tipoCampo={ TipoCampo.telefone }
        placeholder="Telefone"
        habilitado={ true }
        erro={ erroTelefone }
        valor={ telefone }
        onAlterarValor={ (telefoneDigitado: string) => onDigitarCampo(
          {
            campo: TipoCampoDigitar.telefone,
            valor: telefoneDigitado
          }
        ) } />
      { /** botão para afetuar o login */ }
      <Botao
        titulo="Cadastrar"
        tipo="default"
        carregando={ carregando }
        habilitado={
          !carregando
          && nomeCompleto != ""
          && email != ""
          && telefone != ""
          && cpf != ""
          && senha != ""
          && confirmarSenha != ""
          && erroNomeCompleto === ""
          && erroEmail === ""
          && erroTelefone === ""
          && erroCpf === ""
          && erroDataNascimento === ""
          && erroSenha === ""
          && erroConfirmarSenha === ""
        }
        onClick={ cadastrar } />
    </ScrollView>
  </ConectaVendasTela>
}

export default CadastroPerfil;