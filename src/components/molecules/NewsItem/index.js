import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';

export default function NewsItems({ title, date, image }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    fontSize: 16,
    marginBottom: 4,
    maxWidth: '94%',
  },
  date: {
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    fontSize: 12,
  },
  image: {
    height: 60,
    width: 80,
    borderRadius: 11,
  },
});
