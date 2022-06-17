import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Header, ListDoctor } from '../../components';
import { colors } from '../../utils';
import { DummyDoctor1 } from '../../assets';

export default function ChooseDoctor({ navigation }) {
  return (
    <View style={styles.pages}>
      <Header
        title="Pilih Dokter Anak"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <ListDoctor
        type="next"
        onPress={() => navigation.navigate('Chatting')}
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        onPress={() => navigation.navigate('Chatting')}
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        onPress={() => navigation.navigate('Chatting')}
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        onPress={() => navigation.navigate('Chatting')}
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        onPress={() => navigation.navigate('Chatting')}
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
