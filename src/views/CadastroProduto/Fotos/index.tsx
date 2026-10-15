import BoasFotos from "@/components/BoasFotos";
import { Botao } from "@/components/Botao";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import { ContadorFotosAdicionadas } from "@/components/ContadorFotosAdicionadas";
import { FotoProdutoItem } from "@/components/FotoProdutoItem";
import ProgressoFluxo from "@/components/ProgressoFluxo";
import TituloTela from "@/components/TituloTela";
import { useFluxoCadastroProduto } from "@/hooks/useFluxoCadastroProduto";
import { ProdutoService } from "@/services/produtoService";
import { FotoProduto, Produto } from "@/types/produto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useLayoutEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const NUM_LIMITE_FOTOS = 5;

// tela com as fotos do produto
const FotosProduto = ({ navigation }: any) => {

  const {
    produtoFluxoCadastro,
    atualizarDadosProdutoFluxoCadastro
  } = useFluxoCadastroProduto();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ fotos, setFotos ] = useState<FotoProduto[]>([]);
  const numLimiteFotos = 5;

  // solicitar permissão
  const solicitarPermissao = async () => {
    const permissao = await ImagePicker.getCameraPermissionsAsync();

    if (!permissao.granted) {
      // solicitar permissão
      const respSolicitarPermissao = await ImagePicker.requestCameraPermissionsAsync();

      if (!respSolicitarPermissao.granted) {
        
        throw new Error("Permissão para acessar a câmera negada!");
      }

    }

  }

  // tirar foto do produto
  const tirarFoto = async () => {
    console.log("Tirar foto do produto...");

    try {

      if (fotos.length >= NUM_LIMITE_FOTOS) {

        return;
      }

      await solicitarPermissao();

      const resultFotos = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        base64: true,
        quality: 0.8
      });

      if (resultFotos.canceled) {
        return;
      }

      const foto = resultFotos.assets[0];

      const novaFoto: FotoProduto = {
        base64: foto.base64 ?? "",
        ext: foto.mimeType ?? ""
      };

      setFotos(fotosAtuais => {

        if (fotosAtuais.length >= numLimiteFotos) {

          return fotosAtuais;
        }

        const fotosAtualizadas = [
          ...fotosAtuais
        ];

        if (fotosAtuais.length === 0) {
          novaFoto.posicao = 1;
        } else {
          novaFoto.posicao = fotosAtuais.length + 1;
        }

        fotosAtualizadas.push(novaFoto);

        console.log(`posição da nova foto: ${ novaFoto.posicao ?? "" }`);
        console.log(`Qtd fotos atuais: ${ fotosAtualizadas.length }`);

        console.log("Foto tirada com sucesso!");

        if (produtoFluxoCadastro) {
          const produtoAtualizado: Produto = { ...produtoFluxoCadastro };

          produtoAtualizado.fotos = fotosAtualizadas;

          atualizarDadosProdutoFluxoCadastro(produtoAtualizado);
        }

        return fotosAtualizadas;
      });

    } catch (e) {
      console.log(`Erro ao tentar-se tirar foto: ${e}`);
    }

  }

  // remover foto do produto
  const removerFoto = (foto: FotoProduto): void => {
    const fotosAtualizadas: Array<FotoProduto> = fotos.filter(f => f.base64 != foto.base64);

    setFotos(fotosAtualizadas);

    if (produtoFluxoCadastro) {
      const produtoAtualizado: Produto = { ...produtoFluxoCadastro };

      produtoAtualizado.fotos = fotosAtualizadas;

      atualizarDadosProdutoFluxoCadastro(produtoAtualizado);
    }

  }

  // finalizar o cadastro do produto
  const finalizar = async () => {
    
    try {
      setCarregando(true);

      if (produtoFluxoCadastro) {
        const produto: Produto = { ...produtoFluxoCadastro };

        produto.fotos = fotos;

        atualizarDadosProdutoFluxoCadastro(produto);

        await ProdutoService.salvar(produto);

        navigation.replace("home");
      }

    } catch (e) {
      console.log(`Erro ao tentar-se cadastrar o produto: ${ e }`);
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {

    if (produtoFluxoCadastro) {
      const fotosAtuais: Array<FotoProduto> = produtoFluxoCadastro.fotos ?? [];

      if (fotosAtuais.length > 0) {
        setFotos(fotosAtuais);
      }

    }

  }, [ produtoFluxoCadastro ]));

  useLayoutEffect(useCallback(() => {
    
    navigation.setOptions({
      headerRight: () => {

        return <Pressable onPress={ tirarFoto }>
          <Ionicons
            name="camera-outline"
            size={ 50 }
            color="#fff" />
        </Pressable>
      }
    });

  }, [ navigation ]))

  return <ConectaVendasTela>
    <FlatList
      data={ fotos }
      keyExtractor={ foto => foto.posicao?.toString() ?? "" }
      ListHeaderComponent={ () => {

        return <View>
          <ProgressoFluxo
            telaAtual="Fotos Produto"
            cadastroCliente={ false }
            cadastroProduto={ true } />
          <TituloTela 
            titulo="Fotos do Produto"
            subtitulo="Adicione fotos de qualidade do produto" />
          { /** container explicando como 
           * tirar boas fotos */ }
          <BoasFotos />
          <ContadorFotosAdicionadas quantidade={ fotos.length } />
        </View>
      } }
      ListFooterComponent={ () => (
        // botão para finalizar o cadastro do produto
        <Botao  
          carregando={ carregando }
          titulo="Finalizar"
          tipo="default"
          margemBaixo={ 50 }
          margemTopo={ 40 }
          habilitado={ !carregando && fotos.length > 0 }
          onClick={ finalizar } />
      ) }
      renderItem={ ({ item }) => {

        return <FotoProdutoItem
          foto={ item }
          onRemover={ () => {
            removerFoto(item);
          } } />
      } } />
  </ConectaVendasTela>
}

export default FotosProduto;