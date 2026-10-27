import { ProdutoService } from "@/services/produtoService";
import { FiltroProdutos } from "@/types/filtroProdutos";
import { Produto } from "@/types/produto";
import { useState } from "react";

const useListagemProdutos = () => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ produtos, setProdutos ] = useState<Array<Produto>>([]);
  const [ filtro, setFiltro ] = useState<FiltroProdutos | null>(null);

  // aplicar filtro dos produtos
  const aplicarFiltro = async (
    nome?: string,
    precoInicial?: number,
    precoFinal?: number,
    categoria?: string
  ) => {

  }

  // listar os produtos cadastrados na base de dados
  const listar = async () => {

    try {
      setCarregando(true);
      setProdutos([]);

      if (!filtro) {
        // listar todos
        const todosProdutos: Array<Produto> = await ProdutoService.filtrarProdutos();

        console.log(todosProdutos);

        setProdutos(todosProdutos);
      } else {
        // filtrar
        const produtosFiltrados: Array<Produto> = await ProdutoService.filtrarProdutos(filtro);

        console.log(produtosFiltrados);

        setProdutos(produtosFiltrados);
      }

    } catch (e) {

      throw e;
    } finally {
      setCarregando(false);
    }

  }

  return {
    carregando,
    produtos,
    listar,
    aplicarFiltro
  };
}

export { useListagemProdutos };

