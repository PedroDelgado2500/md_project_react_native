import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";


const Card = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image
          source={props.image}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.clinicaName}>Clinica Braganca</Text>
          <Text style={styles.clinicasub}>Cardiologist in apolo hospital</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingStart: 18,
    paddingEnd: 18,
    marginTop: -55,
    marginStart: 14,
    marginEnd: 14,
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 22,
    zIndex: 99,
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  clinicaName: {
    fontSize: 19,
    textAlign: "center",
  },
  clinicasub: {
    color: "#A3A3A3",
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginEnd: 20,
  },
});

export default Card;
