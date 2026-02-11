import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from '../../../../tailwind';
import { ChevronRight } from 'lucide-react-native';

const ProfileItem = ({
  iconLeft,
  title = '',
  isLastItem = false,
  styles,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        'flex-row py-2 pb-3 items-center mt-2',
        !isLastItem && 'border-b-2 border-primarySoft',
        styles,
      )}>
      <View
        style={tw.style(
          'bg-primarySoft rounded-full h-10 w-10 items-center justify-center',
        )}>
        {iconLeft}
      </View>
      <Text style={tw.style('flex-1 ml-4 text-white font-montserrat')}>
        {title}
      </Text>
      <ChevronRight color={tw.color('primaryBlueAccent')} size={24} />
    </TouchableOpacity>
  );
};

export default ProfileItem;
