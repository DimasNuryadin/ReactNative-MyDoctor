import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { ILLogo } from '../../assets';
import { colors } from '../../utils/colors';
import { fonts, getData } from '../../utils';

// Firebase
import '../../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Props yang disediakan react navigation
export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      // Cek apakah sudah login atau belum
      const auth = getAuth();
      onAuthStateChanged(auth, user => {
        if (user) {
          // User Login
          console.log(user);
          navigation.replace('MainApp');
        } else {
          // User logout
          // replace() = user tidak bisa kembali ke page ini ketika tombol back ditekan, karena tidak menyimpan history sebelumnya
          navigation.replace('GetStarted');
        }
      });
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
