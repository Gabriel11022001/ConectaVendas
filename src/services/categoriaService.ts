import { CategoriaProduto } from "@/types/categoriaProduto";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// cadastrar categoria
const cadastrar = async (categoria: CategoriaProduto) => {

  try {
    const categoriaRef = collection(db, 'tb_categorias');
    
    const documento = await addDoc(categoriaRef, categoria);
    
    console.log("Categoria cadastrada com sucesso!");

    return {
      id: documento.id ?? "",
      ...categoria
    };
  } catch (e) {

    throw e;
  }

}

// editar categoria
const editar = async (categoria: CategoriaProduto) => {

  try {

    if (!categoria.id) {

      throw new Error("ID da categoria não informado.");
    }

    const categoriaRef = doc(db, "tb_categorias", categoria.id);

    const { id, ...dadosCategoria } = categoria;

    await updateDoc(categoriaRef, dadosCategoria);

    console.log("Categoria editada com sucesso!");

    return categoria;
  } catch (e) {
    console.log(`Erro ao tentar-se editar a categoria na base de dados: ${ e }`);

    throw e;

  }

}

// buscar categoria pelo nome
const buscarPeloNome = async (nomeCategoria: string) => {

  try {
    const categoriasRef = collection(db, 'tb_categorias');

    const consulta = query(
      categoriasRef,
      where('nome', '==', nomeCategoria)
    );

    const snapshot = await getDocs(consulta);

    if (snapshot.empty) {
      console.log(`Não foi encontrada uma categoria com o nome ${ nomeCategoria }`);

      return null;
    }

    const documento = snapshot.docs[0];

    const categoria: CategoriaProduto = {
      id: documento.id ?? "",
      nome: documento.data().nome,
      cor: documento.data().cor,
      icone: documento.data().icone,
      descricao: documento.data().descricao
    }

    return categoria;
  } catch (e) {

    throw e;
  }

}

// deletar categoria
const deletar = async (id: string) => {

  try {
    console.log(`Deletando a categoria de id ${ id } no servidor...`)

    const categoriaRef = doc(db, "tb_categorias", id);

    await deleteDoc(categoriaRef);

    console.log("Categoria deletada com sucesso.");
  } catch (e) {
    console.log(`Erro ao tentar-se deletar a categoria: ${ e }`);

    throw e;
  }

}

// buscar categoria pelo id
const buscarPeloId = async (id: string): Promise<CategoriaProduto | null> => {

  try {
    console.log(`Buscando categoria de id ${ id } no Firestore...`);

    const categoriaRef = doc(db, "tb_categorias", id);

    const categoriaSnapshot = await getDoc(categoriaRef);

    if (!categoriaSnapshot.exists()) {
      console.log(`Categoria de id ${ id } não encontrada.`);

      return null;
    }

    const categoria: CategoriaProduto = {
      id: categoriaSnapshot.id,
      ...categoriaSnapshot.data() as Omit<CategoriaProduto, "id">
    }

    console.log("Categoria encontrada: ", categoria);

    return categoria;
  } catch (e) {

    throw e;
  }

}

// filtrar categorias
const filtrar =  async (filtro: string) => {

  try {
    console.log("Filtrando as categoria: " + filtro);
    const categorias: Array<CategoriaProduto> = [];

    const categoriasRef = collection(db, 'tb_categorias');

    const docs = await getDocs(categoriasRef);

    if (!docs.empty) {
      
      docs.forEach((doc) => {
        const nome: string = doc.data().nome;

        if (nome.includes(filtro)) {
          categorias.push({
            id: doc.id ?? "",
            nome: doc.data().nome,
            cor: doc.data().cor,
            icone: doc.data().icone,
            descricao: doc.data().descricao
          });
        }

      });

    }

    return categorias;
  } catch (e) {
    
    throw e;
  }

}

const CategoriaService = {
  cadastrar,
  editar,
  buscarPeloNome,
  deletar,
  buscarPeloId,
  filtrar
};

export { CategoriaService };

