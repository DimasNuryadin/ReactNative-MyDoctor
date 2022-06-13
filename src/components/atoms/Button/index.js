import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Button({ type, title, onPress }) {
  return (
    // Akan menggantikan komponen view
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor: type === 'secondary' ? 'white' : '#0BCAD4',
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: type => ({
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    color: type === 'secondary' ? '#112340' : 'white',
  }),
});
