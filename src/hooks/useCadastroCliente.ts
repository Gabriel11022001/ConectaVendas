import { TipoPessoa } from "@/types/cliente";
import { useEffect, useState } from "react";

export default function useCadastroCliente() {

  const [ carregando, setCarregando ] = useState<boolean>(false);

  const [ idClienteEditar, setIdClienteEditar ] = useState<string>("");
  const [ tipoPessoa, setTipoPessoa ] = useState<TipoPessoa>(TipoPessoa.pf);
  const [ email, setEmail ] = useState<string>("");
  const [ telefoneCelular, setTelefoneCelular ] = useState<string>("");
  const [ telefoneFixo ] = useState<string>("");
  const [ status, setStatus ] = useState<string>("");

  // se for pessoa fisica
  const [ nome, setNome ] = useState<string>("");
  const [ cpf, setCpf ] = useState<string>("");
  const [ rg, setRg ] = useState<string>("");
  const [ dataNascimento, setDataNascimento ] = useState<string>("");
  const [ genero, setGenero ] = useState<string>("");
  const [ estadoCivil, setEstadoCivil ] = useState<string>("");

  // se for pessoa juridica
  const [ cnpj, setCnpj ] = useState<string>("");
  const [ razaoSocial, setRazaoSocial ] = useState<string>("");
  const [ nomeFantasia, setNomeFantasia ] = useState<string>("");
  const [ dataFundacao, setDataFundacao ] = useState<string>("");

  // controlar quando o usuário digitar no campo
  const onDigitar = (valor: string, tipoCampo: string): void => {

  }

  // salvar o cliente
  const salvar = async () => {
    setCarregando(true);

    try {

    } catch (e) {
      console.log("Erro ao tentar-se cadastrar o cliente: " + e);
    } finally {
      setCarregando(false);
    }

  }

  // buscar o cliente pelo id
  const buscarClientePeloId = async () => {
    
    if (idClienteEditar) {
      console.log("buscar o cliente pelo id: " + idClienteEditar);
    }

  }

  useEffect(() => {
    buscarClientePeloId();
  }, [ idClienteEditar ]);

  return {
    idClienteEditar,
    salvar,
    onDigitar,
    buscarClientePeloId,
    carregando,
    tipoPessoa,
    email,
    telefoneCelular,
    telefoneFixo,
    status,
    nome,
    cpf,
    rg,
    dataNascimento,
    genero,
    estadoCivil,
    cnpj,
    razaoSocial,
    nomeFantasia,
    dataFundacao,
    setIdClienteEditar
  };
}