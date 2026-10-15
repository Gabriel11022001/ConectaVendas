import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  container: {
    width: "90%",
    marginVertical: "5%",
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 20
  },
  containerTituloSubtitulo: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10
  },
  titulo: {
    color: "#000",
    fontWeight: "bold",
    marginEnd: 20,
    fontSize: 16
  },
  subtitulo: {
    color: "#000",
    marginEnd: 20,
    fontSize: 14
  }

});

export { styles };

