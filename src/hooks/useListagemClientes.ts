import { ClientePessoaFisica, ClientePessoaJuridica } from "@/types/cliente";
import { useState } from "react";

const useListagemClientes = () => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ clientes, setClientes ] = useState<Array<ClientePessoaFisica | ClientePessoaJuridica>>([]);

  return {
    carregando,
    clientes
  };
}

export { useListagemClientes };

