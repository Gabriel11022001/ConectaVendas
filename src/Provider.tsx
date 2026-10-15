import { createContext, ReactNode, useState } from "react";
import { CategoriaProduto } from "./types/categoriaProduto";
import { Produto } from "./types/produto";

// contexto do app
export type ConectaVendasContexto = {

  // fluxo de cadastro de produto
  categoriaSelecionadaFluxoVenda: CategoriaProduto | null;
  produtoFluxoCadastro: Produto | null;

  atualizarDadosProdutoFluxoCadastro: (produtoAtualizado: Produto) => void;
  selecionarCategoriaProduto: (categoria: CategoriaProduto) => void;
  limparFluxoCadastroProduto: () => void;

}

export type ConectaVendasProviderProps = {

  children: ReactNode;

}

const ConectaVendasContext = createContext<ConectaVendasContexto | undefined>(
  undefined
);

// provider
const ConectaVendasProvider = ({ children }: ConectaVendasProviderProps) => {

  const [ categoriaSelecionadaFluxoVenda, setCategoriaSelecionadaFluxoVenda ] = useState<CategoriaProduto | null>(null);
  const [ produtoFluxoCadastro, setProdutoFluxoCadastro ] = useState<Produto | null>(null);

  // selecionar a categoria do produto
  const selecionarCategoriaProduto = (categoria: CategoriaProduto): void => {
    setCategoriaSelecionadaFluxoVenda(categoria);
  }
  
  // atualizar os dados do produto no fluxo de cadastro de produto
  const atualizarDadosProdutoFluxoCadastro = (prod: Produto): void => {
    setProdutoFluxoCadastro(prod);
  }

  // limpar o fluxo de cadastro de produto
  const limparFluxoCadastroProduto = (): void => {
    setCategoriaSelecionadaFluxoVenda(null);
    setProdutoFluxoCadastro(null);
  }

  return (
    <ConectaVendasContext.Provider
      value={ {
        categoriaSelecionadaFluxoVenda,
        selecionarCategoriaProduto,
        produtoFluxoCadastro,
        atualizarDadosProdutoFluxoCadastro,
        limparFluxoCadastroProduto
      } }>
      { children }
    </ConectaVendasContext.Provider>
  );
}

export { ConectaVendasContext, ConectaVendasProvider };

