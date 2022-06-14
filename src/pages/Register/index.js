import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Header, Input } from '../../components';

export default function Register() {
  return (
    <View>
      <View>
        <Header />
      </View>
      <View style={styles.content}>
        <Input label="Full Name" />
        <Input label="Pekerjaan" />
        <Input label="Email Address" />
        <Input label="Password" />
        <Button title="Continue" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
