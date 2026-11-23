import { TipoPessoa } from "@/types/cliente";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface SelecionarTipoPessoaProps {

  tipoPessoaSelecionada: TipoPessoa;
  onSelecionarTipoPessoa: (tipoPessoa: TipoPessoa) => void;

}

// componente para selecionar o tipo de pessoa
const SelecionarTipoPessoa = ({
  tipoPessoaSelecionada,
  onSelecionarTipoPessoa
}: SelecionarTipoPessoaProps) => {

  return <View style={ styles.container }>
    { /** pessoa física */ }
    <View
      style={ styles.opcao }>
        <Text style={ styles.txtOpcao }>Pessoa Física</Text>
        <Pressable style={ [
          styles.opcao,
          styles.radio,
          tipoPessoaSelecionada === TipoPessoa.pf && styles.radioSelecionado
        ] }
        onPress={ () => {
          onSelecionarTipoPessoa(TipoPessoa.pf);
        } }>
          { tipoPessoaSelecionada === TipoPessoa.pf && <AntDesign name="check" size={ 24 } color="#fff" /> }
        </Pressable>
    </View>
    { /** pessoa juridica */ }
    <View
      style={ styles.opcao }>
        <Text style={ styles.txtOpcao }>Pessoa Juridica</Text>
        <Pressable style={ [
          styles.opcao,
          styles.radio,
          tipoPessoaSelecionada === TipoPessoa.pj && styles.radioSelecionado
        ] }
        onPress={ () => {
          onSelecionarTipoPessoa(TipoPessoa.pj);
        } }>
          { tipoPessoaSelecionada === TipoPessoa.pj && <AntDesign name="check" size={ 24 } color="#fff" /> }
        </Pressable>
    </View>
  </View>
}

export default SelecionarTipoPessoa;