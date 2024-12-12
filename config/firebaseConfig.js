import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import * as Notifications from 'expo-notifications';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAehOex10ixwwka4AQdlXHZBHEonBDmX0",
  authDomain: "clinicaapp-291b5.firebaseapp.com",
  projectId: "clinicaapp-291b5",
  storageBucket: "clinicaapp-291b5.appspot.com",
  messagingSenderId: "262882421531",
  appId: "1:262882421531:web:977aa0763b125e6e9241be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, app };
export const getCurrentUser = () => {
  return auth.currentUser;
};
export const sendNotification = async (title, message, recipient) => {
  // Implement your notification logic here
  try {
    // Envia a notificação push para o usuário especificado
    const token = await messaging().getToken();
    await messaging().send({
      token: recipient, // Token do dispositivo do usuário que receberá a notificação
      notification: {
        title: title,
        body: message,
      },
    });
  } catch (error) {
    console.log('Error sending push notification:', error);
  }
};

