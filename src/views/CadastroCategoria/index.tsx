import { Botao } from "@/components/Botao";
import Campo, { TipoCampo } from "@/components/Campo";
import CampoCor from "@/components/CampoCor";
import CampoSelecionarIconeCategoria from "@/components/CampoSelecionarIconeCategoria";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";

// tela de cadastro de catetgoria de produto
const CadastroCategoria = ({ navigation }: any) => {

  const [ categoriaIdEditar, setCategoriaIdEditar ] = useState<string>("");
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ nome, setNome ] = useState<string>("");
  const [ descricao, setDescricao ] = useState<string>("");
  const [ cor, setCor ] = useState<string>("");
  const [ icone, setIcone ] = useState<string>("");
  const [ erroNome, setErroNome ] = useState<string>("");
  const [ erroDescricao, setErroDescricao ] = useState<string>("");
  const [ erroCor, setErroCor ] = useState<string>("");

  // obter os ícones
  const getIcones = (): Array<{ fonte: string, icone: string }> => {
    const iconesDisponiveis: Array<{ fonte: string, icone: string }> = [];
  
    return iconesDisponiveis;
  }

  const icones: Array<{ fonte: string, icone: string }> = getIcones();

  // cadastrar categoriq
  const cadastrar = async () => {

  }

  // editar categoria
  const editar = async () => {

  }

  // salvar categoria na base de dados
  const salvar = async () => {

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

  useFocusEffect(useCallback(() => {
  
  }, []));

  return <ConectaVendasTela>
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