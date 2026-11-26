import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import tw from '../../../../tailwind';

interface Props {
  children?: React.ReactNode;
  title?: string;
  /** Merged through `tw.style`, so it must be a plain style object. */
  styles?: ViewStyle;
}

const ProfileSection = ({ children, title = '', styles }: Props) => {
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
