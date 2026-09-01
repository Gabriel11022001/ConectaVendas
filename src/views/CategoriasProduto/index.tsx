import CategoriaItem from "@/components/CategoriaItem";
import DialogConfirmar, { TipoDialogConfirmar } from "@/components/DialogConfirmar";
import FiltroTexto from "@/components/FiltroTexto";
import LoaderListagem from "@/components/LoaderListagem";
import { CategoriaService } from "@/services/categoriaService";
import { CategoriaProduto } from "@/types/categoriaProduto";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

// tela de gestão de categorias dos produtos
const CategoriasProduto = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ categorias, setCategorias ] = useState<Array<CategoriaProduto>>([]);
  const [ categoriaFiltro, setCategoriaFiltro ] = useState<string>("");
  const [ apresentarDialogDeletar, setApresentarDialogDeletar ] = useState<boolean>(false);
  const [ idCategoriaDeletar, setIdCategoriaDeletar ] = useState<string>("");
  const [ carregandoDeletar, setCarregandoDeletar ] = useState<boolean>(false);

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
      
      const categoriasLista: Array<CategoriaProduto> = await CategoriaService.filtrar("");

      if (categoriasLista.length === 0) {
        console.log("Não existem categorias cadastradas na base de dados.");
      } else {
        console.log(`Existe um total de ${ categoriasLista.length } categorias cadastradas na base de dados.`);
      }

      setCategorias(categoriasLista);
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  // redirecionar para e tela de editar categoria
  const redirecionarTelaEditarCategoria = (idCategoriaEditar: string) => {
    navigation.navigate("cadastro_categoria", { idCategoriaEditar: idCategoriaEditar })
  }

  // deletar categoria
  const deletarCategoria = async (idCategoriaDeletar: string) => {
    setApresentarDialogDeletar(true);
    setIdCategoriaDeletar(idCategoriaDeletar);
  }

  // deletar categoria na base de dados
  const deletar = async () => {

    try {
      setCarregandoDeletar(true);

      console.log(`Deletar categoria de id: ${ idCategoriaDeletar }`);
      
      await CategoriaService.deletar(idCategoriaDeletar);

      setIdCategoriaDeletar("");
      setApresentarDialogDeletar(false);

      // apresentar alerta de sucesso para o usuário e listar as categorias novamente
      await listarCategorias();
    } catch (e) {
      console.log(`Erro ao tentar-se deletar a categoria: ${ e }`);
    } finally {
      setCarregandoDeletar(false);
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

  return <View style={ { flex: 1 } }>
    { /** lista de categorias */ }
    <FlatList
      data={ categorias }
      keyExtractor={ cat => cat.id ?? "" }
      renderItem={ ({ item }) => {

        if (carregando) {

          return null;
        }

        return <CategoriaItem
          categoria={ item }
          onClickEditarCategoria={ () => {
            redirecionarTelaEditarCategoria(item.id ?? "");
          } }
          onClickDeletarCategoria={ () => {
            deletarCategoria(item.id ?? "");
          } } />
      } }
      ListHeaderComponent={ carregando ? LoaderCarregamento : FiltroCategorias }
      ListEmptyComponent={ (!carregando) ? NaoExistemCategoriasComponente : null } />
    { /** dialog para confirmar a deleçõa da categoria */ }
    <DialogConfirmar
      apresentar={ apresentarDialogDeletar }
      carregando={ carregandoDeletar }
      tipo={ TipoDialogConfirmar.deletar }
      msg="Deseja mesmo deletar a categoria de produto na base de dados?"
      onClickFechar={ () => {
        setApresentarDialogDeletar(false);
        setCarregandoDeletar(false);
        setIdCategoriaDeletar("");
      } }
      onClickConfirmar={ () => {
        // confirmar deleção da categoria
        deletar();
      } } />
  </View>
}

export default CategoriasProduto;