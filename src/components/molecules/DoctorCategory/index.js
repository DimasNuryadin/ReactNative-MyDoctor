import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ILCatUmum } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function DoctorCategory() {
  return (
    <View style={styles.container}>
      <ILCatUmum />
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.category}>dokter umum</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    // Ukuran akan mengikuti ukuran yang diperlukan
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 130,
  },
  label: {
    marginTop: 28,
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary[300],
  },
  category: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
});