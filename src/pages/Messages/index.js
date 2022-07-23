import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List } from '../../components';
import { colors, fonts, getData } from '../../utils';

// Firebase
import '../../config';
import { getDatabase, ref, onValue } from 'firebase/database';
const db = getDatabase();

export default function Messages({ navigation }) {
  const [user, setUser] = useState([]);
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const urlHistory = `messages/${user.uid}/`;
    onValue(ref(db, urlHistory), snapshot => {
      // console.log('data history :', snapshot.val());
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            ...oldData[key],
          });
        });
        console.log('data baru', data);
        setHistoryChat(data);
      }
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      // console.log('user login', res);
      setUser(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => {
          return (
            <List
              key={chat.id}
              profile={chat.uidPartner}
              name={chat.uidPartner}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting')}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
