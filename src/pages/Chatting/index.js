import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChatItem, Header, InputChat } from '../../components';
import { colors, fonts, getChatTime, getData, setDateChat } from '../../utils';

// Firebase
import '../../config';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

export default function Chatting({ navigation, route }) {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState(''); // berisi chat yang diinput user
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const db = getDatabase();
    const chatID = `${user.uid}_${dataDoctor.id}`;
    const urlFirebase = `chatting/${chatID}/allChat/`;
    onValue(ref(db, urlFirebase), snapshot => {
      // console.log('get data chat : ', snapshot.val());
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        // Parsing data untuk memisahkan tanggal
        Object.keys(dataSnapshot).map(key => {
          // object data
          const dataChat = dataSnapshot[key]; // berisi kode acak push()
          const newDataChat = [];

          Object.keys(dataChat).map(itemChat => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat],
            });
          });

          allDataChat.push({
            id: key, // Berisi tanggal
            data: newDataChat,
          });
        });
        console.log('all data chat :', allDataChat);
        setChatData(allDataChat);
      }
    });
  }, [dataDoctor.id, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      // console.log('user login', res);
      setUser(res);
    });
  };

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
    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };
    // console.log('data untuk dikirim', data);
    // console.log('url firebase : ', urlFirebase);

    // Kirim firebase
    const db = getDatabase();
    // push() : Untuk mendapatkan key secara acak
    set(push(ref(db, urlFirebase)), data)
      .then(() => {
        setChatContent('');
        // set history for user
        set(ref(db, urlMessageUser), dataHistoryChatForUser);

        // set history for doctor
        set(ref(db, urlMessageDoctor), dataHistoryChatForDoctor);
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
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : { uri: dataDoctor.data.photo }}
                    />
                  );
                })}
              </View>
            );
          })}
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
