import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  ILCatAnak,
  ILCatObat,
  ILCatPsikiater,
  ILCatUmum,
} from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function DoctorCategory({ category, onPress }) {
  const Icon = () => {
    if (category === 'dokter umum') {
      return <ILCatUmum />;
    }
    if (category === 'psikiater') {
      return <ILCatPsikiater />;
    }
    if (category === 'dokter obat') {
      return <ILCatObat />;
    }
    if (category === 'dokter anak') {
      return <ILCatAnak />;
    }
    return <ILCatUmum />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
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
    width: 118,
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
