import { Botao } from "@/components/Botao";
import Campo, { TipoCampo } from "@/components/Campo";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import Loader from "@/components/Loader";
import TituloTela from "@/components/TituloTela";
import { UsuarioMesmoCpfException } from "@/exceptions/usuarioMemoCpfException";
import { UsuarioMesmoEmailException } from "@/exceptions/usuarioMesmoEmailException";
import { UsuarioService } from "@/services/usuarioService";
import { Usuario } from "@/types/usuario";
import { Validador } from "@/utils/validacoes";
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
  const [ senhaVisivel, setSenhaVisivel ] = useState<boolean>(false); 
  const [ confirmarSenhaVisivel, setConfirmarSenhaVisivel ] = useState<boolean>(false);

  const onDigitarCampo = ({ valor, campo }: CampoDigitar): void => {

    switch(campo) {
      // validar nome completo
      case TipoCampoDigitar.nomeCompleto:
        setNomeCompleto(valor);
        setErroNomeCompleto("");

        if (valor.trim().length === 0) {
          setErroNomeCompleto("Informe o nome completo");
        } else if (!Validador.validarNome(valor.trim())) {
          setErroNomeCompleto("O nome deve possuir no mínimo três caracteres");
        }

        break;
      // validar e-mail
      case TipoCampoDigitar.email:
        setEmail(valor);
        setErroEmail("");

        if (valor.trim().length === 0) {
          setErroEmail("Informe o e-mail");
        } else if (!Validador.validarEmail(valor.trim())) {
          setErroEmail("E-mail inválido");
        }

        break;
      // validar telefone
      case TipoCampoDigitar.telefone:
        setTelefone(valor);
        setErroTelefone("");

        if (valor.trim().length === 0) {
          setErroTelefone("Informe o telefone");
        } else if (!Validador.validarTelefone(valor.trim())) {
          setErroTelefone("Telefone inválido");
        }

        break;
      // validar o cpf
      case TipoCampoDigitar.cpf:
        setCpf(valor);
        setErroCpf("");

        if (valor.trim().length === 0) {
          setErroCpf("Informe o cpf");
        } else if (!Validador.validarCpf(valor.trim())) {
          setErroCpf("CPF inválido");
        }

        break;
      // validar data de nascimento
      case TipoCampoDigitar.dataNascimento:
        setDataNascimento(valor);
        setErroDataNascimento("");

        if (valor.trim().length === 0) {
          setErroDataNascimento("Informe a data de nascimento");
        } else if (!Validador.validarDataNascimento(valor.trim())) {
          setErroDataNascimento("Data de nascimento inválida");
        }

        break;
      // validar a senha
      case TipoCampoDigitar.senha:
        setSenha(valor);
        setErroSenha("");

        if (valor.trim().length === 0) {
          setErroSenha("Informe a senha");
        }
        
        break;
      // validar a confirmação de senha
      case TipoCampoDigitar.senhaConfirmar:
        setConfirmarSenha(valor);
        setErroConfirmarSenha("");

        if (valor.trim().length === 0) {
          setErroConfirmarSenha("Informe a senha de confirmação");
        }

        break;
    }

  }

  // validar se existe outro usuário cadastrado com o mesmo e-mail
  const validarExisteUsuarioMesmoEmail = async () => {
    
    if (await UsuarioService.buscarPeloEmail(email.trim())) {

      throw new UsuarioMesmoEmailException();
    }

  }

  // validar se existe outro usuário cadastrado com o mesmo cpf
  const validarExisteOutroUsuarioMesmoCpf = async () => {
    const usuario: Usuario | null = await UsuarioService.buscarPeloCpf(cpf.trim());

    if (usuario) {

      throw new UsuarioMesmoCpfException();
    }

  }

  // efetuar o cadastro do usuário
  const cadastrar = async () => {

    try {
      setCarregando(true);

      const usuario: Usuario = {
        nomeCompleto: nomeCompleto.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        dataNascimento: dataNascimento.trim(),
        ativo: true,
        senha: senha.trim(),
        cpf: cpf.trim()
      }

      // validar se existe outro usuário cadastrado com o mesmo cpf
      await validarExisteOutroUsuarioMesmoCpf();

      // validar se existe outro usuário cadastrado com o mesmo e-mail
      await validarExisteUsuarioMesmoEmail();

      await UsuarioService.cadastrar(usuario);

      /** 
       * apresentar um alerta de sucesso para o usuário e autenticar o mesmo,
       * em seguida, redirecionar o mesmo para a tela home do app
       */
    } catch (e) {

      if (e instanceof UsuarioMesmoEmailException) {
        console.log("Existe outro usuário cadastrado com o mesmo e-mail!");
      } else if (e instanceof UsuarioMesmoCpfException) {
        console.log("Existe outro usuário cadastrado com o mesmo cpf!");
      } else {
        console.log(`Erro: ${ e }`);
      }

    } finally {
      setCarregando(false);
    }

  }

  return <ConectaVendasTela>
    { /** loader de carregamento da tela */ }
    <Loader carregando={ carregando } msg="Cadastrando perfil, aguarde..." />
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
        habilitado={ !carregando }
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
        habilitado={ !carregando }
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
        habilitado={ !carregando }
        erro={ erroTelefone }
        valor={ telefone }
        onAlterarValor={ (telefoneDigitado: string) => onDigitarCampo(
          {
            campo: TipoCampoDigitar.telefone,
            valor: telefoneDigitado
          }
        ) } />
      { /** campo de cpf */ }
      <Campo
        tipoCampo={ TipoCampo.cpf }
        placeholder="CPF"
        habilitado={ !carregando }
        erro={ erroCpf }
        valor={ cpf }
        onAlterarValor={ (cpfDigitado: string) => onDigitarCampo(
          {
            campo: TipoCampoDigitar.cpf,
            valor: cpfDigitado
          }
        ) } />
      { /** campo de data de nascimento */ }
      <Campo
        tipoCampo={ TipoCampo.data }
        placeholder="Data de Nascimento"
        habilitado={ !carregando }
        erro={ erroDataNascimento }
        valor={ dataNascimento }
        onAlterarValor={ (dataNascimentoDigitado: string) => onDigitarCampo(
          {
            campo: TipoCampoDigitar.dataNascimento,
            valor: dataNascimentoDigitado
          }
        ) } />
      { /** campo de data da senha */ }
      <Campo
        tipoCampo={ TipoCampo.senha }
        placeholder="Senha"
        habilitado={ !carregando }
        erro={ erroSenha }
        valor={ senha }
        onAlterarValor={ (senhaDigitado: string) => onDigitarCampo(
          {
            campo: TipoCampoDigitar.senha,
            valor: senhaDigitado
          }
        ) }
        senhaVisivel={ senhaVisivel }
        onVisualizarSenha={ () => {
          setSenhaVisivel(!senhaVisivel);
        } } />
      { /** campo de confirmar senha */ }
      <Campo
        tipoCampo={ TipoCampo.senha }
        placeholder="Confirmar Senha"
        habilitado={ !carregando }
        erro={ erroConfirmarSenha }
        valor={ confirmarSenha }
        onAlterarValor={ (confirmarSenhaDigitado: string) => onDigitarCampo(
          {
            campo: TipoCampoDigitar.senhaConfirmar,
            valor: confirmarSenhaDigitado
          }
        ) }
        senhaVisivel={ confirmarSenhaVisivel }
        onVisualizarSenha={ () => {
          setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
        } } />
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