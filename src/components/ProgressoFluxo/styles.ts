import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "90%",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginStart: "5%",
    marginEnd: "5%"
  },
  itemFluxo: {
    width: 150,
    height: 150,
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 5
  },
  separador: {
    width: 50,
    height: 1,
    backgroundColor: "#000",
    marginHorizontal: 10,
    elevation: 3
  },
  titulo: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5
  },
  fluxoAtual: {
    borderColor: "#000",
    borderStyle: "dashed",
    borderWidth: 2
  }

});

export { styles };

