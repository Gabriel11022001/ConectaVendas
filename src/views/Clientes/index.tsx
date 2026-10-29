import LoaderListagem from "@/components/LoaderListagem";
import TituloTela from "@/components/TituloTela";
import { useListagemClientes } from "@/hooks/useListagemClientes";
import { FlatList, View } from "react-native";

// tela com a listagem de clientes
const Clientes = ({ navigation }: any) => {

  const {
    carregando,
    clientes
  } = useListagemClientes();

  const HeaderTelaListagemClientes = (
    <View>
      { /** título da tela */ }
      <TituloTela
        titulo="Clientes"
        subtitulo="Gerenciar seus clientes, contatos e informações." />
      { /** loader de carregamento */ }
      { carregando && <LoaderListagem carregando={ true } /> }
    </View>
  );

  return (
    <FlatList
      data={ clientes }
      keyExtractor={ cliente => cliente.id ?? "" }
      renderItem={ ({ item, index }) => {

        if (carregando) {

          return null;
        }

        return null;
      } }
      ListHeaderComponent={ HeaderTelaListagemClientes } />
  );
}

export default Clientes;