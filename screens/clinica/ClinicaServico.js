import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header2 from "../../components/Header2";
import Card2 from "../../components/Card2";
import userPhoto from "../../assets/clinic.png";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const ClinicaServico = ({ route }) => {
  const navigation = useNavigation();
  const { clinicaData } = route.params;

  const mapStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];
  const getImageUrl = async () => {
    if (clinicaData.logo) {
      return clinicaData.logo;
    } else {
      return null;
    }
  };
  

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.screen}>
        <Header2 />
        <Card2 image={getImageUrl()} />
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={{alignItems: "left"}}>
              <Text style={styles.cardTitle1}>Email: {clinicaData.email}</Text>
              <Text style={styles.cardTitle1}>Telefone: {clinicaData.telefone}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ClinicaMap",{clinicaData})}>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 41.8074,
                  longitude: -6.7588,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}

                customMapStyle={mapStyles}
              >
                <Marker
                  coordinate={{ latitude: clinicaData.latitude, longitude: clinicaData.longitude }}
                  title={clinicaData.morada}
                />
              </MapView>
            </View>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
              {clinicaData.morada}
              </Text>
              <Text style={styles.addressText1}>Instruções</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 104,
    fontWeight: "bold",
  },
  label: {
    display: "none",
  },
  clinicName: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 20,
  },
  cardContainer: {
    flexDirection: "column",
    paddingHorizontal: 10,
    flex: 1,
  },
  card: {
    borderRadius: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingStart: 10,
    paddingEnd: 10,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    zIndex: 99,
    alignItems: "center",
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "left",
    padding: 10,
  },
  cardTitle1: {
    fontSize: 18,
    textAlign: "left",
    padding: 10,
    margin: -10,
  },
  mapContainer: {
    height: 200,
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  addressContainer: {
    alignItems: "center",
    marginTop: -10,
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingStart: 10,
    paddingEnd: 10,
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  addressText1: {
    color: "#009688",
    marginRight: 210,
    padding: 8,
    fontSize: 10,
    fontWeight: "bold",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 2,
  },
});

export default ClinicaServico;
