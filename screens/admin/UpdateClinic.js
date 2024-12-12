import React from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import Header from "../../components/Header";
import Card from "../../components/Card";
import upload_admitir from "../../assets/upload_admitir.png";
import SearchBar from "../../components/SearchBar";

import data from "../../data/data";

const UpdateClinic = (props) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Header />
      <Card image={upload_admitir} />
      <SearchBar />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
  },
});

export default UpdateClinic;
