import LoaderListagem from "@/components/LoaderListagem";
import ProdutoItem from "@/components/ProdutoItem";
import TituloTela from "@/components/TituloTela";
import { useListagemProdutos } from "@/hooks/useListagemProdutos";
import { FotoProduto } from "@/types/produto";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

// tela de listagem de produtos
const Produtos = ({ navigation }: any) => {

  const {
    carregando,
    produtos,
    listar,
    aplicarFiltro
  } = useListagemProdutos();

  const [ fotosVisualizar, setFotosVisualizar ] = useState<Array<FotoProduto>>([]);

  const HeaderTelaListagemProdutos = (
    <View>
      { /** título da tela */ }
      <TituloTela
        titulo="Produtos"
        subtitulo="Gerenciar produtos cadastrados." />
      { /** loader de carregamento */ }
      { carregando && <LoaderListagem carregando={ true } /> }
    </View>
  );

  // listar os produtos 
  const listarProdutos = async () => {

    try {
      await listar();
    } catch (e) {
      console.log("Erro ao tentar-se listar os produtos: " + e);
    }

  }

  // visualizar dados do produto
  const visualizarProduto = (produtoId: string): void => {
    navigation.navigate("cadastro_produto", { produtoId: produtoId });
  }

  // visualizar fotos do produto
  const visualizarFotos = (fotos: Array<FotoProduto>): void => {
    console.log("Visualizar fotos:", fotos);

    setFotosVisualizar(fotos);
  }

  useFocusEffect(useCallback(() => {
    setFotosVisualizar([]);
    listarProdutos();
  }, []));

  return (
    <FlatList
      data={ produtos }
      keyExtractor={ p => p.id ?? "" }
      renderItem={ ({ item, index }) => {

        if (carregando) {

          return null;
        }

        return (
          <ProdutoItem
            produto={ item }
            onVisualizar={ () => {
              visualizarProduto(item.id ?? "");
            } }
            utlimo={ index === produtos.length - 1 }
            onVisualizarFotos={ () => {
              visualizarFotos(item.fotos ?? []);
            } } />
        );
      } }
      ListHeaderComponent={ HeaderTelaListagemProdutos } />
  );
}

export default Produtos;