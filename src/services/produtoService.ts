import { FotoProduto, Produto } from "@/types/produto";
import { getDataHoraAtual } from "@/utils/getDataHoraAtual";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// buscar produto pelo nome
const buscarPeloNome = async (nome: string) => {

  return null;
}

// cadastrar as fotos do produto
const cadastrarFotos = async (fotos: FotoProduto[], idProduto: string) => {

  if (fotos.length > 0) {

    try {

      for (var foto of fotos) {
        const fotoRef = await collection(db, "tb_fotos_produtos");

        await addDoc(fotoRef, {
          base64: foto.base64,
          ext: foto.ext,
          produtoId: idProduto
        });

        console.log("Foto cadastrada com sucesso na base de dados: " + foto.base64);
      }

    } catch (e) {
      console.log("Erro ao tentar-se cadastrar as fotos: " + e);

      throw e;
    }

  }

}

// salvar produto(cadastrar/editar)
const salvar = async (produto: Produto) => {

  try {
    
    if (produto.id) {
      // editar o produto na base de dados
    } else {
      // cadastrar o produto na base de dados
      console.log("Cadastrar o produto na base de dados", produto);
      
      const produtoCadastrarRef = collection(db, 'tb_produtos');
          
      const documento = await addDoc(produtoCadastrarRef, {
        nome: produto.nome,
        preco: produto.precoVenda,
        descricao: produto.descricao,
        status: true,
        categoriaId: produto.categoria?.id ?? "",
        estoque: produto.estoque,
        peso: produto.peso ?? "",
        altura: produto.altura ?? "",
        largura: produto.largura ?? "",
        marca: produto.marca ?? "",
        codigo: produto.codigo ?? "",
        garantia: produto.garantia ?? "",
        observacao: produto.obervacao ?? "",
        data_cadastro: getDataHoraAtual()
      });

      const idProduto: string = documento.id ?? "";

      if (idProduto) {
        // cadastrar as fotos do produto

        await cadastrarFotos(produto.fotos ?? [], idProduto);
      }

    }

  } catch (e) {
    console.log(`Erro ao tentar-se salvar o produto na base de dados: ${ e }`);

    throw e;
  }

}

const ProdutoService = {
  buscarPeloNome,
  salvar
};

export { ProdutoService };

