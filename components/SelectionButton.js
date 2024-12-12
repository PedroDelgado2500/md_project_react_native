import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RoundedInput = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Selecione uma opção</Text>
        <Ionicons name="chevron-down-outline" size={24} color="#009688" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#009688',
    width:'70%'
  },
  buttonText: {
    color: '#009688',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default RoundedInput;