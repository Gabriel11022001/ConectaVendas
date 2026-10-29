enum TipoPessoa {
  pf,
  pj
}

type Endereco = {

  cep: string;
  endereco: string;
  complemento?: string;
  cidade: string;
  estado: string;
  bairro: string;
  numero?: string;

}

interface Cliente {

  id?: string;
  tipoPessoa: TipoPessoa;
  email: string;
  telefoneCelular: string;
  telefoneFixo?: string;
  dataCadastro: string;
  status: string;
  endereco?: Endereco;

}

interface ClientePessoaFisica extends Cliente {

  cpf?: string;
  nome?: string;
  dataNascimento?: string;
  genero?: string;
  rg?: string;
  estadoCivil?: string;

}

interface ClientePessoaJuridica extends Cliente {

  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  dataFundacao?: string;

}

export {
  Cliente,
  ClientePessoaFisica,
  ClientePessoaJuridica,
  Endereco,
  TipoPessoa
};

