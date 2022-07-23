import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItems,
  RatedDoctor,
} from '../../components';
import { colors, fonts } from '../../utils';

// Firebase Database
import {
  child,
  get,
  getDatabase,
  ref,
  orderByChild,
  limitToLast,
  onValue,
  query,
} from 'firebase/database';
import '../../config';
const dbRef = ref(getDatabase());

export default function Doctor({ navigation }) {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctors();
    getNews();
  }, []);

  const getTopRatedDoctors = () => {
    // orderByChild('rate') mengambil child rate
    // limitToFirst(3) : untuk mengambil 3 nilai yang terkecil
    // limitToLast(3) mengambil 3 nilai yang terbesar
    onValue(
      query(
        ref(getDatabase(), 'doctors'),
        orderByChild('rate'),
        limitToLast(3),
      ),
      res => {
        // console.log(res.val());
        // Memasukan object kedalam array, lalu memisahkan idUser dan data
        const oldData = res.val();
        const data = [];
        // Object.keys(data) Looping daftar/list object, lalu maping
        Object.keys(oldData).map(key => {
          // push() : Memasukan objek kedalam array
          data.push({
            id: key,
            data: oldData[key],
          });
        });
        // console.log('data hasil parse', data);
        setDoctors(data);
      },
      {
        onlyOnce: true,
      },
    );
  };

  const getCategoryDoctor = () => {
    get(child(dbRef, 'category_doc'))
      .then(res => {
        if (res.exists()) {
          // console.log('doctor category', res.val());
          const data = res.val();
          // Membersihkan array kosong
          const filterData = data.filter(el => el !== null);

          // console.log('data awal :', data);
          // console.log('data filter :', filterData);
          setCategoryDoctor(filterData);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getNews = () => {
    get(child(dbRef, 'news'))
      .then(res => {
        if (res.exists()) {
          // console.log('News category', res.val());
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setNews(filterData);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={16} />
                {categoryDoctor.map(item => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}
                <Gap width={6} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(doctor => {
              return (
                <RatedDoctor
                  key={doctor.id}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  avatar={{ uri: doctor.data.photo }}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map(item => {
            return (
              <NewsItems
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
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
  welcome: {
    marginTop: 30,
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: 209,
    marginBottom: 16,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
