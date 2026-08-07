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
  },
  containerEsqueciSenha: {
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  txtEsqueciSenha: {
    color: corPrimaria,
    fontWeight: "bold",
    textDecorationColor: corPrimaria,
    textDecorationStyle: "solid",
    fontSize: 15
  },
  containerOu: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  containerOuSeparador: {
    flex: 1,
    height: 2,
    backgroundColor: "#D1D5DB",
    borderRadius: 10
  },
  txtOu: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20
  }

});

export { styles };

