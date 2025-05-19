import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import {IconArrowBack} from '../../assets';

const Header = ({title, onBackPress = () => {}, styles}) => {
  return (
    <View style={[tw.style('flex-row items-center'), styles]}>
      <TouchableOpacity
        onPress={onBackPress}
        style={tw.style(
          'h-8 w-8 bg-primarySoft rounded-lg items-center justify-center',
        )}>
        <IconArrowBack />
      </TouchableOpacity>
      <View style={tw.style('flex-1 items-center -ml-6')}>
        <Text
          style={tw.style(
            'text-textWhite font-montserratSemiBold text-base self-center',
          )}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
