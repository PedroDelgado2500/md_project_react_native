import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import Input from "../../components/Input";
import { db } from "../../config/firebaseConfig";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const addMessage = async () => {
    try {
      if (name !== "" && email !== "" && message !== "") {
        const docRef = await addDoc(collection(db, "message"), {
          name: name,
          email: email,
          message: message,
        });
        setName("");
        setEmail("");
        setMessage("");

        Alert.alert("Mensagem enviada com sucesso", "OK");
      } else {
        Alert.alert("Falha ao enviar a mensagem", "OK");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Erro", "OK");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fale Conosco</Text>
      <Input
        placeholder="Seu Nome"
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="your.email@ipb.pt"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Enter a message..."
        multiline={true}
        style={[styles.textInput, styles.textArea]}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addMessage}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 20,
    borderRadius: 20,
    height: 65,
    width: 250,
    margin: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 16,
    borderColor: "#26A69A",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  textArea: {
    height: 200,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#26A69A",
    paddingHorizontal: 10,
    marginBottom: 15,
    padding: 10,
  },
});

export default Contact;
