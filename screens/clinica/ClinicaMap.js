import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";

const ClinicaMap = ({route}) => {
  const navigation = useNavigation();
  const { clinicaData } = route.params;

  const bragancaCoords = {
    latitude: 41.808479,
    longitude: -6.760771,
  };


  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: bragancaCoords.latitude,
          longitude: bragancaCoords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: bragancaCoords.latitude,
            longitude: bragancaCoords.longitude,
          }}
          title={clinicaData.nome}
          description={clinicaData.morada}
        />
      </MapView>

      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Icon name="arrow-back" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 9,
    backgroundColor: "blue",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
  },
});

export default ClinicaMap;
