import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import {
  DummyHospitals1,
  DummyHospitals2,
  DummyHospitals3,
  ILHospitalBG,
} from '../../assets';
import { ListHospitals } from '../../components/molecules';

export default function Hospitals() {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospitals
          type="Rumah Sakit"
          name="Citra Bunga Merdeka"
          address="Jln. Surya Sejahtera"
          pic={DummyHospitals1}
        />
        <ListHospitals
          type="Rumah Sakit"
          name="Citra Bunga Merdeka"
          address="Jln. Surya Sejahtera"
          pic={DummyHospitals2}
        />
        <ListHospitals
          type="Rumah Sakit"
          name="Citra Bunga Merdeka"
          address="Jln. Surya Sejahtera"
          pic={DummyHospitals3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.primary[600],
    fontSize: 20,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    textAlign: 'center',
    marginTop: 6,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
});
