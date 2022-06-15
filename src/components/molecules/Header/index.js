import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Gap } from '../../atoms';
import { colors, fonts } from '../../../utils';

export default function Header({ onPress, title }) {
  return (
    <View style={styles.container}>
      {/* <ICBackDark /> */}
      <Button type="icon-only" icon="back-dark" onPress={onPress} />
      <Text style={styles.text}>{title}</Text>
      <Gap width={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    flexDirection: 'row',
    // Ke Tengah Secara Vertikal
    alignItems: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
