import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import Card from "../../components/Card";
import userPhoto from "../../assets/userPhoto.png";

import { useNavigation } from "@react-navigation/native";

const Dashboard = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Header />
      <Card image={userPhoto} />
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={styles.uploadContainerRosa}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UploadProfile")}
            >
              <Image
                source={require("../../assets/upload.png")}
                style={styles.uploadIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Upload CSV</Text>
          </View>
          <View style={styles.uploadContainerRosa}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UpdateClinic")}
            >
              <Image
                source={require("../../assets/upload_admitir.png")}
                style={styles.uploadIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Modificar Clinica</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.uploadContainerAmarelo}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AceptClinic")}
            >
              <Image
                source={require("../../assets/upload_modificar.png")}
                style={styles.uploadIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Admitir Clinica</Text>
          </View>
          <View style={styles.uploadContainerAmarelo}>
            <TouchableOpacity onPress={() => navigation.navigate("AceptCSV")}>
              <Image
                source={require("../../assets/upload_confirm.png")}
                style={styles.uploadIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Confirmacao CSV</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginTop: 18,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  uploadContainerRosa: {
    alignItems: "center",
    backgroundColor: "#F5E1E9",
    borderRadius: 24,
    paddingVertical: 20,
    marginBottom: 20,
  },
  uploadContainerAmarelo: {
    alignItems: "center",
    backgroundColor: "#FAF0DB",
    borderRadius: 24,
    paddingVertical: 20,
    marginBottom: 20,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Dashboard;
