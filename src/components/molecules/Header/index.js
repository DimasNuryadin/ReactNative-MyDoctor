import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ICBackDark } from '../../../assets';
import { Gap } from '../../atoms';
import { colors } from '../../../utils';

export default function Header() {
  return (
    <View style={styles.container}>
      <ICBackDark />
      <Text style={styles.text}>Daftar Akun</Text>
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
    fontFamily: 'Nunito-SemiBold',
    color: colors.text.primary,
  },
});
