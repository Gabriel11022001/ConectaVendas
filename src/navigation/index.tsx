import BotaoAddCabecalho from '@/components/BotaoAddCabecalho';
import CadastroCategoria from '@/views/CadastroCategoria';
import CadastroPerfil from '@/views/CadastroPerfil';
import CategoriasProduto from '@/views/CategoriasProduto';
import EsqueciSenha from '@/views/EsqueciSenha';
import Home from '@/views/Home';
import Login from '@/views/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import SplashScreen from '../views/SplashScreen';

const variaveisAmbiente = process.env;

// navegação Stack
const Stack = createNativeStackNavigator();

// telas do app
const telas: Array<{
  titulo: string,
  apresentaMenu: boolean,
  tela: any,
  nomeTela: string,
  botoesDireita?: { habilitado: boolean, telaRedirecionar: string, tipo: string }[]
}> = [
    {
      // splash screen
      titulo: "",
      apresentaMenu: false,
      tela: SplashScreen,
      nomeTela: "splash"
    },
    {
      // tela de login
      titulo: "Login",
      apresentaMenu: true,
      nomeTela: "login",
      tela: Login
    },
    {
      // tela de cadastro de perfil
      titulo: "Cadastro de Perfil",
      apresentaMenu: true,
      nomeTela: "cadastro_perfil",
      tela: CadastroPerfil
    },
    {
      // tela de recuperação de senha
      titulo: "Esqueci Minha Senha",
      apresentaMenu: true,
      nomeTela: "recuperar_senha",
      tela: EsqueciSenha
    },
    {
      // tela home do aplicativo
      titulo: "",
      apresentaMenu: false,
      nomeTela: "home",
      tela: Home
    },
    {
      // gestão de categorias
      titulo: "Categorias",
      apresentaMenu: true,
      nomeTela: "categorias",
      tela: CategoriasProduto,
      botoesDireita: [
        {
          habilitado: true,
          telaRedirecionar: "cadastro_categoria",
          tipo: "add"
        }
      ]
    },
    {
      // tela de cadastro de categoria de produto
      titulo: "Cadastro de Categoria",
      apresentaMenu: true,
      nomeTela: "cadastro_categoria",
      tela: CadastroCategoria
    }
  ];

// componente de navegação do app
const NavigationConectaVendas = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        {telas.map(({ titulo, tela, apresentaMenu, nomeTela, botoesDireita }) => {

          return <Stack.Screen name={nomeTela} component={tela} options={({ navigation }) => (
            {
              headerShown: apresentaMenu,
              title: titulo,
              headerStyle: {
                backgroundColor: variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA ?? ""
              },
              headerTintColor: "#fff",
              headerRight: () => {

                if (botoesDireita && botoesDireita.length > 0) {

                  return <View>
                    {botoesDireita.map((botao) => {

                      if (botao.tipo === "add") {

                        return <BotaoAddCabecalho onClick={() => {
                          navigation.navigate(botao.telaRedirecionar);
                        }} />
                      }

                      return null;
                    })}
                  </View>
                } else {

                  return null;
                }

              }
            }
          )} />
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationConectaVendas;