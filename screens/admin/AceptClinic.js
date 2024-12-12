import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity,Alert } from "react-native";
import Header from "../../components/Header";
import Card from "../../components/Card";
import upload_modificar from "../../assets/upload_modificar.png";
import SearchBar from "../../components/SearchBar";
import close from "../../assets/close.png";
import bom from "../../assets/bom.png";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "../../config/firebaseConfig";
import buscarClinicas from "../../data/data";

const AceptClinic = () => {
  const [clinicas, setClinicas] = useState([]);

  useEffect(() => {
    const fetchClinicas = async () => {
      const clinicasData = await buscarClinicas();
      setClinicas(clinicasData);
    };

    fetchClinicas();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const firestore = getFirestore(app);
      const clinicaRef = doc(firestore, "clinicas", userId);
      
      await updateDoc(clinicaRef, {
        status: true
      });

      // Atualizar o estado local das clínicas
      const updatedClinicas = clinicas.map((clinica) => {
        if (clinica.userId === userId) {
          return {
            ...clinica,
            isClinicaAceita: true
          };
        }
        return clinica;
      });

      setClinicas(updatedClinicas);
      Alert.alert("Clínica Aceita", "A clínica foi aceita com sucesso!");

    } catch (error) {
      console.error("Erro ao aprovar a clínica:", error);
    }
  };

  const renderItem = ({ item }) => {
    const handleImagePress = () => {
      console.log("Close image pressed!");
    };

    return (
      <View style={styles.item}>
        <Image source={{ uri: item.logo }} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.nome}</Text>
          <Text style={styles.itemDescription}>{item.morada}</Text>
          {!item.isClinicaAceita && (
            <TouchableOpacity onPress={handleImagePress} style={styles.logoImageContainer}>
              <Image source={close} style={styles.logoImage} />
            </TouchableOpacity>
          )}
          {!item.isClinicaAceita && (
            <TouchableOpacity onPress={() => handleApprove(item.userId)} style={styles.logoImageContainer}>
              <Image source={bom} style={styles.logoImage1} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Header />
      <Card image={upload_modificar} />
      <SearchBar />
      <FlatList
        data={clinicas}
        keyExtractor={(item) => item.userId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
  },
  logoImageContainer: {
    position: "absolute",
    right: 0,
    bottom: -20,
  },
  logoImage: {
    width: 40,
    height: 40,
    bottom: 3,
  },
  logoImage1: {
    position: "absolute",
    right: 0,
    width: 40,
    height: 40,
    bottom: 3,
    padding: 20,
    marginRight: 50,
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 25,
    borderRadius: 20,
    margin: 40,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AceptClinic;
