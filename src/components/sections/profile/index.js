import React from 'react';
import { Text, View } from 'react-native';
import tw from '../../../../tailwind';

const ProfileSection = ({ children, title = '', styles }) => {
  return (
    <View
      style={tw.style(
        'mx-4 mt-4 border border-2 border-primarySoft rounded-2xl p-4',
        styles,
      )}>
      <Text style={tw.style('font-montserratSemiBold text-white text-lg')}>
        {title}
      </Text>
      {children}
    </View>
  );
};

export default ProfileSection;
