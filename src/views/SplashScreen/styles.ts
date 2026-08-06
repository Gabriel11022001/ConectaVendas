import { StyleSheet } from "react-native";

const envs = process;
// cor de fundo da splash screen
const corFundoSplash: string = envs.env.EXPO_PUBLIC_COR_PRIMARIA_TRANSPARENTE ?? "";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  imagemFundo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  corpo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: corFundoSplash,
    padding: 20
  },
  titulo: {
    color: "#fff",
    fontWeight: 900,
    fontSize: 75,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20
  },
  subtitulo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 20
  }

});

export { styles };

