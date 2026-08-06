import { SafeAreaView } from "react-native-safe-area-context";

interface ConectaVendasTelaProps {

  children: any;

}

// componente que representa a tela padrão do app
const ConectaVendasTela = ({ children }: ConectaVendasTelaProps) => {

  return <SafeAreaView style={ {
    backgroundColor: "#fff",
    flex: 1
  } }>
    { children }
  </SafeAreaView>
}

export default ConectaVendasTela;