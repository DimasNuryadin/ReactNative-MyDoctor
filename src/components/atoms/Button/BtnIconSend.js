import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ICSendDark, ICSendLight } from '../../../assets';
import { colors } from '../../../utils';

export default function BtnIcon({ disable }) {
  return (
    <View style={styles.container(disable)}>
      {disable && <ICSendDark />}
      {!disable && <ICSendLight />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: disable => ({
    backgroundColor: disable ? colors.disable : colors.tertiary,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
  }),
});
