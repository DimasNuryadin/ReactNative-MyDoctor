import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, Header, Link } from '../../components';
import { ICAddPhoto, ICRemovePhoto, ILNullPhoto } from '../../assets';
import { colors, fonts } from '../../utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';

export default function UploadPhoto({ navigation }) {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary({}, callback => {
      console.log(callback);
      if (callback.didCancel || callback.error) {
        showMessage({
          message: 'Opps sepertinya anda tidak memilih fotonya',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        const source = { uri: callback.assets[0].uri };
        setPhoto(source);
        setHasPhoto(true);
      }
    });
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
          <Text style={styles.name}>Shayna Melinda</Text>
          <Text style={styles.profession}>Product Designer</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={() => navigation.replace('MainApp')}
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
