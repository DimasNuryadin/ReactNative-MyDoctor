import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '../../../utils';

export default function Input({ label, value, onChangeText, secureTextEntry }) {
  const [border, setBorder] = useState(colors.border);

  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };

  const onBlurForm = () => {
    setBorder(colors.border);
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: border,
    padding: 12,
  }),
  label: {
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
    marginBottom: 6,
    fontSize: 16,
  },
});
