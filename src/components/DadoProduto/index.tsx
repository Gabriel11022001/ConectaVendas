import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "react-native";
import styles from "./styles";

export enum DadoProdutoEnum {

  codigo,
  marca,
  dataCadastro,
  peso,
  altura,
  largura,
  categoria,
  observacoes,
  garantia

}

type DadoProdutoProps = {

  tipo: DadoProdutoEnum;
  valor: string;

}

// componente representado o dado do produto
const DadoProduto = ({ tipo, valor }: DadoProdutoProps) => {

  const getIcone = () => {

    if (tipo === DadoProdutoEnum.codigo) {

      return <AntDesign name="barcode" size={ 24 } color="#73758F" />;
    }

    if (tipo === DadoProdutoEnum.dataCadastro) {

      return <FontAwesome name="calendar" size={ 24 } color="#73758F" />;
    }

    if (tipo === DadoProdutoEnum.marca || tipo === DadoProdutoEnum.categoria) {
      
      return <AntDesign name="tag" size={ 24 } color="#73758F" />;
    }

    if (tipo === DadoProdutoEnum.garantia) {

      return <Entypo name="calendar" size={ 24 } color="#73758F" />;
    }

    if (tipo === DadoProdutoEnum.peso) {

      return <FontAwesome name="balance-scale" size={ 24 } color="#73758F" />;
    }

    if (tipo === DadoProdutoEnum.largura 
    || tipo === DadoProdutoEnum.altura
    ) {

      return <Entypo name="ruler" size={ 24 } color="#73758F" />;
    }

    if (tipo === DadoProdutoEnum.observacoes) {

      return <AntDesign name="unordered-list" size={ 24 } color="#73758F" />;
    }

  }

  const getTitulo = (): string => {

    if (tipo === DadoProdutoEnum.codigo) {

      return "Código";
    }

    if (tipo === DadoProdutoEnum.dataCadastro) {

      return "Dt.Cadastro";
    }

    if (tipo === DadoProdutoEnum.marca) {

      return "Marca";
    }

    if (tipo === DadoProdutoEnum.garantia) {

      return "Garantia";
    }

    if (tipo === DadoProdutoEnum.largura) {

      return "Largura(cm)";
    }

    if (tipo === DadoProdutoEnum.altura) {

      return "Altura(cm)";
    }

    if (tipo === DadoProdutoEnum.peso) {

      return "Peso(kg)";
    }

    if (tipo === DadoProdutoEnum.categoria) {

      return "Categoria";
    }

    if (tipo === DadoProdutoEnum.observacoes) {

      return "Observações";
    }

    return "";
  }

  const getValorFormatado = (): string => {

    if (tipo === DadoProdutoEnum.observacoes
      && valor.toString().length > 100
    ) {

      return valor
      .toString()
      .slice(0, 100)
      + "...";
    }

    return valor.toString();
  }

  return <View style={ styles.dado }>
    { getIcone() }
    <View style={ styles.containerDado }>
      { /** título */ }
      <Text style={ styles.titulo }>{ getTitulo() }</Text>
      { /** dado */ }
      <Text style={ styles.valorDado }>{ valor ? getValorFormatado() : "Não definido" }</Text>
    </View>
  </View>
}

export default DadoProduto;