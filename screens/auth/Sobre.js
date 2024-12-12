import React from "react";
import logotipo from "../../assets/logotipo.png";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

const Sobre = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Sobre Nós</Text>
        <Text style={styles.sectionText}>
          Bem-vindo à nossa comunidade de trocas de serviços veterinários! Somos
          uma plataforma dedicada a conectar profissionais e amantes de animais
          de estimação que desejam compartilhar seus talentos e conhecimentos
          para o bem-estar dos nossos companheiros peludos.
        </Text>
        <View style={styles.imageContainer}>
          <Image source={logotipo} style={styles.image} />
        </View>

        <Text style={styles.sectionTitle}>Equipe de Trabalho:</Text>
        <Text style={styles.sectionText}>
          Nossa equipe é composta por profissionais altamente qualificados e
          apaixonados por animais. Estamos empenhados em fornecer a melhor
          experiência para nossos usuários e garantir que a troca de serviços
          veterinários seja realizada de forma segura e eficiente.
        </Text>
        <View style={styles.imageContainer}>
          <Image source={equipa} style={styles.roundedImage} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  roundedImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 100,
  },
});

export default Sobre;