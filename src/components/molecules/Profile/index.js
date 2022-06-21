import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { DummyUser, ICRemovePhoto } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function Profile({ name, desc }) {
  return (
    <View style={styles.container}>
      <View style={styles.borderProfile}>
        <Image source={DummyUser} style={styles.avatar} />
        <ICRemovePhoto style={styles.removePhoto} />
      </View>
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
