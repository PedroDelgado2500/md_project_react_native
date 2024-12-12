import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Input from "../../components/Input";
import upload_confirm from "../../assets/upload_confirm.png";

const AceptCSV = (props) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.screen}>
          <Header />
          <Card image={upload_confirm} />
          <View style={styles.container}>
            <Text style={styles.label}>Nome Clinica</Text>
            <Input placeholder="Nome Clinica" style={styles.input} />
            <Text style={styles.label}>Upload</Text>
            <Input placeholder="Upload CSV" style={styles.input} />
            <Text style={styles.label}>Data</Text>
            <Input placeholder="Select Data" style={styles.input} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log("Upload Efetuado!")}
            >
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    margin: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#1C6BA4",
    paddingHorizontal: 10,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#1C6BA4",
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AceptCSV;
