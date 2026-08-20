import ConectaVendasTela from "@/components/ConectaVendasTela";
import MenuGerenciarHome, { HomeOpcao } from "@/components/MenuGerenciarHome";
import ResumoHojeBotao from "@/components/ResumoHojeBotao";
import TopoHome from "@/components/TopoHome";
import { useAuth } from "@/hooks/useAuth";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";

// tela home do app
const Home = ({ navigation }: any) => {

  const { getUsuarioLogado } = useAuth(navigation);
  const [ opcoes, setOpcoes ] = useState<Array<HomeOpcao>>([]);

  const carregarOpcoesMenuUsuario = () => {
    const opcoes: Array<HomeOpcao> = [];

    opcoes.push({
      titulo: "Clientes",
      subtitulo: "Gerencies seus clientes, contatos e informações.",
      icone: <Octicons name="person" size={ 30 } color="#fff" />,
      onRedirecionar: () => {
        // redirecionar o usuário para a tela de gestão de clientes
      },
      cor: "#e74c3c"
    });

    opcoes.push({
      titulo: "Produtos",
      subtitulo: "Cadastre e gerencie seus produtos e serviços.",
      icone: <Feather name="shopping-bag" size={ 30 } color="#fff" />,
      onRedirecionar: () => {
        // redirecionar o usuário para a tela de gestão de produtos
      },
      cor: "#3498db"
    });

    opcoes.push({
      titulo: "Categorias de Produto",
      subtitulo: "Oreganize seus produtos por categoria.",
      icone: <Ionicons name="pricetags-outline" size={ 30 } color="#fff" />,
      onRedirecionar: () => {
        // redirecionar o usuário para a tela de gestão de categorias de produtos
        navigation.navigate("categorias");
      },
      cor: "#2bcbba"
    });

    opcoes.push({
      titulo: "Perfil",
      subtitulo: "Visualize e edite seus dados pessoais.",
      icone: <Ionicons name="person-circle-outline" size={ 30 } color="#fff" />,
      onRedirecionar: () => {
        // redirecionar o usuário para a tela de gestão de perfil
      },
      cor: "#fa8231"
    });

    opcoes.push({
      titulo: "Configurações",
      subtitulo: "Ajuste preferências do app, segurança e notificações.",
      icone: <Octicons name="tools" size={ 30 } color="#fff" />,
      onRedirecionar: () => {
        // redirecionar o usuário para a tela de configurações do app
      },
      cor: "#7158e2"
    });

    setOpcoes(opcoes);
  }

  useFocusEffect(useCallback(() => {
    carregarOpcoesMenuUsuario();
  }, []));

  return <ConectaVendasTela>
    <ScrollView showsHorizontalScrollIndicator={ false }>
      <TopoHome
        nomeUsuarioLogado="Gabriel Rodrigues"
        quantidadeNotificacoes={ 10 }
        onClickNotificacoes={ () => {
          // redirecionar o usuário para a tela de notificações
        } }
        onClickVoltar={ () => {
          // voltar
        } } />
      <ResumoHojeBotao onRedirecionar={ () => {
        // redirecionar o usuário para a tela de resumo de hoje
      } } />
      { /** menu de opções da tela home */ }
      <MenuGerenciarHome
        opcoes={ opcoes } />
    </ScrollView>
  </ConectaVendasTela>
}

export default Home;