import ConectaVendasTela from "@/components/ConectaVendasTela";
import Loader from "@/components/Loader";
import useCadastroCliente from "@/hooks/useCadastroCliente";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView } from "react-native";

// tela de cadastro de cliente
export default function CadastroCliente({
  navigation,
  route
}: any) {

  const {
    carregando,
    onDigitar,
    tipoPessoa,
    telefoneCelular,
    telefoneFixo,
    email,
    status,
    cpf,
    nome,
    dataNascimento,
    estadoCivil,
    genero,
    rg,
    buscarClientePeloId,
    salvar,
    idClienteEditar,
    setIdClienteEditar
  } = useCadastroCliente();

  useFocusEffect(useCallback(() => {

    if (route.params && route.params.idClienteEditar) {
      setIdClienteEditar(route.params.idClienteEditar ?? "");
    }

  }, [ route ]));

  return <ConectaVendasTela>
    { /** loader de carregamento da tela */ }
    <Loader carregando={ carregando } />
    <ScrollView showsHorizontalScrollIndicator={ false }>

    </ScrollView>
  </ConectaVendasTela>
}