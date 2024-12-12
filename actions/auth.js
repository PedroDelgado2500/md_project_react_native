import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { app } from "../config/firebaseConfig";
useEffect(() => {
  const fff = async () => {
    try {
      const auth = getAuth(app); // Access to authentication service
      onAuthStateChanged(auth, async (user) => {
        // Signin as anonymous
        if (user === null) await signInAnonymously(auth);
        // Access to data that does not require personal authenticationgetPublicData();
      });
    } catch (error) {
      console.log(error);
    }
  };
  fff();
}, []);
