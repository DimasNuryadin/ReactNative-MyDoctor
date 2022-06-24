import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, Header, Input, Loading } from '../../components';
import { colors, useForm } from '../../utils';
// Import Firebase
import '../../config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

import { showMessage } from 'react-native-flash-message';

export default function Register({ navigation }) {
  // const [fullName, setFullName] = useState('');
  // const [profession, setProfession] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // React Hook Custom
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  // Loading
  const [loading, setLoading] = useState(false);

  const mapAuthCodeToMessage = authCode => {
    switch (authCode) {
      case 'auth/invalid-password':
        return 'Password provided is not corrected';

      case 'auth/invalid-email':
        return 'Email provided is invalid';

      case 'auth/email-already-in-use':
        return 'Email sudah pernah digunakan oleh akun lain';

      default:
        return '';
    }
  };

  const onContinue = () => {
    console.log(form);

    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(success => {
        // Signed in
        const user = success.user;
        console.log('user ges', user);
        setLoading(false);
        setForm('reset');

        const data = {
          fullName: '',
          profession: '',
          email: '',
        };

        // Tambah database
        const db = getDatabase();
        set(ref(db, 'users/' + success.user.uid + '/'), data);
        console.log('register success', success.user.uid);
      })
      .catch(error => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
        setLoading(false);
        showMessage({
          message: mapAuthCodeToMessage(errorCode),
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
        console.log('errorCode: ', mapAuthCodeToMessage(errorCode));
      });
    // () => navigation.navigate('UploadPhoto');
  };
  return (
    <>
      <View style={styles.page}>
        <View>
          <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        </View>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
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
            <Gap height={40} />
            <Button title="Continue" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
