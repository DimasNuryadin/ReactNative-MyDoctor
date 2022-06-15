import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Gap, Header, Input } from '../../components';
import { colors } from '../../utils';

export default function Register({ navigation }) {
  return (
    <View style={styles.page}>
      <View>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      </View>
      <View style={styles.content}>
        <Input label="Full Name" />
        <Gap height={24} />
        <Input label="Pekerjaan" />
        <Gap height={24} />
        <Input label="Email Address" />
        <Gap height={24} />
        <Input label="Password" />
        <Gap height={40} />
        <Button
          title="Continue"
          onPress={() => navigation.navigate('UploadPhoto')}
        />
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
    padding: 40,
    paddingTop: 0,
  },
});
