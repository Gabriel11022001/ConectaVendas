import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from "react-native";
import { styles } from './styles';

export interface HomeOpcao {

  titulo: string;
  subtitulo: string;
  icone: any;
  onRedirecionar: () => void;
  cor: string;

}

interface MenuGerenciarHomeProps {

  opcoes: Array<HomeOpcao>;

}

// menu que é apresentado na home
const MenuGerenciarHome = ({
  opcoes
}: MenuGerenciarHomeProps) => {

  return <View style={ styles.container }>
    { opcoes.map((opcao: HomeOpcao) => {

      return <Pressable
        style={ styles.opcao }
        onPress={ opcao.onRedirecionar }
        key={ opcao.titulo ?? "" }>
        <View style={ styles.containerIconeOpcaoIconeSetaDireita }>
          <View style={ [
            styles.viewFundoIcone,
            {
              backgroundColor: opcao.cor
            }
          ] }>
            { opcao.icone }
          </View>
          <MaterialIcons name="arrow-forward-ios" size={ 24 } color="black" />
        </View>
        <View>
          <Text style={ styles.titulo }>{ opcao.titulo }</Text>
          <Text style={ styles.subtitulo }>{ opcao.subtitulo }</Text>
        </View>
      </Pressable>
    }) }
  </View>
}

export default MenuGerenciarHome;