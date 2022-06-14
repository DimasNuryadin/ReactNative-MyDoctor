import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Link({ title, size, align }) {
  return (
    <View>
      <Text style={styles.text(size, align)}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: (size, align) => ({
    color: '#7D8797',
    fontFamily: 'Nunito-Regular',
    fontSize: size,
    textAlign: align,
    textDecorationLine: 'underline',
  }),
});
