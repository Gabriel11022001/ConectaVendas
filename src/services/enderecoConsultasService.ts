import { CidadeApiIBGE, EstadoApiIBGE } from "@/hooks/useCadastroCliente";

export type EnderecoViaCEP = {

  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;

};

// consultar o endereço pela api do VIA CEP
const consultarEnderecoViaCep = async (cep: string): Promise<EnderecoViaCEP | null> => {

  try {
    const numeros = cep.replace(/\D/g, "");

    const resposta = await fetch(`${ process.env.EXPO_PUBLIC_URL_VIA_CEP }/${ numeros }/json/`);

    if (!resposta.ok) {

      return null;
    }

    const endereco = await resposta.json();

    if (endereco.erro) {

      return null;
    }

    return endereco as EnderecoViaCEP;
  } catch (e) {

    throw e;
  }
  
}

// consultar estados
const consultarEstados = async () => {

  try {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

    if (!response.ok) {

      return [];
    }

    const estados = await response.json();

    if (estados.erro) {

      return [];
    }

    return estados as Array<EstadoApiIBGE>;
  } catch (e) {

    throw e;
  }

}

const consultarCidades = async (idEstado: string): Promise<Array<CidadeApiIBGE>> => {

  try {
    const resp = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ idEstado }/municipios`);

    if (!resp.ok) {

      return [];
    }

    const cidades = await resp.json();

    if (cidades.erro) {

      return [];
    }

    return cidades as CidadeApiIBGE[];
  } catch (e) {

    throw e;
  }

}

const EnderecoConsultasService = {

  consultarEnderecoViaCep,
  consultarEstados,
  consultarCidades

};

export { EnderecoConsultasService };

