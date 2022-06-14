import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ICBackDark } from '../../../assets';

export default function Header() {
  return (
    <View style={styles.container}>
      <ICBackDark />
      <Text>Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
