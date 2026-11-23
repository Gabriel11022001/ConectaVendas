import AlertaErro from "@/components/AlertaErro";
import { Botao } from "@/components/Botao";
import Campo, { TipoCampo } from "@/components/Campo";
import ConectaVendasTela from "@/components/ConectaVendasTela";
import Loader from "@/components/Loader";
import SelecionarTipoPessoa from "@/components/SelecionarTipoPessoa";
import Select, { OpcaoSelect } from "@/components/Select";
import TituloTela from "@/components/TituloTela";
import useCadastroCliente, { CidadeApiIBGE, EstadoApiIBGE } from "@/hooks/useCadastroCliente";
import { TipoPessoa } from "@/types/cliente";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";

// tela de cadastro de cliente
export default function CadastroCliente({
  navigation,
  route
}: any) {

  const {
    onSelecionarCidadeEndereco,
    carregando,
    onDigitar,
    tipoPessoa,
    telefoneCelular,
    telefoneFixo,
    email,
    status,
    cpf,
    cnpj,
    nome,
    dataNascimento,
    estadoCivil,
    genero,
    rg,
    buscarClientePeloId,
    salvar,
    onSelecionarEstadoEndereco,
    idClienteEditar,
    setIdClienteEditar,
    erroCnpj,
    erroCpf,
    erroNome,
    erroDataNascimento,
    erroGenero,
    erroRg,
    erroEstadoCivil,
    erroNomeFantasia,
    erroRazaoSocial,
    erroDataFundacao,
    erroEmail,
    erroTelefoneCelular,
    erroTelefoneFixo,
    razaoSocial,
    dataFundacao,
    nomeFantasia,
    setTipoPessoa,
    onSelecionarEstadoCivil,
    onSelecionarGenero,
    erroStatus,
    onSelecionarStatus,
    opcoesStatusCliente,
    opcoesGenerosCliente,
    estadosCivisOpcoes,
    botaoProsseguirAtivo,
    cep,
    logradouro,
    complemento,
    uf,
    cidade,
    bairro,
    numeroResidencial,
    erroCep,
    erroLogradouro,
    erroUf,
    erroCidade,
    erroBairro,
    erroNumero,
    estados,
    cidades,
    erro,
    setErro
  } = useCadastroCliente();

  useFocusEffect(useCallback(() => {

    if (route.params && route.params.idClienteEditar) {
      setIdClienteEditar(route.params.idClienteEditar ?? "");
    }

  }, [ route ]));

  // formulário de pesssa fisica
  const FormularioPessoaFisia = (
    <View>
      { /** cpf */ }
      <Campo
        placeholder="CPF"
        valor={ cpf }
        erro={ erroCpf }
        habilitado={ true }
        tipoCampo={ TipoCampo.cpf }
        onAlterarValor={ (cpfDigitado: string) => {
          onDigitar(cpfDigitado, TipoCampo.cpf);
        } } />
      { /** nome */ }
      <Campo
        placeholder="Nome Completo"
        valor={ nome }
        erro={ erroNome }
        habilitado={ true }
        tipoCampo={ TipoCampo.nomePessoa }
        onAlterarValor={ (nomeDigitado: string) => {
          onDigitar(nomeDigitado, TipoCampo.nomePessoa);
        } } />
      { /** rg */ }
      <Campo
        placeholder="RG"
        valor={ rg }
        erro={ erroRg }
        habilitado={ true }
        tipoCampo={ TipoCampo.rg }
        onAlterarValor={ (rgDigitado: string) => {
          onDigitar(rgDigitado, TipoCampo.rg);
        } } />
      { /** data de nascimento */ }
      <Campo
        placeholder="Dt.Nascimento"
        valor={ dataNascimento }
        erro={ erroDataNascimento }
        habilitado={ true }
        tipoCampo={ TipoCampo.dataNascimento }
        onAlterarValor={ (dataNascimentoDigitada: string) => {
          onDigitar(dataNascimentoDigitada, TipoCampo.dataNascimento);
        } } />
      { /** gênero */ }
      <Select
        placeholder="Selecione o Gênero"
        opcoes={ opcoesGenerosCliente }
        valorSelecionado={ genero }
        erro={ erroGenero }
        onSelecionar={ (generoSelecionado: OpcaoSelect) => {
          onSelecionarGenero(generoSelecionado.valor);
        } } />
      { /** estado civil */ }
      <Select
        placeholder="Selecione o Estado Civil"
        opcoes={ estadosCivisOpcoes }
        valorSelecionado={ estadoCivil }
        erro={ erroEstadoCivil }
        onSelecionar={ (estadoCivilSelecionado: OpcaoSelect) => {
          onSelecionarEstadoCivil(estadoCivilSelecionado.valor);
        } } />
    </View>
  );

  // formulário de pessoa juridica
  const FormularioPessoaJuridica = (
    <View>
      { /** cnpj */ }
      <Campo
        placeholder="CNPJ"
        valor={ cnpj }
        erro={ erroCnpj }
        habilitado={ true }
        tipoCampo={ TipoCampo.cnpj }
        onAlterarValor={ (cnpjDigitado: string) => {
          onDigitar(cnpjDigitado, TipoCampo.cnpj);
        } } />
      { /** razão social */ }
      <Campo
        placeholder="Razão Social"
        valor={ razaoSocial }
        erro={ erroRazaoSocial }
        habilitado={ true }
        tipoCampo={ TipoCampo.razaoSocial }
        onAlterarValor={ (razaoSocialDigitada: string) => {
          onDigitar(razaoSocialDigitada, TipoCampo.razaoSocial);
        } } />
      { /** nome fantasia */ }
      <Campo
        placeholder="Nome Fantasia"
        valor={ nomeFantasia }
        erro={ erroNomeFantasia }
        tipoCampo={ TipoCampo.nomeFantasia }
        habilitado={ true }
        onAlterarValor={ (nomeFantasiaDigitado: string) => {
          onDigitar(nomeFantasiaDigitado, TipoCampo.nomeFantasia);
        } } />
      { /** data de fundação */ }
      <Campo
        placeholder="Dt.Fundação"
        valor={ dataFundacao }
        erro={ erroDataFundacao }
        tipoCampo={ TipoCampo.dataFundacao }
        habilitado={ true }
        onAlterarValor={ (dataFundacaoDigitada: string) => {
          onDigitar(dataFundacaoDigitada, TipoCampo.dataFundacao);
        } } />
    </View>
  ); 

  // formulário de cadastro
  const FormularioCadastro = (
    tipoPessoa === TipoPessoa.pf ? FormularioPessoaFisia : FormularioPessoaJuridica
  );

  // formulário básico
  const FormularioBasico = (
    <View>
      { /** e-mail */ }
      <Campo
        placeholder="E-mail"
        erro={ erroEmail }
        habilitado={ true }
        tipoCampo={ TipoCampo.email }
        valor={ email }
        onAlterarValor={ (emailDigitado: string) => {
          onDigitar(emailDigitado, TipoCampo.email);
        } } />
      { /** telefone celular */ }
      <Campo
        placeholder="Telefone(celular)"
        erro={ erroTelefoneCelular }
        habilitado={ true }
        tipoCampo={ TipoCampo.telefone }
        valor={ telefoneCelular }
        onAlterarValor={ (telefoneDigitado: string) => onDigitar(telefoneDigitado, TipoCampo.telefone) } />
      { /** telefone fixo */ }
      <Campo
        placeholder="Telefone(fixo, opcional)"
        erro={ erroTelefoneFixo }
        habilitado={ true }
        tipoCampo={ TipoCampo.telefoneFixo }
        valor={ telefoneFixo }
        onAlterarValor={ (telefoneFixoDigitado: string) => onDigitar(telefoneFixoDigitado, TipoCampo.telefoneFixo) } />
      { /** status do cliente */ }
      <Select
      placeholder="Selecionar Status"
        valorSelecionado={ status }
        opcoes={ opcoesStatusCliente }
        onSelecionar={ (statusSelecionado: OpcaoSelect) => {
          onSelecionarStatus(statusSelecionado.valor);
        } }
        erro={ erroStatus } />
      { /** cep */ }
      <Campo
        valor={ cep }
        placeholder="CEP"
        erro={ erroCep }
        habilitado={ true }
        tipoCampo={ TipoCampo.cep }
        onAlterarValor={ (cepDigitado: string) => {
          onDigitar(cepDigitado, TipoCampo.cep);
        } } />
      { /** endereço(logradouro) */ }
      <Campo
        valor={ logradouro }
        placeholder="Endereço"
        erro={ erroLogradouro }
        habilitado={ true }
        tipoCampo={ TipoCampo.logradouro }
        onAlterarValor={ (logradouroDigitado: string) => {
          onDigitar(logradouroDigitado, TipoCampo.logradouro);
        } } />
      { /** complemento */ }
      <Campo
        valor={ complemento }
        placeholder="Complemento(opcional)"
        erro={ "" }
        habilitado={ true }
        tipoCampo={ TipoCampo.complemento }
        onAlterarValor={ (complementoDigitado: string) => {
          onDigitar(complementoDigitado, TipoCampo.complemento);
        } } />
      { /** uf */ }
      <Select
        placeholder="UF"
        erro={ erroUf }
        valorSelecionado={ uf }
        opcoes={ estados.map((estado: EstadoApiIBGE) => {

          return {
            id: estado.id ?? "",
            titulo: estado.nome ?? "",
            valor: estado.sigla
          };
        }) }
        onSelecionar={ (estadoSelecionado: OpcaoSelect) => {
          onSelecionarEstadoEndereco(estadoSelecionado.valor ?? "");
        } } />
      { /** cidade */ }
      <Select
        placeholder="Cidade"
        erro={ erroCidade }
        opcoes={ cidades.map((cid: CidadeApiIBGE) => {

          return {
            id: cid.id,
            titulo: cid.nome,
            valor: cid.nome
          };
        }) }
        valorSelecionado={ cidade }
        onSelecionar={ (cidadeSelecionada: OpcaoSelect) => {
          onSelecionarCidadeEndereco(cidadeSelecionada.valor ?? "");
        } } />
      { /** bairro */ }
      <Campo
        placeholder="Bairro"
        valor={ bairro }
        erro={ erroBairro }
        habilitado={ true }
        tipoCampo={ TipoCampo.bairro }
        onAlterarValor={ (bairroDigitado: string) => {
          onDigitar(bairroDigitado, TipoCampo.bairro);
        } } />
      { /** número */ }
      <Campo
        placeholder="Número"
        valor={ numeroResidencial }
        erro={ erroNumero }
        habilitado={ true }
        tipoCampo={ TipoCampo.numero }
        onAlterarValor={ (numeroResidencialDigitado: string) => {
          onDigitar(numeroResidencialDigitado, TipoCampo.numero);
        } } />
    </View>
  );

  return <ConectaVendasTela>
    { /** alerta de erro */ }
    <AlertaErro
      msgAlerta={ erro }
      onFechar={ () => {
        setErro("");
      } }
      onOk={ () => {
        setErro("");
      } } />
    { /** loader de carregamento da tela */ }
    <Loader carregando={ carregando } />
    <ScrollView showsHorizontalScrollIndicator={ false }>
      <TituloTela
        titulo="Cadastro de Cliente"
        subtitulo="Informe os dados abaixo para cadastrar ou editar o cliente." />
      { /** selecionar o tipo de pessoa */ }
      <SelecionarTipoPessoa
        tipoPessoaSelecionada={ tipoPessoa }
        onSelecionarTipoPessoa={ (tipoPessoaSelecionada: TipoPessoa) => {
          setTipoPessoa(tipoPessoaSelecionada);
        } } />
      { FormularioBasico }
      { FormularioCadastro }
      <Botao
        tipo="add"
        habilitado={ botaoProsseguirAtivo }
        margemBaixo={ 50 }
        titulo="Finalizar"
        carregando={ carregando }
        onClick={ salvar } />
    </ScrollView>
  </ConectaVendasTela>
}