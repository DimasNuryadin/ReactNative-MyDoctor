import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ILLogo } from '../../assets';
import { Button, Gap, Input, Link, Loading } from '../../components';
import { colors, fonts, storeData, useForm } from '../../utils';

// Firebase
import '../../config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';

import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation }) {
  const [form, setForm] = useForm({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Munculin Error
  const mapAuthCodeToMessage = authCode => {
    switch (authCode) {
      case 'auth/wrong-password':
        return 'Password Salah';

      case 'auth/user-not-found':
        return 'Email tidak ditemukan';

      default:
        return '';
    }
  };

  const login = () => {
    // console.log(form);
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(res => {
        // Signed in
        const user = res.user;
        console.log('success : ', res);
        // ...
        setLoading(false);

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`))
          .then(snapshot => {
            // ada datanya ?
            if (snapshot.exists()) {
              console.log('Data user : ', snapshot.val());
              storeData('user', snapshot.val());
              navigation.replace('MainApp');
            } else {
              console.log('No data available');
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.log('error : ', mapAuthCodeToMessage(error.code));
        showMessage({
          message: mapAuthCodeToMessage(error.code),
          type: 'default',
          color: colors.white,
          backgroundColor: colors.error,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link title="Forgot My Password" size={12} />
          <Gap height={40} />
          <Button title="Sign In" onPress={login} />
          <Gap height={30} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    marginTop: 40,
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: 155,
  },
});
