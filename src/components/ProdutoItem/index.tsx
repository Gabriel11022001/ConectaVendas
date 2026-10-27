import { Produto } from "@/types/produto";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, Pressable, Text, View } from "react-native";
import DadoProduto, { DadoProdutoEnum } from "../DadoProduto";
import { styles } from "./styles";

interface ProdutoItemProps {

  produto: Produto;
  onVisualizar: () => void;
  utlimo: boolean;
  onVisualizarFotos: () => void;

}

// componente que representa um produto na listagem de produtos
const ProdutoItem = ({
  produto,
  onVisualizar,
  utlimo,
  onVisualizarFotos
}: ProdutoItemProps) => {

  const {
    nome,
    descricao,
    estoque,
    precoVenda,
    fotos,
    marca,
    codigo,
    dataCadastro,
    altura,
    categoria,
    garantia,
    largura,
    obervacao,
    peso
  } = { ...produto };

  if (!fotos) {

    return null;
  }

  const { base64, ext } = fotos[ 0 ];
  
  return <Pressable
    style={ [
      styles.item,
      utlimo && { marginBottom: 100 }
    ] }
    onPress={ onVisualizar }>
      <View style={ styles.containerTopo }>
        { /** foto do produto */ }
        <View style={ styles.containerFoto }>
          <Image
            style={ styles.foto }
            source={ {
              uri: `data:${ ext };base64,${ base64 }`
            } } />
        </View>
        { /** dados básicos do produto */ }
        <View style={ styles.containerDadosBasicosProduto }>
          { /** nome do produto */ }
          <Text style={ styles.nomeProduto }>{ nome }</Text>
          { /** descrição do produto */ }
          <Text style={ styles.descricaoProduto }>{ descricao.length < 100 ? descricao : (descricao.slice(0, 100) + "...") }</Text>
          { /** preço de venda do produto */ }
          <Text style={ styles.preco }>{ precoVenda }</Text>
          { /** estoque do produto */ }
          <View style={ styles.containerEstoque }>
            <Feather name="box" size={ 24 } color={ parseInt(estoque.toString() ?? 0) <= 0 ? "red" : "green" } />
            <Text style={ styles.estoque }>Estoque: { estoque }</Text>
          </View>
        </View>
        <View>
          <MaterialIcons name="arrow-forward-ios" size={ 30 } color="#73758F" />
        </View>
      </View>
      { /** separador */ }
      <View style={ styles.separador } />
      <View style={ styles.containerDemaisDados }>
        { /** código e data de cadastro do produto */ }
        <View style={ styles.containerDadoProdutoLinha }>
          <DadoProduto tipo={ DadoProdutoEnum.codigo } valor={ codigo ?? "" } />
          <DadoProduto tipo={ DadoProdutoEnum.dataCadastro } valor={ dataCadastro ?? "" } />
        </View>
        { /** marca e garantia */ }
        <View style={ styles.containerDadoProdutoLinha }>
          <DadoProduto tipo={ DadoProdutoEnum.marca } valor={ marca ?? "" } />
          <DadoProduto tipo={ DadoProdutoEnum.garantia } valor={ garantia ?? "" } />
        </View>
        { /** peso e altura */ }
        <View style={ styles.containerDadoProdutoLinha }>
          <DadoProduto tipo={ DadoProdutoEnum.peso } valor={ peso?.toString() ?? "" } />
          <DadoProduto tipo={ DadoProdutoEnum.altura } valor={ altura?.toString() ?? "" } />
        </View>
        { /** largura e categoria */ }
        <View style={ styles.containerDadoProdutoLinha }>
          <DadoProduto tipo={ DadoProdutoEnum.largura } valor={ largura?.toString() ?? "" } />
          <DadoProduto tipo={ DadoProdutoEnum.categoria } valor={ categoria?.nome?.toString() ?? "" } />
        </View>
        { /** observaçoes */ }
        <View style={ styles.containerDadoProdutoLinha }>
          <DadoProduto tipo={ DadoProdutoEnum.observacoes } valor={ obervacao ?? "" } />
        </View>
      </View>
      { /** separador */ }
      <View style={ styles.separador } />
      { /** botão para visualizar fotos do produto */ }
      <Pressable
        onPress={ onVisualizarFotos }
        style={ styles.btnVisualizarFotos }>
        <Text style={ styles.txtVisualizarFotos }>Visualizar fotos</Text>
      </Pressable>
  </Pressable>
}

export default ProdutoItem;