import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Papa from "papaparse";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
  writeBatch
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getBytes,
  getDownloadURL,
} from "firebase/storage";
import * as firebase from "../../config/firebaseConfig";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "uuid";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Header from "../../components/Header";
import Card from "../../components/Card";
import upload from "../../assets/upload.png";
import { UserContext } from "../../context/context";
import { useContext } from "react";
import * as MediaLibrary from "expo-media-library";

const UploadProfile = () => {
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate1(date);
    }
  };
  const handleDateChange2 = (event, date) => {
    setShowDatePicker2(false);
    if (date !== undefined) {
      setSelectedDate2(date);
    }
  };

  async function downloadCSV(url) {
    const callback = (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      console.log("progress:", progress);
      // this.setState({
      //   downloadProgress: progress,
      // });
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      "file:///var/mobile/Containers/Data/Application/" + "file.csv",
      {},
      callback
    );

    try {
      const data = await downloadResumable.downloadAsync();

      console.log("uri:", data.uri);
      // FileSystem.writeAsStringAsync(data.uri, data)
      // .then(() => {
      //   console.log('File saved at:');
      // })
      const csvData = await FileSystem.readAsStringAsync(data.uri);

      console.log("Finished downloading to ", csvData);
    } catch (e) {
      console.error(e);
    }
  }

  async function uploadCSV(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4() + ".csv");
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/comma-separated-values",
      });
      console.log("uri:", result.uri);
  
      if (result.type === "success") {
        setSelectedFile(result);
        let durl = await uploadCSV(result.uri);
        console.log("download url", durl);
  
        const csvData = await FileSystem.readAsStringAsync(result.uri);
        const parsedData = Papa.parse(csvData);
        const rows = parsedData.data.slice(1); // Exclude the header row
  
        const firestore = getFirestore(); // Get the Firestore instance
  
        const batch = writeBatch(firestore); // Create a write batch
  
        rows.forEach(async (row) => {
          const dateFromCSV = row[0].trim(); // Get the date from the CSV row
          const clinicaID = user.uid;
  
          const docRef = doc(collection(firestore, "plans")); // Create a new document reference
          batch.set(docRef, { clinicaID, date: dateFromCSV }); // Set the document data in the batch
        });
  
        await batch.commit(); // Commit the write batch
  
        console.log("Documents written successfully");
        Alert.alert("Success", "CSV information loaded successfully.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload file.", error);
      console.log(error);
    }
  };
  
  

  const handleDownload = async () => {
    const q = query(
      collection(firebase.db, "plans"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      try {
        downloadCSV(doc.data().url);
      } catch (error) {
        Alert.alert("Error", "Failed to download CSV file.", error);
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header />
      <Card image={upload} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.inputContainer, { flexDirection: "row" }]}>
          <TouchableOpacity
            style={styles.datePickerContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.input}>
              {selectedDate1.toISOString().substr(0, 10)}
            </Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate1}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
            style={{ backgroundColor: "blue" }}
          />
        )}
        <View style={[styles.inputContainer, { flexDirection: "row" }]}>
          <TouchableOpacity
            style={styles.datePickerContainer}
            onPress={() => setShowDatePicker2(true)}
          >
            <Text style={styles.input}>
              {selectedDate2.toISOString().substr(0, 10)}
            </Text>
          </TouchableOpacity>
        </View>
        {showDatePicker2 && (
          <DateTimePicker
            value={selectedDate2}
            mode="date"
            display="calendar"
            onChange={handleDateChange2}
            style={{ backgroundColor: "blue" }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    margin: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#00008b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 15,
    borderWidth: 8,
    borderRadius: 30,
    height: 80,
  },
  buttonF: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#0000ad",
    justifyContent: "center",
  },
  buttonTextF: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontSize: 30,
    bottom: 200,
  },
  inputContainer: {
    width: "30%",
  },
  input: {
    backgroundColor: "black",
    color: "white",
    height: 50,
    fontSize: 18,
  },
  datePickerContainer: {
    backgroundColor: "black",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UploadProfile;
