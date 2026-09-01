import { Botao } from "@/components/Botao";
import Campo, { TipoCampo } from "@/components/Campo";
import CampoCor from "@/components/CampoCor";
import CampoSelecionarIconeCategoria from "@/components/CampoSelecionarIconeCategoria";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import Loader from "@/components/Loader";
import { CategoriaService } from "@/services/categoriaService";
import { CategoriaProduto } from "@/types/categoriaProduto";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";

// tela de cadastro de catetgoria de produto
const CadastroCategoria = ({ navigation, route }: any) => {

  const [ categoriaIdEditar, setCategoriaIdEditar ] = useState<string>("");
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ nome, setNome ] = useState<string>("");
  const [ descricao, setDescricao ] = useState<string>("");
  const [ cor, setCor ] = useState<string>("");
  const [ icone, setIcone ] = useState<string>("");
  const [ erroNome, setErroNome ] = useState<string>("");
  const [ erroDescricao, setErroDescricao ] = useState<string>("");
  const [ erroCor, setErroCor ] = useState<string>("");
  const [ carregandoBuscar, setCarregandoBuscar ] = useState<boolean>(false);

  // obter os ícones
  const getIcones = (): Array<{ fonte: string, icone: string }> => {
    const iconesDisponiveis: Array<{ fonte: string, icone: string }> = [];
  
    return iconesDisponiveis;
  }

  const icones: Array<{ fonte: string, icone: string }> = getIcones();

  // cadastrar categoriq
  const cadastrar = async (categoriaCadastrar: CategoriaProduto) => {
    console.log("Cadastrar categoria...", categoriaCadastrar);

    const categoriaMesmoNome: CategoriaProduto | null = await CategoriaService.buscarPeloNome(nome);

    if (categoriaMesmoNome != null) {

      throw new Error("Já existe uma categoria cadastrada com o mesmo nome.");
    }

    // cadastrar a categoria na base de dados
    await CategoriaService.cadastrar(categoriaCadastrar);
  }

  // editar categoria
  const editar = async (categoriaEditar: CategoriaProduto) => {
    console.log("Editar categoria...", categoriaEditar);

    const categoriaMesmoNome: CategoriaProduto | null = await CategoriaService.buscarPeloNome(categoriaEditar.nome);

    if (categoriaMesmoNome && categoriaMesmoNome.id != categoriaEditar.id) {

      throw new Error("Já existe uma categoria cadastrada com o mesmo nome.");
    }

    // editar a categoria na base de dados
    await CategoriaService.editar(categoriaEditar);
  }

  // salvar categoria na base de dados
  const salvar = async () => {

    try {
      setCarregando(true);

      const categoria: CategoriaProduto = {
        id: categoriaIdEditar ?? "",
        nome: nome.trim(),
        cor: cor.trim(),
        icone: icone.trim(),
        descricao: descricao.trim()
      }

      if (categoriaIdEditar === "") {
        // cadastrar categoria
        await cadastrar(categoria);
      } else {
        // editar categoria
        await editar(categoria);
      }

      // apresentar alerta para o usuário
      
      // redirecionar o usuário para a tela de listagem de categorias
      navigation.goBack();
    } catch (e) {
      console.log(`Erro ao tentar-se cadastrar/editar categoria: ${ e }`);

      // apresentar um alerta de erro para o usuário
    } finally {
      setCarregando(false);
    }

  }

  const onDigitarNome = (nomeDigitado: string): void => {
    setNome(nomeDigitado);
    setErroNome("");

    if (nomeDigitado.trim().length === 0) {
      setErroNome("Informe o nome da categoria");
    }

  }

  const onDigitarDescricao = (descricaoDigitada: string): void => {
    setDescricao(descricaoDigitada);
    setErroDescricao("");

    if (descricaoDigitada.trim().length > 0 && descricaoDigitada.trim().length < 3) {
      setErroDescricao("A descrição deve ter pelo menos 3 caracteres");
    }

  }

  const validarCor = (corDigitada: string): string => {
    let erroCor: string = "";

    return erroCor;
  }

  const onDigitarCor = (corDigitada: string): void => {
    setCor(corDigitada);
    setErroCor("");

    if (corDigitada.trim().length === 0) {
      setErroCor("Informe a cor da categoria");
    } else {
      const erroCor: string = validarCor(corDigitada);

      if (erroCor != "") {
        setErroCor(erroCor);
      }

    }

  }

  // buscar categoria de produto pelo id na base de dados
  const buscarCategoriaPeloId = async () => {

    if (route.params && route.params.idCategoriaEditar) {
      const idCategoriaEditar: string = route.params.idCategoriaEditar;
      setCategoriaIdEditar(idCategoriaEditar);
      
      try {
        setCarregandoBuscar(true);

        const categoria: CategoriaProduto | null = await CategoriaService.buscarPeloId(idCategoriaEditar);

        if (categoria != null) {
          setNome(categoria.nome);
          setCor(categoria.cor);
          setDescricao(categoria.descricao ?? "");
          setIcone(categoria.icone);
        } else {
          /**
           * apresentar alerta para o usuário informando que não existe uma categoria
           * cadastrada com esse id e redirecionar o usuário para 
           * a listagem de categorias
           */
          navigation.goBack();
        }

      } catch (e) {
        console.log(`Erro ao tentar-se buscar a categoria pelo id: ${ e }`);
      } finally {
        setCarregandoBuscar(false);
      }

    }

  }

  useFocusEffect(useCallback(() => {
    buscarCategoriaPeloId();
  }, []));

  return <ConectaVendasTela>
    { /** loader de carregamento da tela */ }
    <Loader carregando={ carregando || carregandoBuscar } msg={
      carregandoBuscar ? "Consultando os dados da categoria na base de dados, aguarde..."
      : "Carregando, aguarde..."
    } />
    <ScrollView showsHorizontalScrollIndicator={ false }>
      { /** campo para informar o nome da categoria */ }
      <Campo
        valor={ nome }
        erro={ erroNome }
        placeholder="Categoria"
        habilitado={ !carregando }
        tipoCampo={ TipoCampo.nomeCategoria }
        tamanhoMaximo={ 50 }
        onAlterarValor={ onDigitarNome } />
      { /** campo para o usuário informar a descrição da categoria */ }
      <Campo
        valor={ descricao }
        erro={ erroDescricao }
        habilitado={ !carregando }
        placeholder="Descrição"
        tipoCampo={ TipoCampo.descricaoCategoria }
        tamanhoMaximo={ 150 }
        onAlterarValor={ onDigitarDescricao } />
      { /** campo para o usuário informar a cor da categoria */ }
      <CampoCor
        valor={ cor }
        erro={ erroCor }
        habilitado={ !carregando }
        onDigitarCor={ onDigitarCor } />
      { /** campo para selecionar o ícone da categoria */ }
      <CampoSelecionarIconeCategoria
        iconeSelecionado={ icone }
        onSelecionar={ (iconeSelecionado: string) => {
          setIcone(iconeSelecionado);
        } }
        icones={ icones } />
      { /** botão para salvar a categoria do produto */ }
      <Botao
        carregando={ carregando }
        habilitado={ nome != "" && erroNome === "" && erroDescricao === "" && !carregando }
        titulo="Salvar"
        tipo="default"
        margemBaixo={ 50 }
        onClick={ () => {
          salvar();
        } } />
    </ScrollView>
  </ConectaVendasTela>
}

export default CadastroCategoria;