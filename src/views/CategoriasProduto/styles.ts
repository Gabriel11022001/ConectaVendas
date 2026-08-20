import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  loaderCarregamentoCategorias: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: 20,
    width: "100%",
    height: "100%",
    marginVertical: "60%"
  },
  txtCarregando: {
    color: process.env.EXPO_PUBLIC_COR_PRIMARIA ?? "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10
  }

});

export { styles };

