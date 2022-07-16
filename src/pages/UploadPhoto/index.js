import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, Header, Link } from '../../components';
import { ICAddPhoto, ICRemovePhoto, ILNullPhoto } from '../../assets';
import { colors, fonts, showError, storeData } from '../../utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { getDatabase, ref, update } from 'firebase/database';

export default function UploadPhoto({ navigation, route }) {
  // Mengambil data dari page sebelumnya
  const { fullName, profession, uid } = route.params;
  const [photoForDB, setPhotoForDB] = useState('');

  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary(
      { includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200 },
      callback => {
        if (callback.didCancel || callback.error) {
          // console.log(callback);
          showError('Opps sepertinya anda tidak memilih fotonya');
        } else {
          // console.log('Respones getImage : ', callback);

          const source = { uri: callback.assets[0].uri };
          setPhoto(source);
          setHasPhoto(true);

          // Yang diperlukan adalah base64 dari photo untuk upload
          // data:tipefile;base64, ${callback.base64}
          setPhotoForDB(
            `data:${callback.assets[0].type};base64, ${callback.assets[0].base64}`,
          );
        }
      },
    );
  };

  const uploadAndContinue = () => {
    // update database
    const db = getDatabase();
    update(ref(db, 'users/' + uid + '/'), {
      photo: photoForDB,
    });

    // Update local storage untuk photo
    const data = route.params;
    // key: photo, value: photoForDB
    data.photo = photoForDB;
    storeData('user', data);

    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header
        title="Upload Photo"
        onPress={() => navigation.navigate('Register')}
      />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <ICRemovePhoto style={styles.icPhoto} />}
            {!hasPhoto && <ICAddPhoto style={styles.icPhoto} />}
          </TouchableOpacity>
          <Gap height={26} />
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatarWrapper: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  icPhoto: {
    position: 'absolute',
    right: 6,
    bottom: 8,
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  profession: {
    fontFamily: fonts.primary.normal,
    fontSize: 18,
    marginTop: 4,
    color: colors.text.secondary,
  },
});
