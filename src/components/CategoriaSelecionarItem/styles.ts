import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  item: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 20,
    padding: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    elevation: 10
  },
  itemSelecionado: {
    borderWidth: 3,
    borderColor: process.env.EXPO_PUBLIC_COR_PRIMARIA,
    borderStyle: "dashed"
  },
  nomeCategoria: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    marginHorizontal: 10
  },
  txtDescricaoCategoria: {
    color: "#000",
    fontSize: 14,
    marginHorizontal: 10
  }

});

export { styles };

