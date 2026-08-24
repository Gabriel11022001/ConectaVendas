import { View } from "react-native";

interface CampoSelecionarIconeCategoriaProps {

  iconeSelecionado: string;
  onSelecionar: (iconeSelecionar: string) => void;
  icones: Array<{ fonte: string, icone: string }>;

}

// campo para o usuário selecionar o ícone da categoria
const CampoSelecionarIconeCategoria = ({ iconeSelecionado, onSelecionar, icones }: CampoSelecionarIconeCategoriaProps) => {

  return <View>

  </View>
}

export default CampoSelecionarIconeCategoria;