import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header2 from "../../components/Header2";
import Input from "../../components/Input";
import * as ImagePicker from "expo-image-picker";
import { storage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, getCurrentUser } from "../../config/firebaseConfig";

const EditarDados = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [morada, setMorada] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {
    const fetchClinicaData = async () => {
      const currentUser = getCurrentUser();

      if (currentUser) {
        const userId = currentUser.uid;
        try {
          const clinicaQuery = query(
            collection(db, "clinicas"),
            where("userId", "==", userId)
          );
          const clinicaSnapshot = await getDocs(clinicaQuery);

          if (!clinicaSnapshot.empty) {
            const clinicaDoc = clinicaSnapshot.docs[0];
            const clinicaData = clinicaDoc.data();
            setNome(clinicaData.nome);
            setEmail(clinicaData.email);
            setTelefone(clinicaData.telefone);
            setMorada(clinicaData.morada);
          }
        } catch (error) {
          console.log("Erro ao obter dados da clínica:", error);
        }
      }
    };

    fetchClinicaData();
  }, []);

  const handleEditar = () => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      const clinicaId = currentUser.uid;
      try {
        const clinicaRef = doc(db, "clinicas", clinicaId);
        updateDoc(clinicaRef, {
          nome,
          email,
          telefone,
          morada,
          logo: selectedFile,
        })
          .then(() => {
            console.log("Dados da clínica atualizados com sucesso!");
            Alert.alert("Sucesso", "Dados atualizados com sucesso!");
          })
          .catch((error) => {
            console.log("Erro ao atualizar os dados da clínica:", error);
            Alert.alert("Erro", "Falha ao atualizar os dados.");
          });
      } catch (error) {
        console.log("Erro ao obter dados da clínica:", error);
        Alert.alert("Erro", "Falha ao obter os dados da clínica.");
      }
    } else {
      Alert.alert("Erro", "Nenhum usuário logado.");
    }
  };

  const handleUpload = async () => {
    try {
      const currentUser = getCurrentUser();

      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];

        if (selectedAsset && selectedAsset.uri) {
          setSelectedFile(selectedAsset);

          const response = await fetch(selectedAsset.uri);
          const blob = await response.blob();

          const storageRef = ref(storage, `logos/${currentUser.uid}`);
          const uploadTask = uploadBytes(storageRef, blob);

          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log("Error uploading logo:", error);
              Alert.alert("Erro", "Falha ao fazer upload do logotipo.");
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(storageRef); // Obter o URL de download
                setSelectedFile(downloadURL); // Definir o URL do logotipo
                console.log("Logo uploaded:", downloadURL);
              } catch (error) {
                console.log("Error getting download URL:", error);
                Alert.alert(
                  "Erro",
                  "Falha ao obter o URL de download do logotipo."
                );
              }
            }
          );
        }
      }
    } catch (error) {
      console.log("Error selecting image:", error);
      Alert.alert("Erro", "Falha ao selecionar a imagem.");
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
          <Header2 />
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <Input style={styles.input} value={nome} onChangeText={setNome} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <Input
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone</Text>
              <Input
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Morada</Text>
              <Input
                value={morada}
                onChangeText={setMorada}
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
              >
                <Text style={styles.buttonText}>
                  {selectedFile && selectedFile.fileName
                    ? selectedFile.fileName
                    : "Selecionar logotipo"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleEditar}>
              <Text style={styles.buttonText}>Editar Dados</Text>
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
    margin: 25,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#009688",
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
  uploadButton: {
    backgroundColor: "#26A69A",
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default EditarDados;
