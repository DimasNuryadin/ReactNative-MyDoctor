import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Gap } from '../../atoms';
import { colors, fonts } from '../../../utils';
import DarkProfile from './DarkProfile';

export default function Header({ onPress, title, type }) {
  if (type === 'dark-profile') {
    return <DarkProfile onPress={onPress} />;
  }
  return (
    <View style={styles.container(type)}>
      {/* <ICBackDark /> */}
      <Button
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: type => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
    flexDirection: 'row',
    // Ke Tengah Secara Vertikal
    alignItems: 'center',
  }),
  text: type => ({
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: type === 'dark' ? colors.white : colors.text.primary,
  }),
});
