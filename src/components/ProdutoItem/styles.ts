import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  item: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E4E4F0",
    padding: 20,
    justifyContent: "space-between",
    elevation: 5
  },
  containerTopo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  foto: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 12
  },
  containerFoto: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F5F5FA"
  },
  containerDadosBasicosProduto: {
    alignItems: "flex-start",
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "flex-start",
    height: "100%"
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#202044",
    marginBottom: 5,
    marginEnd: 10
  },
  descricaoProduto: {
    fontSize: 14,
    marginEnd: 10,
    color: "#73758F"
  },
  preco: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#146C43",
    marginEnd: 10,
    marginTop: 10
  },
  containerEstoque: {
    flexDirection: "row",
    alignItems: "center",
    marginEnd: 10,
    marginTop: 10,
    marginBottom: 5
  },
  estoque: {
    fontSize: 14,
    marginEnd: 10,
    color: "#73758F",
    marginStart: 5
  },
  separador: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    height: 1,
    backgroundColor: "#f1f1f1"
  },
  containerDemaisDados: {
    flex: 1
  },
  containerDadoProdutoLinha: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },
  btnVisualizarFotos: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  txtVisualizarFotos: {
    color: "#000",
    fontSize: 16,
    textAlign: "center"
  }

});

export { styles };

