import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

interface ProgressoFluxoProps {

  cadastroProduto: boolean;
  cadastroCliente: boolean;
  telaAtual: string;

}

// componente que representa o fluxo de telas
const ProgressoFluxo = ({ telaAtual, cadastroProduto, cadastroCliente }: ProgressoFluxoProps) => {

  const FluxoCadastroProduto = (
    <View style={ styles.container }>
      { /** dados básicos do produto */ }
      <View style={ [
        styles.itemFluxo,
        telaAtual === "Dados Básicos" && styles.fluxoAtual
      ] }>
        <Feather name="database" size={ 40 } color="black" />
        <Text style={ styles.titulo }>Dados Básicos</Text>
      </View>
      { /** separador */ }
      <View style={ styles.separador } />
      { /** fotos do produto */ }
      <View style={ [
        styles.itemFluxo,
        telaAtual === "Fotos Produto" && styles.fluxoAtual
      ] }>
        <FontAwesome name="photo" size={ 40 } color="black" />
        <Text style={ styles.titulo }>Fotos do Produto</Text>
      </View>
    </View>
  );

  const FluxoCadastroCliente = (
    <View>
      
    </View>
  );

  return <ScrollView
    horizontal={ true }
    showsHorizontalScrollIndicator={ false }
    style={ { flex: 1 } }>
      { cadastroProduto ? FluxoCadastroProduto : FluxoCadastroCliente }
  </ScrollView>
}

export default ProgressoFluxo;