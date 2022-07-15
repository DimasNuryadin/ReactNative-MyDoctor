import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header, Profile, List, Gap } from '../../components';
import { colors, getData } from '../../utils';
import { ILNullPhoto } from '../../assets';
import { showMessage } from 'react-native-flash-message';

// Firebase
import '../../config';
import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth();

export default function UserProfile({ navigation }) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        showMessage({
          message: 'Berhasil logout',
          type: 'success',
        });
        navigation.replace('GetStarted');
      })
      .catch(error => {
        showMessage({
          message: error,
          type: 'danger',
        });
      });
  };

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = { uri: res.photo };
      setProfile(data);
    });
  }, []);
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last updated yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last updated yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="Last updated yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Sign Out"
        desc="Last updated yesterday"
        type="next"
        icon="help"
        onPress={onLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
