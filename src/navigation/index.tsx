import Login from '@/views/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../views/SplashScreen';

const variaveisAmbiente = process.env;

// navegação Stack
const Stack = createNativeStackNavigator();

// telas do app
const telas: Array<{ titulo: string, apresentaMenu: boolean, tela: any, nomeTela: string }> = [
  {
    titulo: "",
    apresentaMenu: false,
    tela: SplashScreen,
    nomeTela: "splash"
  },
  {
    titulo: "Login",
    apresentaMenu: true,
    nomeTela: "login",
    tela: Login
  }
];

// componente de navegação do app
const NavigationConectaVendas = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        { telas.map(({ titulo, tela, apresentaMenu, nomeTela }) => {

          return <Stack.Screen name={ nomeTela } component={ tela } options={ {
            headerShown: apresentaMenu,
            title: titulo,
            headerStyle: {
              backgroundColor: variaveisAmbiente.EXPO_PUBLIC_COR_PRIMARIA ?? ""
            },
            headerTintColor: "#fff"
          } } />
        }) }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationConectaVendas;