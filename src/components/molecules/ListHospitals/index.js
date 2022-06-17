import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DummyHospitals1 } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function ListHospitals() {
  return (
    <View style={styles.container}>
      <Image source={DummyHospitals1} style={styles.image} />
      <View style={styles.wrapperTitle}>
        <Text style={styles.title}>Rumah Sakit Citra Bunga Merdeka</Text>
        <Text style={styles.address}>Jln. Surya Sejahtera 20</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
    marginRight: 16,
  },
  wrapperTitle: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
  },
  address: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    marginTop: 6,
  },
});
