import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Input from "../../components/Input";
import logo from "../../assets/iconeLogin.png";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";


const RecuperaSenha = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const sendCode = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Código enviado com sucesso");
      navigation.navigate("Login"); // Navigate to the desired screen

    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao enviar o código. Verifique seu email e tente novamente.");
    }
  };
  

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
          <Image source={logo} style={styles.logo} />
          <Text style={styles.welcomeText}>Recuperar Senha</Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <Input
               name="email"
                placeholder="Email"
                style={styles.input}
                onChangeText={setEmail}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={sendCode}>
              <Text style={styles.buttonText}>Enviar Código</Text>
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
  logo: {
    width: 200,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 100,
  },
  container: {
    margin: 25,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#26A69A",
    paddingHorizontal: 10,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 20,
    borderRadius: 20,
    margin: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 2,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#26A69A",
  },
  forgotPassword: {
    marginTop: 20,
    textAlign: "center",
    color: "#26A69A",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});

export default RecuperaSenha;
