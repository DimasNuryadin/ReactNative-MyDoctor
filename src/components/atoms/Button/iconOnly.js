import { TouchableOpacity } from 'react-native';
import React from 'react';
import { ICBackDark } from '../../../assets';

export default function IconOnly({ onPress, icon }) {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <ICBackDark />;
    }
    if (icon === 'back-light') {
      return <ICBackDark />;
    }
    return <ICBackDark />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
}
