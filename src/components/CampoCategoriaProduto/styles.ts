import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  containerCampo: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 20,
    padding: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center"
  },
  containerDadosCategoria: {
    marginHorizontal: 10,
    flex: 1
  },
  nomeCategoria: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    marginEnd: 10
  },
  txtDescricaoCategoria: {
    color: "#000",
    fontSize: 14,
    marginTop: 5,
    marginEnd: 10
  }

});

export { styles };

