import { TipoCampo } from "@/components/Campo";
import { OpcaoSelect } from "@/components/Select";
import ClienteService from "@/services/clienteService";
import { EnderecoConsultasService, EnderecoViaCEP } from "@/services/enderecoConsultasService";
import { ClientePessoaFisica, ClientePessoaJuridica, TipoPessoa } from "@/types/cliente";
import { getDataHoraAtual } from "@/utils/getDataHoraAtual";
import { Validador } from "@/utils/validacoes";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

export type EstadoApiIBGE = {

  id: string;
  sigla: string;
  nome: string;

}

export type CidadeApiIBGE = {

  id: string;
  nome: string;

}

export default function useCadastroCliente() {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ erro, setErro ] = useState<string>("");

  const [ idClienteEditar, setIdClienteEditar ] = useState<string>("");
  const [ tipoPessoa, setTipoPessoa ] = useState<TipoPessoa>(TipoPessoa.pf);
  const [ email, setEmail ] = useState<string>("");
  const [ telefoneCelular, setTelefoneCelular ] = useState<string>("");
  const [ telefoneFixo, setTelefoneFixo ] = useState<string>("");
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

  // endereço
  const [ cep, setCep ] = useState<string>("");
  const [ logradouro, setLogradouro ] = useState<string>("");
  const [ complemento, setComplemento ] = useState<string>("");
  const [ uf, setUf ] = useState<string>("");
  const [ cidade, setCidade ] = useState<string>("");
  const [ bairro, setBairro ] = useState<string>("");
  const [ numeroResidencial, setNumeroResidencial ] = useState<string>("");

  // erros
  const [ erroEmail, setErroEmail ] = useState<string>("");
  const [ erroTelefoneCelular, setErroTelefoneCelular ] = useState<string>("");
  const [ erroTelefoneFixo, setErroTelefoneFixo ] = useState<string>("");
  const [ erroNome, setErroNome ] = useState<string>("");
  const [ erroCpf, setErroCpf ] = useState<string>("");
  const [ erroRg, setErroRg ] = useState<string>("");
  const [ erroDataNascimento, setErroDataNascimento ] = useState<string>("");
  const [ erroGenero, setErroGenero ] = useState<string>("");
  const [ erroEstadoCivil, setErroEstadoCivil ] = useState<string>("");
  const [ erroCnpj, setErroCnpj ] = useState<string>("");
  const [ erroRazaoSocial, setErroRazaoSocial ] = useState<string>("");
  const [ erroNomeFantasia, setErroNomeFantasia ] = useState<string>("");
  const [ erroDataFundacao, setErroDataFundacao ] = useState<string>("");
  const [ erroStatus, setErroStatus ] = useState<string>("");
  const [ erroCep, setErroCep ] = useState<string>("");
  const [ erroLogradouro, setErroLogradouro ] = useState<string>("");
  const [ erroUf, setErroUf ] = useState<string>("");
  const [ erroCidade, setErroCidade ] = useState<string>("");
  const [ erroBairro, setErroBairro ] = useState<string>("");
  const [ erroNumero, setErroNumero ] = useState<string>("");

  const [ botaoProsseguirAtivo, setBotaoProsseguirAtivo ] = useState<boolean>(false);

  const opcoesStatusCliente: Array<OpcaoSelect> = [
    {
      id: "ativo",
      titulo: "Ativo",
      valor: "ativo"
    },
    {
      id: "inativo",
      titulo: "Inativo",
      valor: "inativo"
    }
  ];

  const opcoesGenerosCliente: Array<OpcaoSelect> = [
    { id: "M", titulo: "Masculino", valor: "M" },
    { id: "F", titulo: "Feminino", valor: "F" }
  ];

  const estadosCivisOpcoes: Array<OpcaoSelect> = [
    { id: "solteiro", titulo: "Solteiro(a)", valor: "solteiro" },
    { id: "casado", titulo: "Casado(a)", valor: "casado" },
    { id: "divorciado", titulo: "Divorciado(a)", valor: "divorciado" },
    { id: "viuvo", titulo: "Viúvo(a)", valor: "viuvo" },
    { id: "separado judicialmente", titulo: "Separado(a) Judicialmente", valor: "separado judicialmente" }
  ];

  const [ estados, setEstados ] = useState<Array<EstadoApiIBGE>>([]);
  const [ cidades, setCidades ] = useState<Array<CidadeApiIBGE>>([]);

  // consultar estados na api do IBGE
  const consultarEstados = async () => {

    try {
      setErro("");
      setCarregando(true);

      setEstados([]);

      const estadosArr: Array<EstadoApiIBGE> = await EnderecoConsultasService
        .consultarEstados();
      
      setEstados(estadosArr);
    } catch (e) {
      setErro(`Erro ao tentar-se consultar os estados: ${ e }`);
    } finally {
      setCarregando(false);
    }

  }

  // controlar quando o usuário digitar no campo
  const onDigitar = (valor: string, tipoCampo: TipoCampo): void => {

    if (tipoCampo === TipoCampo.cep) {
      setErroCep("");
      setCep(valor);

      if (valor.trim().length === 0) {
        setErroCep("Informe o CEP");
      } else if (!Validador.validarCEP(valor)) {
        setErroCep("O CEP informado é inválido");
      }

    }

    if (tipoCampo === TipoCampo.logradouro) {
      setLogradouro(valor);
      setErroLogradouro("");

      if (valor.trim().length === 0) {
        setErroLogradouro("Informe o logradouro");
      }

    }

    if (tipoCampo === TipoCampo.complemento) {
      setComplemento(valor);
    }

    if (tipoCampo === TipoCampo.bairro) {
      setBairro(valor);
      setErroBairro("");

      if (valor.trim().length === 0) {
        setErroBairro("Informe o bairro");
      }

    }

    if (tipoCampo === TipoCampo.numero) {
      setNumeroResidencial(valor.trim());
      setErroNumero("");

      if (valor.trim().length === 0) {
        setErroNumero("Informe S/N(sem número) para o número residêncial");
      } else {
        const numeroConvertido: number = parseInt(valor.trim());

        if (numeroConvertido === 0) {
          setErroNumero("Número inválido");
        } else if (!(numeroConvertido as number)) {

          if (!(valor.trim().toLocaleLowerCase() === "s/n")) {
            setErroNumero("Informe S/N(sem número) para o número residêncial");
          }

        } else if (numeroConvertido < 0) {
          setErroNumero("Número inválido");
        }

      }

    }

    if (tipoCampo === TipoCampo.email) {
      setErroEmail("");
      setEmail(valor);

      if (valor.trim().length === 0) {
        setErroEmail("Informe o e-mail");
      } else if (!Validador.validarEmail(valor.trim())) {
        setErroEmail("E-mail inválido");
      }

    }

    if (tipoCampo === TipoCampo.telefone) {
      setErroTelefoneCelular("");
      setTelefoneCelular(valor);
      
      if (valor.trim().length === 0) {
        setErroTelefoneCelular("Informe o telefone celular");
      } else if (!Validador.validarTelefone(valor.trim())) {
        setErroTelefoneCelular("Telefone celular inválido");
      }
      
    }

    if (tipoCampo === TipoCampo.telefoneFixo) {
      setErroTelefoneFixo("");
      setTelefoneFixo(valor.trim());

      if (valor.trim().length > 1) {

        if (!Validador.validarTelefoneFixo(valor.trim())) {
          setErroTelefoneFixo("Telefone fixo inválido");
        }

      }

    }

    if (tipoCampo === TipoCampo.nomePessoa) {
      setErroNome("");
      setNome(valor);

      if (valor.trim().length === 0) {
        setErroNome("Informe o nome");
      } else if (valor.trim().length < 3) {
        setErroNome("O nome precisa ter pelo menos três caracteres");
      }

    }

    if (tipoCampo === TipoCampo.cpf) {
      setErroCpf("");
      setCpf(valor.trim());

      if (valor.trim().length === 0) {
        setErroCpf("Informe o CPF");
      } else if (!Validador.validarCpf(valor)) {
        setErroCpf("CPF inválido");
      }

    }

    if (tipoCampo === TipoCampo.rg) {
      setErroRg("");
      setRg(valor);

      if (valor.trim().length === 0) {
        setErroRg("Informe o RG");
      } else if (!Validador.validarRg(valor)) {
        setErroRg("RG inválido");
      }

    }

    if (tipoCampo === TipoCampo.dataNascimento) {
      setErroDataNascimento("");
      setDataNascimento(valor);

      if (valor.trim().length === 0) {
        setErroDataNascimento("Informe a data de nascimento");
      } else if (!Validador.validarDataNascimento(valor)) {
        setErroDataNascimento("Data de nascimento inválida");
      }

    }

    if (tipoCampo === TipoCampo.cnpj) {
      setErroCnpj("");
      setCnpj(valor);

      if (valor.trim().length === 0) {
        setErroCnpj("Informe o CNPJ");
      } else if (!Validador.validarCNPJ(valor)) {
        setErroCnpj("CNPJ inválido");
      }

    }

    if (tipoCampo === TipoCampo.razaoSocial) {
      setErroRazaoSocial("");
      setRazaoSocial(valor);

      if (valor.trim().length === 0) {
        setErroRazaoSocial("Informe a razao social");
      }

    }

    if (tipoCampo === TipoCampo.nomeFantasia) {
      setErroNomeFantasia("");
      setNomeFantasia(valor);

      if (valor.trim().length === 0) {
        setErroNomeFantasia("Informe o nome fantasia");
      }

    }

    if (tipoCampo === TipoCampo.dataFundacao) {
      setErroDataFundacao("");
      setDataFundacao(valor);

      if (valor.trim().length === 0) {
        setErroDataFundacao("Informe a data de fundação");
      } else if (!Validador.validarDataFundacao(valor)) {
        setErroDataFundacao("Data de fundação inválida");
      }

    }

  }

  // selecionar gênero
  const onSelecionarGenero = (generoSelecionado: string): void => {
    setGenero(generoSelecionado);
    setErroGenero("");

    if (generoSelecionado === "Selecione o Gênero") {
      setErroGenero("Selecione o gênero do cliente");
    }

  }

  // selecionar estado civil
  const onSelecionarEstadoCivil = (estadoCivilSelecionado: string): void => {
    setEstadoCivil(estadoCivilSelecionado);
    setErroEstadoCivil("");

    if (estadoCivilSelecionado === "Selecione o Estado Civil") {
      setErroEstadoCivil("Selecione o estado civil do cliente");
    }

  }

  // selecionar o status do cliente
  const onSelecionarStatus = (statusSelecionado: string): void => {
    setStatus(statusSelecionado);
    setErroStatus("");

    if (statusSelecionado === "Selecionar Status") {
      setErroStatus("Selecione o status");
    }

  }

  // cadastrar cliente pf
  const cadastrarPf = async () => {
    // validar se já existe outro pf cadastrado com o mesmo cpf
    const clienteMesmoCpf: 
      ClientePessoaFisica 
      | ClientePessoaJuridica 
      | null = await ClienteService.buscarPeloCpf(cpf);

    if (clienteMesmoCpf) {

      throw new Error("Já existe outro cliente cadastrado com esse cpf!");
    }

    await ClienteService.cadastrarPf({
      nome: nome ?? "",
      cpf: cpf.trim() ?? "",
      dataNascimento: dataNascimento.trim() ?? "",
      genero: genero,
      tipoPessoa: TipoPessoa.pf,
      status: "ativo",
      dataCadastro: getDataHoraAtual() ?? "",
      email: email.trim() ?? "",
      telefoneCelular: telefoneCelular.trim() ?? "",
      rg: rg.trim() ?? "",
      telefoneFixo: telefoneFixo.trim() ?? "",
      estadoCivil: estadoCivil.trim() ?? "",
      endereco: {
        cep: cep.trim() ?? "",
        logradouro: logradouro ?? "",
        complemento: complemento ?? "",
        estado: uf ?? "",
        endereco: logradouro ?? "",
        cidade: cidade ?? "",
        bairro: bairro ?? "",
        numero: numeroResidencial ?? "S/N"
      }
    });
  }

  // cadastrar cliente pj
  const cadastrarPj = async () => {

  }

  // cadastrar o cliente
  const cadastrar = async () => {
    console.log("Cadastrar o cliente...");

    // validar se já existe outro cliente cadastrado com o mesmo e-mail
    const clienteMesmoEmail: 
      ClientePessoaFisica 
      | ClientePessoaJuridica 
      | null = await ClienteService.buscarPeloEmail(email);

    if (clienteMesmoEmail) {

      throw new Error(`Já existe outro cliente cadastrado com o e-mail ${ email.trim() }`);
    }

    // validar se já existe outro cliente cadastrado com o mesmo telefone celular
    const clienteMesmoCelular: 
      ClientePessoaFisica
      | ClientePessoaJuridica
      | null = await ClienteService.buscarPeloTelefoneCelular(telefoneCelular);

    if (clienteMesmoCelular) {

      throw new Error(`Já existe outro cliente cadastrado com o celular ${ telefoneCelular }`);
    }

    if (tipoPessoa === TipoPessoa.pf) {
      await cadastrarPf();
    } else {
      await cadastrarPj();
    }

  }

  // editar
  const editar = async () => {
    console.log("Editar o cliente...");
  }

  // salvar o cliente
  const salvar = async () => {
    setCarregando(true);
    setErro("");

    try {

      if (!idClienteEditar) {
        // cadastrar o cliente
        await cadastrar();
      } else {
        // editar o cliente
        await editar();
      }

    } catch (e) {
      console.log("Erro ao tentar-se salvar o cliente: " + e);

      setErro(`${ e }`.replace("Error:", ""));
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

  const limparCamposPessoaFisica = (): void => {
    setCpf("");
    setNome("");
    setDataNascimento("");
    setGenero("");
    setEstadoCivil("");
    setRg("");
    setErroCpf("");
    setErroNome("");
    setErroDataNascimento("");
    setErroGenero("");
    setErroEstadoCivil("");
    setErroRg("");
  }

  const limparCamposPessoaJuridica = (): void => {
    setRazaoSocial("")
    setCnpj("");
    setDataFundacao("");
    setNomeFantasia("");
    setErroCnpj("");
    setErroDataFundacao("");
    setErroNomeFantasia("");
    setErroRazaoSocial("");
  }

  // consultar o endereço pelo cep
  const consultarEnderecoPeloCep = async () => {
    setErro("");
    console.log(`Consultar endereço pelo CEP ${ cep }`);

    try {
      setCarregando(true);

      const endereco: EnderecoViaCEP | null = await EnderecoConsultasService
        .consultarEnderecoViaCep(cep);

      if (!endereco) {
        // não encontrou o endereço
        setLogradouro("");
        setComplemento("");
        setUf("SP");
        setCidade("");
        setBairro("");
        setNumeroResidencial("");
      } else {
        // encontrou o endereço
        setLogradouro(endereco.logradouro);
        setComplemento(endereco.complemento);
        setUf(endereco.uf);
        setCidade(endereco.localidade);
        setBairro(endereco.bairro);
        setNumeroResidencial("");
      }
      
    } catch (e) {
      console.log("Erro ao tentar-se consultar o endereço pelo CEP: " + e);

      setErro(`Erro ao tentar-se consultar o endereço pelo CEP: ${ e }`);
    } finally {
      setCarregando(false);
    }

  }

  // consultar as cidades da uf selecionada
  const consultarCidades = async (ufSelecionadaID: string) => {
    console.log("Consultar cidades da uf: " + ufSelecionadaID);

    try {
      setCidades([]);
      setCarregando(true);

      const cidades: Array<CidadeApiIBGE> = await EnderecoConsultasService.consultarCidades(ufSelecionadaID);

      setCidades(cidades);
    } catch (e) {
      setErro(`Erro ao tentar-se consultar as cidades: ${ e }`);
    } finally {
      setCarregando(false);
    }

  }

  const onSelecionarCidadeEndereco = (cidade: string): void => {
    setCidade(cidade);
    setErroCidade("");

    if (cidade.trim().length === 0 || cidade === "Cidade") {
      setErroCidade("Selecione a cidade");
    }

  }

  const onSelecionarEstadoEndereco = async (estadoSelecionado: string) => {
    setUf(estadoSelecionado);
    setErroUf("");

    if (estadoSelecionado === "UF") {
      setErroUf("Selecione a Unidade Federativa");
    } else {
      // consultar as cidades da uf selecionada
      console.log("Estado selecionado: " + estadoSelecionado);

      const idEstado: string = estados.find(e => e.sigla === estadoSelecionado)?.id ?? "";

      console.log("ID do estado selecionado: " + idEstado);

      await consultarCidades(idEstado);
    }

  }

  useEffect(() => {

    if (cep.trim().length === 9 && Validador.validarCEP(cep)) {
      consultarEnderecoPeloCep();
    }

  }, [ cep ]);

  useEffect(() => {

    if (tipoPessoa === TipoPessoa.pf) {
      limparCamposPessoaJuridica();
    } else {

      limparCamposPessoaFisica();
    }

  }, [ tipoPessoa ]);

  useEffect(() => {
    buscarClientePeloId();
  }, [ idClienteEditar ]);

  useEffect(() => {
    setBotaoProsseguirAtivo(false);

    if (tipoPessoa === TipoPessoa.pf) {

      if (email != ""
        && telefoneCelular != ""
        && status != ""
        && nome != ""
        && cpf != ""
        && dataNascimento != ""
        && rg != ""
        && genero != ""
        && estadoCivil != ""
        && cep != ""
        && logradouro != ""
        && uf != ""
        && cidade != ""
        && bairro != ""
        && erroEmail === ""
        && erroTelefoneCelular === ""
        && erroTelefoneFixo === ""
        && erroStatus === ""
        && erroNome === ""
        && erroCpf === ""
        && erroDataNascimento === ""
        && erroRg === ""
        && erroGenero === ""
        && erroEstadoCivil === ""
        && erroCep === ""
        && erroLogradouro === ""
        && erroUf === ""
        && erroCidade === ""
        && erroBairro === ""
        && erroNumero === ""
      ) {
        setBotaoProsseguirAtivo(true);
      }

    }

    if (tipoPessoa === TipoPessoa.pj) {

      if (email != ""
        && telefoneCelular != ""
        && status != ""
        && nomeFantasia != ""
        && cnpj != ""
        && dataFundacao != ""
        && razaoSocial != ""
        && cep != ""
        && logradouro != ""
        && uf != ""
        && cidade != ""
        && bairro != ""
        && erroEmail === ""
        && erroTelefoneCelular === ""
        && erroTelefoneFixo === ""
        && erroStatus === ""
        && erroNomeFantasia === ""
        && erroRazaoSocial === ""
        && erroDataFundacao === ""
        && erroCnpj === ""
        && erroCep === ""
        && erroLogradouro === ""
        && erroUf === ""
        && erroCidade === ""
        && erroBairro === ""
        && erroNumero === ""
      ) {
        setBotaoProsseguirAtivo(true);
      }

    }

  }, [
    email,
    telefoneCelular,
    status,
    nome,
    cpf,
    dataNascimento,
    rg,
    genero,
    estadoCivil,
    razaoSocial,
    nomeFantasia,
    cnpj,
    dataFundacao,
    erroEmail,
    erroTelefoneCelular,
    erroTelefoneFixo,
    erroStatus,
    erroNome,
    erroCpf,
    erroDataNascimento,
    erroRg,
    erroGenero,
    erroEstadoCivil,
    erroRazaoSocial,
    erroNomeFantasia,
    erroCnpj,
    erroDataFundacao
  ]);

  useFocusEffect(useCallback(() => {
    consultarEstados();
  }, []));

  return {
    onSelecionarEstadoEndereco,
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
    setIdClienteEditar,
    erroCnpj,
    erroCpf,
    erroNome,
    erroDataNascimento,
    erroGenero,
    erroRg,
    erroEstadoCivil,
    erroNomeFantasia,
    erroRazaoSocial,
    erroDataFundacao,
    erroEmail,
    erroTelefoneCelular,
    erroTelefoneFixo,
    setTipoPessoa,
    onSelecionarEstadoCivil,
    onSelecionarGenero,
    erroStatus,
    onSelecionarStatus,
    opcoesStatusCliente,
    opcoesGenerosCliente,
    estadosCivisOpcoes,
    botaoProsseguirAtivo,
    cep,
    logradouro,
    complemento,
    uf,
    cidade,
    bairro,
    numeroResidencial,
    erroCep,
    erroLogradouro,
    erroUf,
    erroCidade,
    erroBairro,
    erroNumero,
    estados,
    cidades,
    onSelecionarCidadeEndereco,
    erro,
    setErro
  };
}