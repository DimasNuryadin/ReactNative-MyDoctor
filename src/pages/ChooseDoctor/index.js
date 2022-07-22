import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header, List } from '../../components';
import { colors } from '../../utils';

// Firebase
import '../../config';
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  equalTo,
  query,
} from 'firebase/database';
const db = getDatabase();

export default function ChooseDoctor({ navigation, route }) {
  const [listDoctor, setListDoctor] = useState([]);
  const itemCategory = route.params;
  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
  }, [itemCategory.category]);

  const callDoctorByCategory = category => {
    onValue(
      query(ref(db, 'doctors'), orderByChild('category'), equalTo(category)),
      res => {
        // console.log('Data list doctor:', res.val());
        if (res.val()) {
          // Data masih berbentuk objek
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(item => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          console.log('parse list doctor', data);
          setListDoctor(data);
        }
      },
      {
        onlyOnce: true,
      },
    );
  };

  return (
    <View style={styles.pages}>
      <Header
        title={`Pilih ${itemCategory.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />
      {listDoctor.map(doctor => {
        return (
          <List
            key={doctor.id}
            type="next"
            profile={{ uri: doctor.data.photo }}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate('DoctorProfile', doctor)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
