import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  },
  opcao: {
    backgroundColor: "#fff",
    padding: 20,
    width: "45%",
    borderRadius: 20,
    elevation: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 220
  },
  viewFundoIcone: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  containerIconeOpcaoIconeSetaDireita: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5
  },
  subtitulo: {
    fontSize: 14,
    color: "#000",
    opacity: 0.7,
    marginTop: 5
  }

});

export { styles };

