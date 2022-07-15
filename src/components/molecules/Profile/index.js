import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ICRemovePhoto } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function Profile({ name, desc, isRemove, photo, onPress }) {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.borderProfile}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <ICRemovePhoto style={styles.removePhoto} />}
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <ICRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
      {/* Kalau ada Props Name */}
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{desc}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  name: {
    color: colors.text.primary,
    fontSize: 20,
    fontFamily: fonts.primary[600],
    marginTop: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  profession: {
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    textAlign: 'center',
  },
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});
