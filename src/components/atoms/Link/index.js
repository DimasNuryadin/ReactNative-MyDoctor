import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../../utils';

export default function Link({ title, size, align }) {
  return (
    <View>
      <Text style={styles.text(size, align)}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: (size, align) => ({
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
    fontSize: size,
    textAlign: align,
    textDecorationLine: 'underline',
  }),
});
