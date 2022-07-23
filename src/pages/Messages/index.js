import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List } from '../../components';
import { colors, fonts, getData } from '../../utils';

// Firebase
import '../../config';
import { getDatabase, ref, onValue, child, get } from 'firebase/database';
const db = getDatabase();

export default function Messages({ navigation }) {
  const [user, setUser] = useState([]);
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const urlHistory = `messages/${user.uid}/`;
    onValue(ref(db, urlHistory), async snapshot => {
      // console.log('data history :', snapshot.val());
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];
        // async & await/asynchronous : menunggu hasilnya sampai dapat
        const promises = await Object.keys(oldData).map(async key => {
          // Memanggil data doctor
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          const detailDoctor = await get(child(ref(db), urlUidDoctor));
          // console.log('detail doctor', detailDoctor.val());

          data.push({
            id: key,
            detailDoctor: detailDoctor.val(),
            ...oldData[key],
          });
        });

        // Tunggu Promise yang ada di dlm promises
        await Promise.all(promises);
        console.log('data baru', data);
        // proses setData tidak bisa menunggu jadi harus pake Promise.all() untuk menunggu dulu
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
              profile={{ uri: chat.detailDoctor.photo }}
              name={chat.detailDoctor.fullName}
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
