import { StyleSheet } from "react-native";

// cor primária
const corPrimaria: string = process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "";

const styles = StyleSheet.create({

  botao: {
    width: "90%",
    marginHorizontal: "5%",
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
    fontSize: 20
  },
  botaoCadastroUsuario: {
    width: "90%",
    marginHorizontal: "5%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginTop: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: corPrimaria
  },
  tituloBotaoCadastrarUsuario: {
    color: corPrimaria,
    textAlign: "center",
    fontSize: 20,
    marginStart: 10
  }

});

export { styles };

