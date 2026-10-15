import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 20,
    height: 300,
    borderRadius: 20,
    elevation: 10
  },
  foto: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20
  },
  containerBotaoOperacoes: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 10
  }

});

export { styles };

