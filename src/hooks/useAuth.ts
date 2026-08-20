import { LoginException } from "@/exceptions/loginException";
import { UsuarioService } from "@/services/usuarioService";
import { Usuario } from "@/types/usuario";

const useAuth = (navigation: any) => {

  // efetuar login do usuário
  const efetuarLogin = async (email: string, senha: string) => {

    try {
      console.log(`Efetuar login ${ email }`);

      const usuario: Usuario | null = await UsuarioService.buscarPeloEmailSenha(email, senha);

      if (!usuario) {

        throw new LoginException("E-mail ou senha inválidos!");
      }

      await salvarDadosUsuarioLogado(usuario);

      // redirecionar o usuário para a tela home
      navigation.navigate("home");
    } catch (e) {
      console.log(`Erro ao tentar-se efetuar login: ${ e }`);

      throw e;
    }

  }

  // salvar dados do usuário logado
  const salvarDadosUsuarioLogado = async ({
    id,
    ativo,
    nomeCompleto,
    email,
    dataNascimento,
    telefone
  }: Usuario) => {

  }

  // obter o usuário logado
  const getUsuarioLogado = async () => {

  }

  return {
    efetuarLogin,
    getUsuarioLogado
  };
}

export { useAuth };

