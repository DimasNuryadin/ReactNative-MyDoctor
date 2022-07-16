import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, Input } from '../../components';
import { colors, showError, storeData, useForm } from '../../utils';
// Import Firebase
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useDispatch } from 'react-redux';
import '../../config';

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

  // Redux, fungsi untuk mengubah reducer
  const dispatch = useDispatch();

  const onContinue = () => {
    // console.log(form);

    dispatch({ type: 'SET_LOADING', value: true });
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(success => {
        // Signed in
        // const user = success.user;
        // console.log('user ges', user);
        dispatch({ type: 'SET_LOADING', value: false });
        setForm('reset');

        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid,
        };

        // Tambah database
        const db = getDatabase();
        set(ref(db, 'users/' + success.user.uid + '/'), data);
        // console.log('register success', success.user.uid);

        // Masukan data ke local storage
        storeData('user', data);

        // lalu pindah halaman dan kirim data melalui parameter
        navigation.navigate('UploadPhoto', data);
      })
      .catch(error => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        dispatch({ type: 'SET_LOADING', value: false });
        showError(error.code);
        // console.log('errorCode: ', errorCode);
      });
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
