import { StyleSheet } from "react-native";

// cor primária
const corPrimaria: string = process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "";

const styles = StyleSheet.create({

  botao: {
    width: "95%",
    marginHorizontal: "2.5%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: corPrimaria,
    marginTop: 30
  },
  botaoDesabilitado: {
    opacity: 0.9
  },
  titulo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }

});

export { styles };

