import FiltroTexto from "@/components/FiltroTexto";
import LoaderListagem from "@/components/LoaderListagem";
import { CategoriaProduto } from "@/types/categoriaProduto";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

// tela de gestão de categorias dos produtos
const CategoriasProduto = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ categorias, setCategorias ] = useState<Array<CategoriaProduto>>([]);
  const [ categoriaFiltro, setCategoriaFiltro ] = useState<string>("");
 
  // loader de carregamento
  const LoaderCarregamento = (
    <LoaderListagem carregando={ carregando } />
  ) 

  // notificação informando que não existem categorias cadastradas
  const NaoExistemCategoriasComponente = (
    <View>
      <Text>Não existem categorias cadastradas na base de dados.</Text>
    </View>
  )

  // filtro de categorias de produto
  const FiltroCategorias = (
    <FiltroTexto
      texto={ categoriaFiltro }
      placeholder="Consultar categoria pelo nome..."
      onFiltrar={ (texto: string) => {
        setCategoriaFiltro(texto);
      } } />
  )

  // filtrar categorias por texto
  const filtrarCategorias = async () => {

    try {
      setCarregando(true);
      console.log("Filtrando categorias...");
      console.log(categoriaFiltro);
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  // listar as categorias
  const listarCategorias = async () => {

    try {
      setCarregando(true);
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  useEffect(() => {

    if (categoriaFiltro.trim().length > 0) {
      filtrarCategorias();
    }

  }, [ categoriaFiltro ]);

  useFocusEffect(useCallback(() => {
    listarCategorias();
  }, []));

  return <FlatList
    data={ categorias }
    keyExtractor={ categoria => categoria.id ?? "" }
    renderItem={ ({ item }) => {

      if (carregando) {

        return null;
      }

      return <View>

      </View>
    } }
    ListHeaderComponent={ carregando ? LoaderCarregamento : FiltroCategorias }
    ListEmptyComponent={ (!carregando) ? NaoExistemCategoriasComponente : null } />
}

export default CategoriasProduto;