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
  ActivityIndicator
} from "react-native";
import Input from "../../components/Input";
import logo from "../../assets/iconeLogin.png";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../../config/firebaseConfig";
import {UserContext} from "../../context/context"
import { useContext } from 'react';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      setUser(user)

      if (user) {
        const db = getFirestore(app);
        // Consulta as clínicas com o campo "admin" igual a true e com o email do usuário logado
        const q = query(
          collection(db, "clinicas"),
          where("admin", "==", true),
          where("email", "==", user.email),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const clinica = querySnapshot.docs[0].data();
          if (clinica.status === false) {
            Alert.alert("Clínica em estado pendente", "A clínica está aguardando aprovação.");
            setIsLoading(false);
            return;
          }
          navigation.navigate("Dashboard");
        } else {
          navigation.navigate("ClinicaScreen");
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erro", "Email ou senha incorretos");
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
          <Text style={styles.welcomeText}>Bem-Vindo</Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <Input
                name="email"
                placeholder="Email"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <Input
                secure
                placeholder="Password"
                style={styles.input}
                type="password"
                name="password"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("RegistarScreen")}
            >
              <Text style={styles.buttonText}>NOVO REGISTO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("RecuperaSenha")}
            >
              <Text style={styles.forgotPassword}>
                Esqueceste-te da tua Senha?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#009688" />
      </View>
    )}
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
    borderColor: "#009688",
    paddingHorizontal: 10,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 20,
    borderRadius: 20,
    margin: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 2,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
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
    color: "#26A69A",
    textAlign: "center",
  },
});

export default Login;
