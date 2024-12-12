import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const ClinicaScreen = (props) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>SAIR</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Clínica Veterinária</Text>
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
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("EditarDados")}
            >
              <Image
                source={require("../../assets/editar.png")}
                style={[styles.cardImage, { marginRight: 10 }]}
              />
              <View>
                <Text style={styles.cardTitle}>Editar Dados</Text>
                <Text style={styles.cardText}>Alterar os dados da clínica</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("EfetuarTroca")}
            >
              <Image
                source={require("../../assets/efetuartroca.png")}
                style={[styles.cardImage, { marginRight: 10 }]}
              />
              <View>
                <Text style={styles.cardTitle}>Efetuar Troca</Text>
                <Text style={styles.cardText}>Troca de Servicos Clinica</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ListagemTroca")}
            >
              <Image
                source={require("../../assets/listagemtroca.png")}
                style={[styles.cardImage, { marginRight: 10 }]}
              />
              <View>
                <Text style={styles.cardTitle}>Listagem de Troca</Text>
                <Text style={styles.cardText}>Consultar Pedidos Troca</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  logoutButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  logoutButtonText: {
    color: "#000000",
    fontWeight: "bold",
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
    width: 70,
    height: 70,
  },
  homeButton: {
    backgroundColor: "#26A69A",
  },
  pawButton: {
    backgroundColor: "#26A69A",
  },
  calendarButton: {
    backgroundColor: "#D6F6FF",
  },
  phoneButton: {
    backgroundColor: "#D6F6FF",
  },
  label: {
    display: "none",
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    marginVertical: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ClinicaScreen;
