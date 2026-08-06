import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { styles } from "./styles";

// splash screen do app
const SplashScreen = ({ navigation }: any) => {

  // redirecionar o usuário para a tela de login
  const redirecionarTelaLogin = (): void => {
    setTimeout(() => {
      navigation.replace("login");
    }, 4000);
  }

  useFocusEffect(useCallback(() => {
    redirecionarTelaLogin();
  }, []));

  return <View style={ styles.container }>
    { /** imagem de fundo da tela splash screen */ }
    <Image style={ styles.imagemFundo } source={ require("@/assets/images/fundo_splash.jpg") } />
    <View style={ styles.corpo }>
      <Image
        source={ require("@/assets/images/logo_splash.png") }
        style={ {
          width: 220,
          height: 220
        } } />
      { /** titulo */ }
      <Text style={ styles.titulo }>Conecta Vendas</Text>
      { /** subtitulos */ }
      <Text style={ styles.subtitulo }>Conecte sua equipe.</Text>
      <Text style={ [
        styles.subtitulo,
        {
          marginBottom: 30
        }
      ] }>Acelere seus resultados.</Text>
      <ActivityIndicator color="#fff" size={ 50 } />
    </View>
  </View>
}

export default SplashScreen;