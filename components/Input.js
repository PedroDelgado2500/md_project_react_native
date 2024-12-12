import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({ secure = false, placeholder, style ,onChangeText,value}) => {
  return (
    <TextInput
      style={{ ...styles.input, ...style }}
      placeholder={placeholder}
      secureTextEntry={secure}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginVertical: 10,
    borderRadius: 25,
  },
});

export default Input;
