import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, getData, storeData } from '../../utils';
import { Button, Gap, Header, Input, Profile } from '../../components';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';

// Firebase
import '../../config';
import { getDatabase, ref, set } from 'firebase/database';
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { ILNullPhoto } from '../../assets';
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
        showMessage({
          message: 'password kurang dari 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: 'white',
        });
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
            showMessage({
              message: 'Password berhasil diubah',
              type: 'success',
            });
          })
          .catch(error => {
            console.log('error : ', error);
          });
      })
      .catch(error => {
        showMessage({
          message: 'Password lama salah',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
        console.log('error reauthenticated', error);
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
        // The write failed...
        console.log(error);
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
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
      callback => {
        if (callback.didCancel || callback.error) {
          // console.log(callback);
          showMessage({
            message: 'Opps sepertinya anda tidak memilih fotonya',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          // console.log('Respones getImage : ', callback);

          const source = { uri: callback.assets[0].uri };
          setPhoto(source);

          // Yang diperlukan adalah base64 dari photo untuk upload
          // data:tipefile;base64, ${callback.base64}
          setPhotoForDB(
            `data:${callback.assets[0].type};base64, ${callback.assets[0].base64}`,
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
