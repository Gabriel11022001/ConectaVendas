import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  item: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E4E4F0",
    padding: 10,
    justifyContent: "space-between"
  },
  iconeDadosCategoria: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%"
  },
  operacoes: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  containerIcone: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 10
  },
  nomeCategoria: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    marginBottom: 3,
    marginEnd: 10
  },
  descricao: {
    color: "#000",
    marginEnd: 10,
    fontSize: 14
  }, 
  operacao: {
    marginHorizontal: 5
  },
  corCategoria: {
    width: 20,
    height: 20,
    borderRadius: 10
  }

});

export { styles };

