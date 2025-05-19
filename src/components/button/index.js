import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../../../tailwind';

const Button = ({textButton, onPress = () => {}, styles}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw.style(
          'bg-primaryBlueAccent h-14 items-center justify-center rounded-full',
        ),
        styles,
      ]}>
      <Text style={tw.style('text-textWhite font-montserratMedium text-base')}>
        {textButton}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
