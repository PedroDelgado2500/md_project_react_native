import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";


const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

const Header = (props) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.buttonnarrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={27} color="#FFFFFF"></Feather>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.buttonlink}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={27} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C6BA4",
    paddingTop: statusBarHeight,
    flexDirection: "row",
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 44,
  },
  content: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonnarrow: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonlink: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
