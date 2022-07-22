import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Gap, Header, Input, Profile } from '../../components';
import {
  colors,
  getData,
  showError,
  showSuccess,
  storeData,
} from '../../utils';

// Firebase
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { ILNullPhoto } from '../../assets';
import '../../config';
const auth = getAuth();

export default function UpdateProfile({ navigation }) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });

  const [password, setPassword] = useState('');
  const [currPassword, setCurrPassword] = useState('');
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    currPassword,
  );

  const [photo, setPhoto] = useState(ILNullPhoto);
  // Foto untuk input Database
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({ uri: res.photo });
      setProfile(data);
    });
  }, []);

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('password kurang dari 6 karakter');
      } else {
        updateProfileData();
        updatePasswordData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  const updatePasswordData = () => {
    const user = auth.currentUser;
    // console.log('old password :', currPassword);
    // console.log('new password :', password);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        updatePassword(user, password)
          .then(() => {
            showSuccess('Password berhasil diubah');
          })
          .catch(error => {
            // console.log('error : ', error);
          });
      })
      .catch(error => {
        showError('Password lama salah');
        // console.log('error reauthenticated', error);
      });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;
    const db = getDatabase();
    set(ref(db, 'users/' + profile.uid), profile)
      .then(res => {
        // Data saved successfully!
        // console.log(res);
        storeData('user', data);
      })
      .catch(error => {
        // console.log(error);
        showError(error.message);
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      { includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200 },
      response => {
        if (response.didCancel || response.error) {
          // console.log(response);
          showError('Opps sepertinya anda tidak memilih fotonya');
        } else {
          // console.log('Respones getImage : ', response);

          const source = { uri: response.assets[0].uri };
          setPhoto(source);

          // Yang diperlukan adalah base64 dari photo untuk upload
          // data:tipefile;base64, ${response.base64}
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
        }
      },
    );
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email Address" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password Lama"
            value={currPassword}
            onChangeText={value => setCurrPassword(value)}
            secureTextEntry
          />
          <Gap height={24} />
          <Input
            label="Password Baru"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
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
