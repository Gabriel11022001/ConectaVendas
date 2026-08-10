import { StyleSheet } from "react-native";

const corPrimariaFundoTransparente: string = process.env.EXPO_PUBLIC_COR_PRIMARIA_TRANSPARENTE ?? "";

const styles = StyleSheet.create({

  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: corPrimariaFundoTransparente,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999999
  },
  mensagem: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginHorizontal: 20
  },
  titulo: {
    fontSize: 60,
    color: "#fff",
    fontWeight: 900,
    textAlign: "center",
    marginBottom: 20
  },
  imagemFundo: {
    
  }

});

export { styles };

