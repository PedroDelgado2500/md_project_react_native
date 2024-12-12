import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.searchBarContainer}>
      <AntDesign name="search1" size={24} color="#FFFFFF" style={styles.searchIcon} />
      <TextInput
        style={styles.searchBar}
        onChangeText={(text) => setSearchText(text)}
        placeholder="Listagem de troca"
        placeholderTextColor="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "#1C6BA4",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  searchIcon: {
    marginRight: 10
    
  }
});

export default SearchBar;
