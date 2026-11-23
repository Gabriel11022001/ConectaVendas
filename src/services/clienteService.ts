import { ClientePessoaFisica, ClientePessoaJuridica, TipoPessoa } from "@/types/cliente";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// buscar pelo cpf
const buscarPeloCpf = async (cpf: string): Promise<ClientePessoaFisica | ClientePessoaJuridica | null> => {

  try {
    const consulta = query(
      collection(db, "tb_clientes"),
      where("cpf", "==", cpf)
    );

    const resultado = await getDocs(consulta);

    if (resultado.empty) {

      return null;
    }

    const clienteBaseDados = resultado.docs[0];

    if (clienteBaseDados.data().tipo_pessoa === "pf") {
      const clientePf: ClientePessoaFisica = {
        id: clienteBaseDados.id ?? "",
        email: clienteBaseDados.data().email,
        dataCadastro: clienteBaseDados.data().data_cadastro,
        status: clienteBaseDados.data().status,
        telefoneCelular: clienteBaseDados.data().telefone_celular,
        tipoPessoa: TipoPessoa.pf,
        cpf: clienteBaseDados.data().cpf ?? "",
        dataNascimento: clienteBaseDados.data().data_nascimento ?? "",
        estadoCivil: clienteBaseDados.data().estado_civil ?? "",
        genero: clienteBaseDados.data().genero ?? "",
        nome: clienteBaseDados.data().nome ?? "",
        rg: clienteBaseDados.data().rg ?? "",
        telefoneFixo: clienteBaseDados.data().telefone_fixo ?? ""
      }

      return clientePf;
    } else {
      const clientePj: ClientePessoaJuridica = {
        id: clienteBaseDados.id ?? "",
        email: clienteBaseDados.data().email,
        dataCadastro: clienteBaseDados.data().data_cadastro,
        status: clienteBaseDados.data().status,
        telefoneCelular: clienteBaseDados.data().telefone_celular,
        tipoPessoa: TipoPessoa.pj,
        telefoneFixo: clienteBaseDados.data().telefone_fixo ?? "",
        cnpj: clienteBaseDados.data().cnpj ?? "",
        razaoSocial: clienteBaseDados.data().razao_social ?? "",
        dataFundacao: clienteBaseDados.data().data_fundacao ?? "",
        nomeFantasia: clienteBaseDados.data().nome_fantasia ?? ""
      }

      return clientePj;
    }
    
  } catch (e) {
    console.log(`Erro ao tentar-se buscar o cliente pelo cpf: ${e}`);

    throw e;
  }

}

// buscar pelo cpf
const buscarPeloEmail = async (email: string): Promise<ClientePessoaFisica | ClientePessoaJuridica | null> => {

  try {
    const consulta = query(
      collection(db, "tb_clientes"),
      where("email", "==", email)
    );

    const resultado = await getDocs(consulta);

    if (resultado.empty) {

      return null;
    }

    const clienteBaseDados = resultado.docs[0];

    if (clienteBaseDados.data().tipo_pessoa === "pf") {
      const clientePf: ClientePessoaFisica = {
        id: clienteBaseDados.id ?? "",
        email: clienteBaseDados.data().email,
        dataCadastro: clienteBaseDados.data().data_cadastro,
        status: clienteBaseDados.data().status,
        telefoneCelular: clienteBaseDados.data().telefone_celular,
        tipoPessoa: TipoPessoa.pf,
        cpf: clienteBaseDados.data().cpf ?? "",
        dataNascimento: clienteBaseDados.data().data_nascimento ?? "",
        estadoCivil: clienteBaseDados.data().estado_civil ?? "",
        genero: clienteBaseDados.data().genero ?? "",
        nome: clienteBaseDados.data().nome ?? "",
        rg: clienteBaseDados.data().rg ?? "",
        telefoneFixo: clienteBaseDados.data().telefone_fixo ?? ""
      }

      return clientePf;
    } else {
      const clientePj: ClientePessoaJuridica = {
        id: clienteBaseDados.id ?? "",
        email: clienteBaseDados.data().email,
        dataCadastro: clienteBaseDados.data().data_cadastro,
        status: clienteBaseDados.data().status,
        telefoneCelular: clienteBaseDados.data().telefone_celular,
        tipoPessoa: TipoPessoa.pj,
        telefoneFixo: clienteBaseDados.data().telefone_fixo ?? "",
        cnpj: clienteBaseDados.data().cnpj ?? "",
        razaoSocial: clienteBaseDados.data().razao_social ?? "",
        dataFundacao: clienteBaseDados.data().data_fundacao ?? "",
        nomeFantasia: clienteBaseDados.data().nome_fantasia ?? ""
      }

      return clientePj;
    }
    
  } catch (e) {
    console.log(`Erro ao tentar-se buscar o cliente pelo e-mail: ${e}`);

    throw e;
  }

}

// buscar pelo telefone celular
const buscarPeloTelefoneCelular = async (celular: string): Promise<ClientePessoaFisica | ClientePessoaJuridica | null> => {

  try {
    const consulta = query(
      collection(db, "tb_clientes"),
      where("telefone_celular", "==", celular)
    );

    const resultado = await getDocs(consulta);

    if (resultado.empty) {

      return null;
    }

    const clienteBaseDados = resultado.docs[0];

    if (clienteBaseDados.data().tipo_pessoa === "pf") {
      const clientePf: ClientePessoaFisica = {
        id: clienteBaseDados.id ?? "",
        email: clienteBaseDados.data().email,
        dataCadastro: clienteBaseDados.data().data_cadastro,
        status: clienteBaseDados.data().status,
        telefoneCelular: clienteBaseDados.data().telefone_celular,
        tipoPessoa: TipoPessoa.pf,
        cpf: clienteBaseDados.data().cpf ?? "",
        dataNascimento: clienteBaseDados.data().data_nascimento ?? "",
        estadoCivil: clienteBaseDados.data().estado_civil ?? "",
        genero: clienteBaseDados.data().genero ?? "",
        nome: clienteBaseDados.data().nome ?? "",
        rg: clienteBaseDados.data().rg ?? "",
        telefoneFixo: clienteBaseDados.data().telefone_fixo ?? ""
      }

      return clientePf;
    } else {
      const clientePj: ClientePessoaJuridica = {
        id: clienteBaseDados.id ?? "",
        email: clienteBaseDados.data().email,
        dataCadastro: clienteBaseDados.data().data_cadastro,
        status: clienteBaseDados.data().status,
        telefoneCelular: clienteBaseDados.data().telefone_celular,
        tipoPessoa: TipoPessoa.pj,
        telefoneFixo: clienteBaseDados.data().telefone_fixo ?? "",
        cnpj: clienteBaseDados.data().cnpj ?? "",
        razaoSocial: clienteBaseDados.data().razao_social ?? "",
        dataFundacao: clienteBaseDados.data().data_fundacao ?? "",
        nomeFantasia: clienteBaseDados.data().nome_fantasia ?? ""
      }

      return clientePj;
    }
    
  } catch (e) {
    console.log(`Erro ao tentar-se buscar o cliente pelo celular: ${e}`);

    throw e;
  }

}

// cadastrar cliente pf
const cadastrarPf = async (cliente: ClientePessoaFisica) => {

  try {
    const clienteRef = collection(db, 'tb_clientes');
    
    const clienteCadastrarDb = {
      tipo_pessoa: "pf",
      email: cliente.email,
      telefone_celular: cliente.telefoneCelular,
      telefone_fixo: cliente.telefoneFixo ?? "",
      data_cadastro: cliente.dataCadastro,
      status: cliente.status,
      nome: cliente.nome ?? "",
      cpf: cliente.cpf ?? "",
      rg: cliente.rg ?? "",
      data_nascimento: cliente.dataNascimento ?? "",
      genero: cliente.genero ?? "",
      estado_civil: cliente.estadoCivil ?? "",
      cnpj: "",
      razao_social: "",
      nome_fantasia: "",
      data_fundacao: "",
      cep: cliente.endereco?.cep ?? "",
      logradouro: cliente.endereco?.logradouro ?? "",
      complemento: cliente.endereco?.complemento ?? "",
      uf: cliente.endereco?.estado ?? "",
      cidade: cliente.endereco?.cidade ?? "",
      bairro: cliente.endereco?.bairro ?? "",
      numero: cliente.endereco?.numero ?? ""
    };

    await addDoc(clienteRef, clienteCadastrarDb);
   
    console.log("Cliente cadastrado com sucesso!");
  } catch (e) {

    throw e;
  }

}

const ClienteService = {
  cadastrarPf,
  buscarPeloCpf,
  buscarPeloEmail,
  buscarPeloTelefoneCelular
};

export default ClienteService;