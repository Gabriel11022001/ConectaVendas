import { ConectaVendasContext } from "@/Provider";
import { useContext } from "react";

const useFluxoCadastroProduto = () => {

  const contexto = useContext(ConectaVendasContext);

  if (!contexto) {

    throw new Error("Erro ao tentar-se carregar o contexto do fluxo de cadastro de produto!");
  }

  return contexto;
}

export { useFluxoCadastroProduto };

