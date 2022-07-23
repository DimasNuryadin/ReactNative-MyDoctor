import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { ICSendDark, ICSendLight } from '../../../assets';
import { colors } from '../../../utils';

export default function BtnIcon({ disable, onPress }) {
  if (disable) {
    return (
      <View style={styles.container(disable)}>
        <ICSendDark />
        {!disable && <ICSendLight />}
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
      <ICSendLight />
    </TouchableOpacity>
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
