import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  ICDoctor,
  ICDoctorActive,
  ICHospitals,
  ICHospitalsActive,
  ICMessages,
  ICMessagesActive,
} from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function TabItem({ title, active, onPress, onLongPress }) {
  const Icon = () => {
    if (title === 'Doctor') {
      return active ? <ICDoctorActive /> : <ICDoctor />;
    }
    if (title === 'Messages') {
      return active ? <ICMessagesActive /> : <ICMessages />;
    }
    if (title === 'Hospitals') {
      return active ? <ICHospitalsActive /> : <ICHospitals />;
    }
    return <ICDoctor />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  // active ini bernilai true atau false
  text: active => ({
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontSize: 10,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});
