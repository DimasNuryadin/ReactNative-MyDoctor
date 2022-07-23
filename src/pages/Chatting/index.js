import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChatItem, Header, InputChat } from '../../components';
import { colors, fonts, getChatTime, getData, setDateChat } from '../../utils';

// Firebase
import '../../config';
import { getDatabase, ref, set, push } from 'firebase/database';

export default function Chatting({ navigation, route }) {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      console.log('user login', res);
      setUser(res);
    });
  }, []);

  const chatSend = () => {
    // console.log('chat yang akan dikirim : ', chatContent);

    // getTime() : Format timestamp
    const today = new Date();
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${user.uid}_${dataDoctor.id}`;

    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    // console.log('data untuk dikirim', data);
    console.log('url firebase : ', urlFirebase);

    // Kirim firebase
    const db = getDatabase();
    // push() : Untuk mendapatkan key secara acak
    set(push(ref(db, urlFirebase)), data)
      .then(() => {
        setChatContent('');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.category}
        photo={{ uri: dataDoctor.data.photo }}
        type="dark-profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>Senin, 21 Maret, 2020</Text>
          <ChatItem isMe />
          <ChatItem />
          <ChatItem isMe />
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
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
