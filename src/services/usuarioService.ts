import { Usuario } from "@/types/usuario";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from "../../firebaseConfig";

// cadastrar perfil do usuário
const cadastrar = async (usuarioCadastrar: Usuario) => {

  try {
    console.log(
      'Cadastrando o usuário: ' + JSON.stringify(usuarioCadastrar)
    );

    const usuariosRef = collection(db, 'tb_usuarios');

    const documento = await addDoc(usuariosRef, usuarioCadastrar);

    console.log('Usuário cadastrado com sucesso: ', documento.id);

    return {
      id: documento.id,
      ...usuarioCadastrar,
    };
  } catch (e) {
    console.log(`Erro ao tentar-se cadastrar o usuário: ${ e }`);

    throw e;
  }

}

// editar usuário
const editar = async (usuarioEditar: Usuario) => {

}

// buscar usuário pelo e-mail e senha
const buscarPeloEmailSenha = async (email: string, senha: string) => {

  try {
    const usuariosRef = collection(db, 'tb_usuarios');

    const consulta = query(
      usuariosRef,
      where('email', '==', email),
      where('senha', '==', senha)
    );

    const snapshot = await getDocs(consulta);

    if (snapshot.empty) {
      console.log(`Não foi encontrado um usuário com o e-mail ${ email } e senha: ${ senha }`);

      return null;
    }

    const documento = snapshot.docs[0];

    const usuario: Usuario = {
      id: documento.id ?? "",
      nomeCompleto: documento.data().nome_completo,
      email: documento.data().email,
      senha: documento.data().senha,
      ativo: documento.data().ativo,
      telefone: documento.data().telefone,
      dataNascimento: documento.data().data_nascimento,
      cpf: documento.data().cpf
    }

    console.log("Usuário encontrado com sucesso: " + JSON.stringify(usuario));

    return usuario;
  } catch (e) {
    console.log(`Erro ao tentar-se buscar o usuário pelo e-mail: ${ e }`);

    throw e;
  }

}

// buscar usuário pelo cpf
const buscarPeloCpf = async (cpf: string) => {

  try {
    const usuariosRef = collection(db, 'tb_usuarios');

    const consulta = query(
      usuariosRef,
      where('cpf', '==', cpf)
    );

    const snapshot = await getDocs(consulta);

    if (snapshot.empty) {
      console.log(`Não foi encontrado um usuário com o cpf ${ cpf }`);

      return null;
    }

    const documento = snapshot.docs[0];

    const usuario: Usuario = {
      id: documento.id ?? "",
      nomeCompleto: documento.data().nome_completo,
      email: documento.data().email,
      senha: documento.data().senha,
      ativo: documento.data().ativo,
      telefone: documento.data().telefone,
      dataNascimento: documento.data().data_nascimento,
      cpf: documento.data().cpf
    }

    console.log("Usuário encontrado com sucesso: " + JSON.stringify(usuario));

    return usuario;
  } catch (e) {
    console.log(`Erro ao tentar-se buscar o usuário pelo cpf: ${ e }`);

    throw e;
  }

}

// buscar usuário pelo e-mail
const buscarPeloEmail = async (email: string) => {

  try {
    const usuariosRef = collection(db, 'tb_usuarios');

    const consulta = query(
      usuariosRef,
      where('email', '==', email)
    );

    const snapshot = await getDocs(consulta);

    if (snapshot.empty) {
      console.log(`Não foi encontrado um usuário com o e-mail ${ email }`);

      return null;
    }

    const documento = snapshot.docs[0];

    const usuario: Usuario = {
      id: documento.id ?? "",
      nomeCompleto: documento.data().nome_completo,
      email: documento.data().email,
      senha: documento.data().senha,
      ativo: documento.data().ativo,
      telefone: documento.data().telefone,
      dataNascimento: documento.data().data_nascimento,
      cpf: documento.data().cpf
    }

    console.log("Usuário encontrado com sucesso: " + JSON.stringify(usuario));

    return usuario;
  } catch (e) {
    console.log(`Erro ao tentar-se buscar o usuário pelo e-mail: ${ e }`);

    throw e;
  }

}

// deletar o perfil do usuário
const deletar = async (id: string) => {

}

const UsuarioService = {
  cadastrar,
  editar,
  buscarPeloCpf,
  buscarPeloEmail,
  buscarPeloEmailSenha,
  deletar
};

export { UsuarioService };

