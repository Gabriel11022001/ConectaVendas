import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "90%",
    marginStart: "5%", 
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  opcao: {
    width: "45%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  radio: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "gray"
  },
  radioSelecionado: {
    backgroundColor: process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000"
  },
  txtOpcao: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 7
  }

});

export default styles;