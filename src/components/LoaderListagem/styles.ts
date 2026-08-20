import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  loader: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginVertical: "20%"
  },
  txtLoader: {
    color: "#000",
    textAlign: "center",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 10,
    fontSize: 15
  },
  img: {
    width: "90%",
    height: 400,
    resizeMode: "center"
  }

});

export { styles };

