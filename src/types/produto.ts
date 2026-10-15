import { CategoriaProduto } from "./categoriaProduto";

type FotoProduto = {

  id?: string;
  base64: string;
  ext: string;
  produtoId?: string;
  posicao?: number;

}

type Produto = {

  id?: string;
  nome: string;
  descricao: string;
  precoVenda: string | number;
  estoque: string | number;
  categoria?: CategoriaProduto;
  peso?: string | number;
  largura?: string | number;
  altura?: string | number;
  marca?: string;
  codigo?: string;
  garantia?: string;
  obervacao?: string;
  dataCadastro?: string;
  fotos?: Array<FotoProduto>;

}

export { FotoProduto, Produto };

