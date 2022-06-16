import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItems,
  RatedDoctor,
} from '../../components';
import { colors, fonts } from '../../utils';

export default function Doctor() {
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={30} />
          <HomeProfile />
          <Text style={styles.welcome}>
            Mau konsultasi dengan siapa hari ini?
          </Text>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={16} />
                <DoctorCategory />
                <DoctorCategory />
                <DoctorCategory />
                <DoctorCategory />
                <DoctorCategory />
                <DoctorCategory />
                <Gap width={6} />
              </View>
            </ScrollView>
          </View>
          <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
          <RatedDoctor />
          <RatedDoctor />
          <RatedDoctor />
          <Text style={styles.sectionLabel}>Good News</Text>
          <NewsItems />
          <NewsItems />
          <NewsItems />
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
    paddingHorizontal: 16,
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
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
