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

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

const Header = (props) => {
  const navigation = useNavigation();

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
        <Text style={styles.headerText}>Clínica de serviço</Text>
        <TouchableOpacity activeOpacity={0.9} style={styles.buttonlink}>
          <Feather name="x" size={27} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009688",
    paddingTop: statusBarHeight,
    flexDirection: "row",
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 100,
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
  headerText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginTop: 37,
  },
});

export default Header;
