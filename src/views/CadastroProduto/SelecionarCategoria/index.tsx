import CategoriaSelecionarItem from "@/components/CategoriaSelecionarItem";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import LoaderListagem from "@/components/LoaderListagem";
import TituloTela from "@/components/TituloTela";
import { useFluxoCadastroProduto } from "@/hooks/useFluxoCadastroProduto";
import { CategoriaService } from "@/services/categoriaService";
import { CategoriaProduto } from "@/types/categoriaProduto";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

// tela para selecionar a categoria do produto
const SelecionarCategoria = ({ navigation }: any) => {

  const { selecionarCategoriaProduto, categoriaSelecionadaFluxoVenda } = useFluxoCadastroProduto();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ categorias, setCategorias ] = useState<Array<CategoriaProduto>>([]);

  // listar as categorias
  const listarCategorias = async () => {

    try {
      setCarregando(true);

      const categorias: CategoriaProduto[] = await CategoriaService.filtrar("");
      
      setCategorias(categorias);
    } catch (e) {
      // apresentar alerta de erro para o usuário
    } finally {
      setCarregando(false);
    }

  }

  // selecionar categoria do produto
  const selecionarCategoria = (categoria: CategoriaProduto) => {
    selecionarCategoriaProduto(categoria);

    navigation.goBack();
  }

  useFocusEffect(useCallback(() => {
    listarCategorias();
  }, []));

  return <ConectaVendasTela>
    <FlatList
      data={ categorias }
      keyExtractor={ categoria => categoria.id ?? "" }
      renderItem={ ({ item }) => {
        const { id } = { ...item };

        if (carregando) {

          return null;
        }

        return <CategoriaSelecionarItem
          categoria={ {
            categoria: item,
            selecionada: id === categoriaSelecionadaFluxoVenda?.id 
          } }
          onSelecionarCategoria={ () => {
            selecionarCategoria(item);
          } } />
      } }
      ListHeaderComponent={ () => {

        return carregando ? <LoaderListagem carregando={ carregando } /> : <TituloTela 
          titulo="Selecionar Categoria" 
          subtitulo="Selecione abaixo a categoria do produto." />        
      } } />
  </ConectaVendasTela>
}

export default SelecionarCategoria;