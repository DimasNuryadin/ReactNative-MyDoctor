import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChatItem, Header, InputChat } from '../../components';
import { colors, fonts } from '../../utils';

export default function Chatting({ navigation }) {
  return (
    <View style={styles.page}>
      <Header
        title="Nairobi Putri Hayza"
        type="dark-profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.chatDate}>Senin, 21 Maret, 2020</Text>
        <ChatItem isMe />
        <ChatItem />
        <ChatItem isMe />
      </View>
      <InputChat />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
});
