import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  containerBotaoVoltarBotaoNotificacoes: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  },
  containerQuantidadeNotificacoes: {
    backgroundColor: "red",
    borderRadius: 100,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -4,
    right: -4
  },
  txtContainerQuantidadeNotificacoes: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12
  },
  txtMenuTopo: {
    fontSize: 15,
    color: "#fff",
    opacity: 0.8,
    marginTop: 6,
    marginBottom: 6,
    marginEnd: 20
  },
  txtNomeUsuarioLogado: {
    fontWeight: 900,
    fontSize: 25,
    color: "#fff"
  }

});

export default styles;