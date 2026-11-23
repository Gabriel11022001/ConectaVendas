import { Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { styles } from "./styles";

export type OpcaoSelect = {

  id: string;
  valor: string;
  titulo: string;

}

type SelectProps = {

  placeholder: string;
  valorSelecionado: string;
  opcoes: OpcaoSelect[];
  onSelecionar: (opcaoSelecionada: OpcaoSelect) => void;
  erro: string;

}

// campo de select
const Select = ({
  valorSelecionado,
  opcoes = [],
  onSelecionar,
  placeholder,
  erro
}: SelectProps) => {

  return <View style={ {
    marginVertical: 20
  } }>
    <RNPickerSelect
      style={ {
        viewContainer: {
          width: "90%",
          marginHorizontal: "5%",
          backgroundColor: "#fff",
          borderRadius: 12,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#D1D5DB",
          padding: 5
        }
      } }
      placeholder={ {
        label: placeholder,
        value: placeholder
      } }
      items={ opcoes.map((opcao: OpcaoSelect) => {

        return {
          label: opcao.titulo,
          value: opcao.valor,
          key: opcao.id,
          color: opcao.valor === valorSelecionado ? (process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000") : "#000"
        };
      }) }
      value={ (opcoes.find(op => op.valor === valorSelecionado)?.valor.toString()) ?? "" }
      onValueChange={ (opcaoSelecionada: string) => {
        console.log(`Opção selecionada: ${ opcaoSelecionada }`);
        const opcao: OpcaoSelect | null = opcoes.find(op => op.valor === opcaoSelecionada) ?? null;

        if (!opcao) {
          onSelecionar({
            id: placeholder,
            titulo: placeholder,
            valor: placeholder
          });
        } else {
          onSelecionar(opcao);
        }

      } } />
    { erro && <View style={ styles.containerMsgErro }>
      <Text style={ styles.msgErro }>{ erro }</Text>
    </View> }
  </View>
}

export default Select;