import { CategoriaProduto } from "@/types/categoriaProduto";
import { FiltroProdutos } from "@/types/filtroProdutos";
import { FotoProduto, Produto } from "@/types/produto";
import { getDataHoraAtual } from "@/utils/getDataHoraAtual";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { CategoriaService } from "./categoriaService";

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

// deletar o produto/fotos
const deletar = async (id: string) => {

  try {
    console.log("Deletando o produto de id: " + id);

    const fotos: Array<FotoProduto> = await buscarFotosProduto(id);

    if (fotos.length > 0) {

      for (const fotoDeletar of fotos) {
        // deletar foto por foto
        await deleteDoc(
          doc(db, "tb_fotos_produtos", fotoDeletar.id ?? "")
        );

        console.log("foto de id " + (fotoDeletar.id ?? "") + " deletada com sucesso da base!");
      }

    }

    // deletar o produto
    await deleteDoc(doc(db, "tb_produtos", id));

    console.log("Produto de id " + id + " deletado com sucesso!");
  } catch (e) {
    console.log(`Erro ao tentar-se deletar o produto: ${ e }`);

    throw e;
  }

}

// salvar produto(cadastrar/editar)
const salvar = async (produto: Produto) => {
  let idProdCadastrado: string = "";

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
      idProdCadastrado = idProduto;

      if (idProduto) {
        // cadastrar as fotos do produto

        await cadastrarFotos(produto.fotos ?? [], idProduto);
      }

    }

  } catch (e) {
    console.log(`Erro ao tentar-se salvar o produto na base de dados: ${ e }`);

    /**
     * se ocorrer algum erro no cadastro do produto, deletar o mesmo
     * da base para garantir que não vai ficar lixo na base
     */
    if (idProdCadastrado != "") {
      await deletar(idProdCadastrado);
    }

    throw e;
  }

}

// filtrar os produtos
const filtrarProdutos = async (filtro?: FiltroProdutos) => {

  try {
    const produtosRef = collection(db, 'tb_produtos');
    
    const docs = await getDocs(produtosRef);

    if (docs.empty) {

      return [];
    }

    const produtos: Array<Produto> = [];

    docs.forEach((prod) => {
      produtos.push({
        id: prod.id ?? "",
        nome: prod.data().nome ?? "",
        precoVenda: prod.data().preco ?? 0,
        descricao: prod.data().descricao ?? "",
        estoque: prod.data().estoque ?? 0,
        codigo: prod.data().codigo ?? "",
        dataCadastro: prod.data().data_cadastro ?? "",
        altura: prod.data().altura ?? "",
        largura: prod.data().largura ?? "",
        peso: prod.data().peso ?? "",
        garantia: prod.data().garantia ?? "",
        marca: prod.data().marca ?? "",
        obervacao: prod.data().observacao ?? "",
        categoria: {
          id: prod.data().categoriaId,
          nome: "",
          cor: "",
          icone: "",
          descricao: ""
        }
      });
    });

    const fotosRef = collection(db, "tb_fotos_produtos");

    const fotosDocs = await getDocs(fotosRef);

    if (!fotosDocs.empty) {
      const todasFotos:Array<FotoProduto> = [];

      fotosDocs.forEach((foto) => {
        todasFotos.push({
          base64: foto.data().base64 ?? "",
          ext: foto.data().ext ?? "",
          produtoId: foto.data().produtoId ?? "",
          id: foto.id ?? ""
        });
      });

      for (const prod of produtos) {
        prod.fotos = todasFotos.filter(f => f.produtoId === prod.id);
      }

    }
    
    // buscar categorias dos produtos
    for (const prod of produtos) {
      const categoria: CategoriaProduto | null = await CategoriaService.buscarPeloId(prod.categoria?.id ?? "");

      if (categoria) {
        prod.categoria = categoria;
      }

    }

    if (!filtro) {
      // listar todos os produtos

      return produtos;
    } else {
      // filtrar

      return [];
    }

  } catch (e) {
    console.log(`Erro ao tentar-se filtrar os produtos: ${ e }`);

    throw e;
  }

}

// consultar as fotos do produto
const buscarFotosProduto = async (idProduto: string) => {

  return [];
}

// buscar o produto pelo id
const buscarPeloId = async (id: string) => {

  try {
    const produtoRef = doc(db, "tb_produtos", id);

    const produtoSnapshot = await getDoc(produtoRef);

    if (!produtoSnapshot.exists()) {
      console.log(`Produto de id ${ id } não encontrado.`);

      return null;
    }

    // buscar as fotos do produto
    const fotosProduto: Array<FotoProduto> = 
      await buscarFotosProduto(produtoSnapshot.id ?? "");

    // buscar categoria do produto
    const categoria: CategoriaProduto | null = await CategoriaService.buscarPeloId(produtoSnapshot.data().categoriaId);

    const produto: Produto = {
      id: produtoSnapshot.id ?? "",
      nome: produtoSnapshot.data().nome,
      precoVenda: produtoSnapshot.data().preco,
      descricao: produtoSnapshot.data().descricao,
      estoque: produtoSnapshot.data().estoque,
      fotos: fotosProduto,
      categoria: categoria ?? undefined,
      altura: produtoSnapshot.data().altura ?? "",
      codigo: produtoSnapshot.data().codigo ?? "",
      dataCadastro: produtoSnapshot.data().data_cadastro ?? "",
      garantia: produtoSnapshot.data().garantia ?? "",
      largura: produtoSnapshot.data().largura ?? "",
      marca: produtoSnapshot.data().marca ?? "",
      obervacao: produtoSnapshot.data().observacao ?? "",
      peso: produtoSnapshot.data().peso ?? ""
    }

    return produto;
  } catch (e) {

    throw e;
  }

}

const ProdutoService = {
  buscarPeloNome,
  salvar,
  filtrarProdutos,
  buscarPeloId
};

export { ProdutoService };

