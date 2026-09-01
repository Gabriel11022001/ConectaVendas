import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  dialogContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    zIndex: 99999999,
    elevation: 999999999
  },
  corpo: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: "90%",
    elevation: 99999
  },
  imgIlustracao: {
    width: "80%",
    height: 400,
    resizeMode: "center"
  },
  containerMensagem: {
    width: "80%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  titulo: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: 900,
    marginBottom: 5
  },
  msg: {
    color: "#000",
    textAlign: "center",
    marginStart: 20,
    marginEnd: 20, 
    fontSize: 15,
    opacity: 0.7
  },
  containerBotoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginHorizontal: "10%",
    marginVertical: 20
  },
  botao: {
    width: "45%",
    height: 60,
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  txtBotao: {
    color: "#000",
    fontSize: 15,
    textAlign: "center"
  }

});

export default styles;