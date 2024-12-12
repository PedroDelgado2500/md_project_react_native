import AplicationNavigation from "./navigation/AplicationNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "./config/firebaseConfig";


export default function App() {
  return (
    <NavigationContainer>
      <AplicationNavigation />
    </NavigationContainer>
  );
}
