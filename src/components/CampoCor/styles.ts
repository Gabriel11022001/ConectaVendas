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
    backgroundColor: "#fff"
  },
  campo: {
    color: "#000",
    fontSize: 18,
    marginStart: 10,
    flex: 1
  },
  erro: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold"
  },
  corApresentar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f1f1f1",
    marginEnd: 6
  },
  txtSelecioneCor: {
    color: "#000",
    fontWeight: "bold"
  }

});

export { styles };

