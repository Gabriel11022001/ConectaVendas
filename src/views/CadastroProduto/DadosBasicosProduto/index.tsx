import { Botao } from "@/components/Botao";
import Campo, { TipoCampo } from "@/components/Campo";
import CampoCategoriaProduto from "@/components/CampoCategoriaProduto";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import Loader from "@/components/Loader";
import ProgressoFluxo from "@/components/ProgressoFluxo";
import TopoTelaTitulo from "@/components/TopoTelaTitulo";
import { ProdutoMesmoNomeException } from "@/exceptions/produtoMesmoNomeException";
import { useFluxoCadastroProduto } from "@/hooks/useFluxoCadastroProduto";
import { ProdutoService } from "@/services/produtoService";
import { Produto } from "@/types/produto";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";

// tela de cadastro de produto dados básicos
const DadosBasicosProduto = ({ navigation, route }: any) => {

  const {
    categoriaSelecionadaFluxoVenda,
    atualizarDadosProdutoFluxoCadastro,
    produtoFluxoCadastro,
    selecionarCategoriaProduto,
    limparFluxoCadastroProduto
  } = useFluxoCadastroProduto();

  const [ carregando, setCarregando ] = useState<boolean>(false); 
  const [ idProduto, setIdProduto ] = useState<string>("");
  const [ nomeProduto, setNomeProduto ] = useState<string>("");
  const [ descricao, setDescricao ] = useState<string>("");
  const [ preco, setPreco ] = useState<string>("");
  const [ estoque, setEstoque ] = useState<string>("");
  const [ marca, setMarca ] = useState<string>("");
  const [ codigo, setCodigo ] = useState<string>("");
  const [ observacoes, setObservacoes ] = useState<string>("");
  const [ garantia, setGarantia ] = useState<string>("");
  const [ peso, setPeso ] = useState<string>("");
  const [ comprimento, setComprimento ] = useState<string>("");
  const [ altura, setAltura ] = useState<string>("");  
  const [ largura, setLargura ] = useState<string>("");

  const [ erros, setErros ] = useState<{
    nome: string,
    descricao: string,
    preco: string,
    estoque: string,
    marca: string,
    codigo: string,
    observacoes: string,
    garantia: string,
    peso: string,
    comprimento: string,
    altura: string,
    largura: string,
    categoria: string
  }>({
    nome: "",
    descricao: "",
    observacoes: "",
    altura: "",
    codigo: "",
    comprimento: "",
    estoque: "",
    garantia: "",
    largura: "",
    marca: "",
    peso: "",
    preco: "",
    categoria: ""
  });

  enum CampoEnum {
    
    nome,
    preco,
    descricao,
    observacoes,
    altura,
    largura,
    peso,
    comprimento,
    marca,
    estoque,
    garantia,
    codigo

  }
  
  const onDigitar = (valor: string, campo: CampoEnum): void => {
    const errosAux = { ...erros };

    // nome do produto
    if (campo === CampoEnum.nome) {
      setNomeProduto(valor);
      errosAux.nome = "";

      if (valor.trim().length === 0) {
        errosAux.nome = "Informe o nome do produto";
      }

    }

    // descrição
    if (campo === CampoEnum.descricao) {
      setDescricao(valor);
      errosAux.descricao = "";

      if (valor.trim().length === 0) {
        errosAux.descricao = "Informe a descrição";
      }

    }

    // preço do produto
    if (campo === CampoEnum.preco) {
      setPreco(valor);
      errosAux.preco = "";

      if (valor.trim().length === 0) {
        errosAux.preco = "Informe o preço";
      } else {
        const precoDigitado: string = valor.replace("R$", "").trim();
        const precoDigitadoNumero: number = parseFloat(precoDigitado);
        
        if (precoDigitadoNumero <= 0) {
          errosAux.preco = "Preço inválido";
        }
        
      }

    }

    // estoque
    if (campo === CampoEnum.estoque) {
      setEstoque(valor);
      errosAux.estoque = "";

      if (valor.trim().length === 0) {
        errosAux.estoque = "Informe o estoque";      
      } else {
        const estoqueDigitado: number = parseInt(valor);

        if (estoqueDigitado <= 0) {
          errosAux.estoque = "Estoque inválido";
          setEstoque(String(0));
        }

      }

    }

    // marca
    if (campo === CampoEnum.marca) {
      setMarca(valor);
      errosAux.marca = "";

      if (valor.trim().length >= 1 && valor.length < 3) {
        errosAux.marca = "A marca deve possuir no mínimo três caracteres";
      }
      
    }

    // código
    if (campo === CampoEnum.codigo) {
      setCodigo(valor);
    }

    // garantia
    if (campo === CampoEnum.garantia) {
      setGarantia(valor);
    }

    // peso
    if (campo === CampoEnum.peso) {
      setPeso(valor);
    }

    // altura
    if (campo === CampoEnum.altura) {
      setAltura(valor);
    }

    // comprimento
    if (campo === CampoEnum.comprimento) {
      setComprimento(valor);
    }

    // largura
    if (campo === CampoEnum.largura) {
      setLargura(valor);
    }

    // observações
    if (campo === CampoEnum.observacoes) {
      setObservacoes(valor);
    }

    setErros(errosAux);
  }

  const habilitarBotao = useMemo(() => {

    return nomeProduto != ""
    && descricao != ""
    && preco != ""
    && estoque != ""
    && erros.nome === ""
    && erros.descricao === ""
    && erros.preco === ""
    && erros.altura === ""
    && erros.codigo === ""
    && erros.comprimento === ""
    && erros.garantia === ""
    && erros.estoque === ""
    && erros.largura === ""
    && erros.marca === ""
    && erros.observacoes === ""
    && erros.peso === ""
    && categoriaSelecionadaFluxoVenda != null 
    && erros.categoria === ""
  }, [
    nomeProduto,
    descricao,
    preco,
    estoque,
    erros
  ]);

  // validar se existe produto cadastrado com o mesmo nome na base de dados
  const validarExisteProdutoMesmoNome = async () => {
    const produto: Produto | null = await ProdutoService.buscarPeloNome(nomeProduto.trim());

    if (produto) {

      throw new ProdutoMesmoNomeException();
    }

  }

  // prosseguir
  const prosseguir = async () => {

    try {
      setCarregando(true);

      // validar se já existe um produto cadastrado com o mesmo nome
      await validarExisteProdutoMesmoNome();

      if (produtoFluxoCadastro) {
        const produtoAtualizado: Produto = { ...produtoFluxoCadastro };

        produtoAtualizado.nome = nomeProduto.trim();
        produtoAtualizado.descricao = descricao.trim();
        produtoAtualizado.estoque = estoque;
        produtoAtualizado.precoVenda = preco;
        produtoAtualizado.categoria = categoriaSelecionadaFluxoVenda ?? undefined;
        produtoAtualizado.altura = altura;
        produtoAtualizado.peso = peso;
        produtoAtualizado.largura = largura;
        produtoAtualizado.codigo = codigo;
        produtoAtualizado.garantia = garantia;
        produtoAtualizado.marca = marca;
        produtoAtualizado.obervacao = observacoes;
        
        atualizarDadosProdutoFluxoCadastro(produtoAtualizado);
      } else {
        const produto: Produto = {
          id: idProduto,
          nome: nomeProduto.trim(),
          descricao: descricao.trim(),
          precoVenda: preco,
          estoque: estoque,
          categoria: categoriaSelecionadaFluxoVenda ?? undefined,
          marca: marca.trim(),
          altura: altura.trim(),
          codigo: codigo.trim(),
          garantia: garantia.trim(),
          largura: largura.trim(),
          obervacao: observacoes.trim(),
          peso: peso.trim()          
        }

        atualizarDadosProdutoFluxoCadastro(produto);
      }

      navigation.navigate("fotos_produto");
    } catch (e) {

      if (e instanceof ProdutoMesmoNomeException) {
        // apresentar alerta de erro informando que existe outro produto com o mesmo nome
        console.log("Existe outro produto cadastrado com o mesmo nome: " + nomeProduto);
      } else {
        // apresentar alerta de erro genérico
        console.log(`Erro: ${ e }`);
      }
;
    } finally {
      setCarregando(false);
    }

  }

  // redirecionar o usuário para a tela de seleção de categoria
  const selecionarCategoriaDoProduto = (): void => {
    
    if (produtoFluxoCadastro != null) {
      const produtoAtualizado: Produto = { ...produtoFluxoCadastro };
      
      produtoAtualizado.nome = nomeProduto.trim();
      produtoAtualizado.descricao = descricao.trim();
      produtoAtualizado.precoVenda = preco.toString();
      produtoAtualizado.estoque = estoque.toString();

      if (categoriaSelecionadaFluxoVenda != null) {
        produtoAtualizado.categoria = categoriaSelecionadaFluxoVenda;
      }

      atualizarDadosProdutoFluxoCadastro(produtoAtualizado);
    } else {
      const produtoSetarFluxo: Produto = {
        nome: nomeProduto.trim(),
        descricao: descricao.trim(),
        precoVenda: preco.toString(),
        estoque: estoque.toString()
      }

      if (categoriaSelecionadaFluxoVenda != null) {
        produtoSetarFluxo.categoria = categoriaSelecionadaFluxoVenda;
      }

      atualizarDadosProdutoFluxoCadastro(produtoSetarFluxo);
    }

    // redirecionar o usuário para a tela de seleção de categoria
    navigation.navigate("selecionar_categoria");
  }

  // buscar produto na base de dados
  const buscarProduto = async () => {

    if (route && route.params && route.params.produtoId) {
      setIdProduto(route.params.produtoId);

      try {
        setCarregando(true);

        const produto: Produto | null = await ProdutoService.buscarPeloId(route.params.produtoId);

        if (produto && produto.categoria) {
          selecionarCategoriaProduto(produto.categoria);
          atualizarDadosProdutoFluxoCadastro(produto);
        }

      } catch (e) {

      } finally {
        setCarregando(false);
      }

    }

  }

  // limpar todos os campos
  const limparTodosCampos = (): void => {
    setErros({
      nome: "",
      descricao: "",
      observacoes: "",
      altura: "",
      codigo: "",
      comprimento: "",
      estoque: "",
      garantia: "",
      largura: "",
      marca: "",
      peso: "",
      preco: "",
      categoria: ""
    });

    limparFluxoCadastroProduto();

    setIdProduto("");
    setNomeProduto("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setMarca("");
    setCodigo("");
    setObservacoes("");
    setGarantia("");
    setPeso("");
    setComprimento("");
    setAltura("");
    setLargura("");
  }

  useEffect(() => {

    if (produtoFluxoCadastro != null) {
      const {
        id,
        nome,
        descricao,
        precoVenda,
        estoque
      } = { ...produtoFluxoCadastro }

      setNomeProduto(nome);
      setDescricao(descricao);
      setPreco(precoVenda.toString());
      setEstoque(estoque.toString());
    }

  }, [ produtoFluxoCadastro ]);

  useEffect(() => {
    limparTodosCampos();
    buscarProduto();
  }, []);

  return <ConectaVendasTela>
    { /** loader */ }
    <Loader carregando={ carregando } />
    <ScrollView showsHorizontalScrollIndicator={ false }>
      <ProgressoFluxo
        telaAtual="Dados Básicos"
        cadastroCliente={ false }
        cadastroProduto={ true } />
      { /** título da tela de cadastro de produto */ }
      <TopoTelaTitulo
        titulo="Dados Básicos do Produto"
        subtitulo="Informe os dados básicos do produto."
        icone={ <Feather name="box" size={ 40 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000" } /> } />
      { /** campo para o usuário informar o nome do produto */ }
      <Campo
        placeholder="Nome do Produto"
        erro={ erros.nome ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.identificacao }
        tamanhoMaximo={ 100 }
        valor={ nomeProduto }
        onAlterarValor={ (nomeProdutoDigitado) => onDigitar(nomeProdutoDigitado, CampoEnum.nome) } />
      { /** campo para o usuário informar o nome do produto */ }
      <Campo
        placeholder="Descrição do Produto"
        erro={ erros.descricao ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.descricao }
        valor={ descricao }
        onAlterarValor={ (descricaoDigitada: string) => onDigitar(descricaoDigitada, CampoEnum.descricao) } />
      { /** campo para o usuário informar o preço do produto */ }
      <Campo
        placeholder="Preço"
        erro={ erros.preco ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.valorMonetario }
        valor={ preco }
        onAlterarValor={ (precoDigitado: string) => onDigitar(precoDigitado, CampoEnum.preco) } />
      { /** campo para o usuário informar o estoque do produto */ }
      <Campo
        placeholder="Estoque"
        erro={ erros.estoque ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.estoque }
        valor={ estoque }
        onAlterarValor={ (estoqueDigitado: string) => onDigitar(estoqueDigitado, CampoEnum.estoque) } />
      { /** campo para selecionar a categoria do produto */ }
      <CampoCategoriaProduto
        categoriaSelecionada={ categoriaSelecionadaFluxoVenda }
        onSelecionarCategoria={ () => {
          selecionarCategoriaDoProduto();
        } } />
      { /** título da sessão de informações adicionais do produto */ }
      <TopoTelaTitulo
        titulo="Informações adicionais"
        subtitulo="Outros detalhes do produto."
        icone={ <Feather name="box" size={ 40 } color={ process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000" } /> } />
      { /** marca do produto */ }
      <Campo
        placeholder="Marca(opcional)"
        erro={ erros.marca ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.nomeCategoria }
        valor={ marca }
        onAlterarValor={ (marcaDigitada: string) => {
          onDigitar(marcaDigitada, CampoEnum.marca);
        } } />
      { /** código do produto */ }
      <Campo
        placeholder="Código(opcional)"
        erro={ erros.codigo ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.default }
        valor={ codigo }
        onAlterarValor={ (codigoDigitado: string) => {
          onDigitar(codigoDigitado, CampoEnum.codigo);
        } } />
      { /** garantia do produto */ }
      <Campo
        placeholder="Garantia (opcional)"
        erro={ erros.garantia ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.default }
        valor={ garantia }
        onAlterarValor={ (garantiaDigitada: string) => {
          onDigitar(garantiaDigitada, CampoEnum.garantia);
        } } />
      { /** peso do produto */ }
      <Campo
        placeholder="Peso KG(opcional)"
        erro={ erros.peso ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.default }
        valor={ peso }
        onAlterarValor={ (pesoDigitado: string) => {
          onDigitar(pesoDigitado, CampoEnum.peso);
        } } />
      { /** comprimento do produto */ }
      <Campo
        placeholder="Comprimento CM(opcional)"
        erro={ erros.comprimento ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.default }
        valor={ comprimento }
        onAlterarValor={ (comprimentoDigitado: string) => {
          onDigitar(comprimentoDigitado, CampoEnum.comprimento);
        } } />
      { /** largura do produto */ }
      <Campo
        placeholder="Largura CM(opcional)"
        erro={ erros.largura ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.default }
        valor={ largura }
        onAlterarValor={ (larguraDigitado: string) => {
          onDigitar(larguraDigitado, CampoEnum.largura);
        } } />
      { /** altura do produto */ }
      <Campo
        placeholder="Altura CM(opcional)"
        erro={ erros.altura ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.default }
        valor={ altura }
        onAlterarValor={ (alturaDigitado: string) => {
          onDigitar(alturaDigitado, CampoEnum.altura);
        } } />
      { /** observações do produto */ }
      <Campo
        placeholder="Observações(opcional)"
        erro={ erros.observacoes ?? "" }
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.default }
        valor={ observacoes }
        onAlterarValor={ (obervacoesDigitado: string) => {
          onDigitar(obervacoesDigitado, CampoEnum.observacoes);
        } } />
      <Botao
        carregando={ carregando }
        tipo="default"
        titulo="Prosseguir"
        margemBaixo={ 50 }
        habilitado={ habilitarBotao }
        onClick={ () => {
          // prosseguir para a tela de fotos do produto
          prosseguir();
        } } />
    </ScrollView>
  </ConectaVendasTela>
}

export default DadosBasicosProduto;