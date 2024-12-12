import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Header2 from "../../components/Header2";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  db,
  getCurrentUser,
  sendNotification,
} from "../../config/firebaseConfig";
import * as Notifications from 'expo-notifications';



const EfetuarTroca = (props) => {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clinicas, setClinics] = useState([]);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    // Fetch clinics from Firestore
    const fetchClinics = async () => {
      try {
        const clinicCollection = collection(db, "clinicas");
        const clinicSnapshot = await getDocs(clinicCollection);
        const clinicsData = [];
        clinicSnapshot.forEach((doc) => {
          clinicsData.push({ id: doc.id, ...doc.data() });
        });
        setClinics(clinicsData);
      } catch (error) {
        console.log("Error fetching clinics:", error);
      }
    };

    fetchClinics();
  }, []);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const handleClinicSelect = (clinicas) => {
    setSelectedClinic(clinicas);
    setModalVisible(false);
  };

  const handleClinicChange = (value) => {
    setSelectedDates([]);
    setSelectedClinic(null);
  };

  const handleConfirm = async () => {
    if (selectedDates.length === 0) {
      Alert.alert("Selecione a primeira data.");
    } else if (selectedDates.length === 1) {
      Alert.alert("Selecione a segunda data.");
    } else if (selectedClinic) {
      // Verificar se a data selecionada já ocorreu
      const currentDate = new Date();
      const selectedDay1 = new Date(selectedDates[0]);
      const selectedDay2 = new Date(selectedDates[1]);
      if (selectedDay1 < currentDate || selectedDay2 < currentDate) {
        Alert.alert(
          "A data selecionada já ocorreu. A troca não pode ser efetuada."
        );
        return;
      }
  
      try {
        // Enviar notificação para a outra clínica
        const message = `Você recebeu uma solicitação de troca de serviço da clínica ${selectedClinic} para as datas ${selectedDates[0]} e ${selectedDates[1]}.`;
        await sendNotification("Solicitação de troca", message, selectedClinic.token);
  
        // Registrar a troca no sistema
        registerTroca(selectedClinic, selectedDates);
  
        Alert.alert(
          "Troca solicitada",
          `Você solicitou a troca de serviço com a clínica ${selectedClinic} para as datas ${selectedDates[0]} e ${selectedDates[1]}. Aguarde a resposta da outra clínica.`
        );
      } catch (error) {
        console.log("Error sending notification:", error);
        Alert.alert("Falha ao enviar a notificação.");
      }
    } else {
      Alert.alert("Selecione uma clínica.");
    }
  };
  

  const registerTroca = async (clinicas, dates) => {
    try {
      const currentUser = getCurrentUser();
      const db = getFirestore();
      const trocaRef = doc(db, "trocas", currentUser.uid);

      await setDoc(trocaRef, { clinicas, dates });
    } catch (error) {
      console.log("Error registering troca:", error);
    }
  };

  const handleDayPress = (day) => {
    if (selectedDates.length === 0) {
      Alert.alert("Selecionado a primeira data.");
    } else if (selectedDates.length === 1) {
      Alert.alert("Selecionado a segunda data.");
    } else {
      return;
    }

    if (selectedDates.length < 2) {
      setSelectedDates((prevDates) => [...prevDates, day.dateString]);
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
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={false}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Icon name="times" size={20} color="#fff" />
                </TouchableOpacity>
                <View>
                  {clinicas.map((clinica) => (
                    <TouchableOpacity
                      key={clinica.id}
                      onPress={() => handleClinicSelect(clinica.nome)}
                    >
                      <Text style={styles.clinicListItemText}>
                        {clinica.nome}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
            {selectedDates.length === 0 && (
              <Text style={styles.messageText}>Selecione a primeira data</Text>
            )}
            {selectedDates.length === 1 && (
              <Text style={styles.messageText}>Selecione a segunda data</Text>
            )}
            <TouchableOpacity
              style={styles.button2}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>
                {selectedClinic || "Seleciona Clínica"}
              </Text>
              <Icon name="chevron-down" size={25} color="#009688" />
            </TouchableOpacity>
            <Calendar style={styles.calendar} onDayPress={handleDayPress} />
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText1}>Efetuar Trocas</Text>
            </TouchableOpacity>
            {selectedDates.length === 2 && selectedClinic && (
              <Text style={styles.confirmation}>
                Pedido marcado para {selectedDates[0]} e {selectedDates[1]} na{" "}
                {selectedClinic}
              </Text>
            )}
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
    marginBottom: 15,
  },
  calendar: {
    marginBottom: 100,
  },
  label: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 20,
    borderRadius: 20,
    margin: 3,
  },
  buttonText1: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmation: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#009688",
  },
  clinicListItemText: {
    color: "white",
    marginRight: 15,
    fontSize: 50,
    fontWeight: "bold",
  },
  button2: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#009688",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: "100%",
    alignSelf: "center",
    marginBottom: 30,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 30,
    zIndex: 1,
  },
  buttonText: {
    color: "#009688",
    marginRight: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 30,
  },
  messageText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#009688",
    textAlign: "center",
  },
});

export default EfetuarTroca;
