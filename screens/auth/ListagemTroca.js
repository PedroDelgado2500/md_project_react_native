import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Header2 from "../../components/Header2";
import Pesquisa from "../../components/pesquisa";
import buscarTrocas from "../../data/dataT";

const ListagemTroca = (props) => {
  const [clinicas, setClinicas] = useState([]);

  useEffect(() => {
    const fetchTrocas = async () => {
      const trocas = await buscarTrocas();
      setClinicas(trocas);
    };

    fetchTrocas();
  }, []);

  const renderItem = ({ item }) => {
    const handleImagePress = () => {
      // Action to perform when the close image is pressed
      console.log("Close image pressed!");
    };

    return (
      <View style={styles.item}>
        <View style={styles.itemBorder} />
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.clinicas}</Text>
          <View style={styles.dateContainer}>
        <Text style={styles.itemDescription}>{item.dates[0]}</Text>
        <Text style={styles.dateSeparator}>-</Text>
        <Text style={styles.itemDescription}>{item.dates[1]}</Text>
      </View>
          <TouchableOpacity
            onPress={handleImagePress}
            style={styles.logoImageContainer}
          >
            {/* Image component or any other content for the TouchableOpacity */}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Header2 />
      <Pesquisa />
      <FlatList
        data={clinicas}
        keyExtractor={(item) => item.clinicas}
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
    position: "relative",
  },
  itemBorder: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 6,
    backgroundColor: "red",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  dateSeparator: {
    marginHorizontal: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
  },
  logoImageContainer: {
    position: "absolute",
    right: 0,
    bottom: -20,
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 25,
    borderRadius: 20,
    margin: 40,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ListagemTroca;
