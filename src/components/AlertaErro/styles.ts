import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 99999999
  },
  corpoAlertaErro: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10
  },
  containerBotaoFechar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  titulo: {
    marginTop: 10,
    color: "#000",
    fontWeight: "900",
    fontSize: 16,
    textAlign: "center"
  },
  msg: {
    color: "#000",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center"
  },
  btnOk: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 45,
    backgroundColor: process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000",
    marginTop: 20
  },
  txtBtnOk: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15
  },
  containerIconeAlerta: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  }

});

export { styles };

