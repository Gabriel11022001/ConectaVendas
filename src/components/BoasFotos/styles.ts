import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    width: "90%",
    marginVertical: "5%",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#F3F1FF",
    elevation: 3
  },
  titulo: {
    color: process.env.EXPO_PUBLIC_COR_PRIMARIA,
    fontWeight: "bold",
    fontSize: 16
  },
  containerTopo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  dica: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  dicaTexto: {
    fontSize: 14,
    marginStart: 10,
    marginEnd: 10,
    color: process.env.EXPO_PUBLIC_COR_PRIMARIA
  }

});

export default styles;