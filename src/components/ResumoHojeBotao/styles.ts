import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#F0F0FF",
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "95%",
    marginStart: "2.5%",
    marginEnd: "2.5%",
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    elevation: 5
  },
  containerConteudo: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center"
  },
  icone: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
    width: 60,
    height: 60,
    marginEnd: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  titulo: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 15,
    color: process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000",
    marginEnd: 10
  },
  subtitulo: {
    color: "#000",
    fontSize: 14,
    marginEnd: 10
  },
  txtVerResumo: {
    fontWeight: "bold",
    color: process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000",
    marginEnd: 5
  }

});

export default styles;