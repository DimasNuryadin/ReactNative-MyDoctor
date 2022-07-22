import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ILHospitalBG } from '../../assets';
import { ListHospitals } from '../../components/molecules';
import { colors, fonts } from '../../utils';

// Firebase Database
import { child, get, getDatabase, ref } from 'firebase/database';
import '../../config';
const dbRef = ref(getDatabase());

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    get(child(dbRef, 'hospitals/'))
      .then(res => {
        if (res.exists()) {
          // console.log(res.val());
          setHospitals(res.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospitals.map(item => {
          return (
            <ListHospitals
              key={item.id}
              type={item.type}
              name={item.name}
              address={item.address}
              pic={{ uri: item.image }}
            />
          );
        })}
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
