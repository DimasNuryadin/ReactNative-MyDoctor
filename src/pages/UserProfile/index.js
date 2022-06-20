import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Header, Profile, List, Gap } from '../../components';
import { colors } from '../../utils';

export default function UserProfile({ navigation }) {
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile />
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last updated yesterday"
        type="next"
        icon="edit-profile"
      />
      <List
        name="Edit Profile"
        desc="Last updated yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Edit Profile"
        desc="Last updated yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Edit Profile"
        desc="Last updated yesterday"
        type="next"
        icon="help"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
