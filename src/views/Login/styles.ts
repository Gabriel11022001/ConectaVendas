import { StyleSheet } from "react-native";

const corPrimaria: string = process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "";

const styles = StyleSheet.create({

  titulo: {
    color: corPrimaria,
    fontWeight: 900,
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: 20,
    marginVertical: 10
  },
  subtitulo: {
    color: "#000",
    textAlign: "center",
    marginHorizontal: 20,
    fontSize: 15
  },
  viewLogo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: "cover"
  }

});

export { styles };

