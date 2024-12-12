import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/logo.jpg";
import { app } from "../../config/firebaseConfig";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
const RegistarScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [morada, setMorada] = useState("");
  const [telefone, setTelefone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const db = getFirestore(app);
      const clinicasCollection = collection(db, "clinicas");

      const clinicasData = {
        nome,
        telefone,
        morada,
        email: userCred.user.email,
        latitude,
        longitude,
        admin: false,
        status: false,
        userId: userCred.user.uid,
      };

      const clinicaRef = doc(clinicasCollection, userCred.user.uid);

      await setDoc(clinicaRef, clinicasData);

      setIsLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      setIsLoading(false);
      switch (error.code) {
        case "auth/email-already-in-use":
          Alert.alert("Error", "Email already in use.");
          break;
        case "auth/weak-password":
          Alert.alert(
            "Error",
            "Weak password. Please choose a stronger password."
          );
          break;
        default:
          Alert.alert("Error", error.message);
          break;
      }
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
          <Text style={styles.welcomeText}>Registro</Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <Input
                placeholder="Nome"
                style={styles.input}
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone</Text>
              <Input
                placeholder="Telefone"
                style={styles.input}
                value={telefone}
                onChangeText={(text) => setTelefone(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Morada</Text>
              <Input
                placeholder="Morada"
                style={styles.input}
                value={morada}
                onChangeText={(text) => setMorada(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Latitude</Text>
              <Input
                placeholder="Latitude"
                style={styles.input}
                value={latitude}
                onChangeText={(text) => setLatitude(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Longitude</Text>
              <Input
                placeholder="Longitude"
                style={styles.input}
                value={longitude}
                onChangeText={(text) => setLongitude(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>

              <Input
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <Input
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secure={true}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>REGISTAR</Text>
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
    borderColor: "#26A69A",
    paddingHorizontal: 10,
    marginBottom: 15,
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
    color: "#26A69A",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegistarScreen;
