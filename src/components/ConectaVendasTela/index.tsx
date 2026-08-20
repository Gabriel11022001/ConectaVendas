import { SafeAreaView } from "react-native-safe-area-context";

interface ConectaVendasTelaProps {

  children: any;

}

// componente que representa a tela padrão do app
const ConectaVendasTela = ({ children }: ConectaVendasTelaProps) => {

  return <SafeAreaView style={ {
    backgroundColor: "#F8F8FC",
    flex: 1
  } }>
    { children }
  </SafeAreaView>
}

export default ConectaVendasTela;