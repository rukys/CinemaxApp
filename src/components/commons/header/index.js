import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from '../../../../tailwind';
import { ChevronLeft } from 'lucide-react-native';

const Header = ({
  title = '',
  isOnBackPress = true,
  onBackPress = () => {},
  styles,
}) => {
  return (
    <View style={[tw.style('flex-row items-center'), styles]}>
      {isOnBackPress && (
        <TouchableOpacity
          onPress={onBackPress}
          style={tw.style(
            'h-8 w-8 bg-primarySoft rounded-lg items-center justify-center',
          )}>
          <ChevronLeft color={tw.color('white')} size={24} />
        </TouchableOpacity>
      )}
      <View style={tw.style('flex-1 items-center', isOnBackPress && '-ml-6')}>
        <Text
          style={tw.style(
            'text-center text-start text-textWhite font-montserratSemiBold text-base',
          )}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
