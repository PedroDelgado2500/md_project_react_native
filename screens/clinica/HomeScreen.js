import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [clinicaData, setClinicaData] = useState([]);

  // Using Firestore

  useEffect(() => {
    const q = query(collection(db, "clinicas"));

    getDocs(q).then((res) => {
      const clinica = res.docs.map((doc) => doc.data());
      setClinicaData(clinica[0]);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>Seja Bem-Vindo</Text>
        <SearchBar
          placeholder="Pesquisar"
          round
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
        />
        <View style={styles.buttonContainer}>
          <Button
            icon="home"
            mode="contained"
            style={[styles.button, styles.homeButton]}
            labelStyle={styles.label}
            borderRadius={20}
          />
          <Button
            icon="paw"
            mode="contained"
            style={[styles.button, styles.pawButton]}
            labelStyle={styles.label}
            borderRadius={20}
          />
          <Button
            icon="calendar"
            mode="contained"
            style={[styles.button, styles.calendarButton]}
            labelStyle={styles.label}
            borderRadius={20}
          />
          <Button
            icon="phone"
            mode="contained"
            style={[styles.button, styles.phoneButton]}
            labelStyle={styles.label}
            borderRadius={20}
          />
        </View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/screen.png")}
          />
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ClinicaServico", { clinicaData })
            }
          >
            <View style={{ alignItems: "center" }}>
              {clinicaData && clinicaData.logo && clinicaData.logo.uri && (
                <Image
                  source={{ uri: clinicaData.logo.uri }}
                  style={styles.cardImage}
                />
              )}
              <Text style={styles.cardTitle}>{clinicaData.nome}</Text>
              <Text style={styles.cardText}>
                Clinica Veterinária em Servico
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    textAlign: "center",
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,

    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  searchBarInputContainer: {
    backgroundColor: "#EDEDED",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    marginHorizontal: 5,
    width: 60,
    height: 60,
  },
  homeButton: {
    backgroundColor: "#26A69A",
  },
  pawButton: {
    backgroundColor: "#FAF0DB",
  },
  calendarButton: {
    backgroundColor: "#D6F6FF",
  },
  phoneButton: {
    backgroundColor: "#F2E3E9",
  },
  label: {
    display: "none",
  },
  image: {
    width: "100%",
    height: 110,
    resizeMode: "cover",
  },
  cardContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    flex: 1,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingStart: 10,
    paddingEnd: 18,
    marginHorizontal: 14,
    borderRadius: 28,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 99,
    alignItems: "center",
    marginVertical: -50,
  },
  cardImage: {
    width: 130,
    height: 80,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
