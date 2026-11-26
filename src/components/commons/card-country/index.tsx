import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../../../../tailwind';

interface Props {
  nameCountry?: string;
  image?: React.ReactNode;
  handleCheckBox?: () => void;
  isChecked?: boolean;
}

const CardCountry = ({
  nameCountry = '',
  image,
  handleCheckBox,
  isChecked = false,
}: Props) => {
  return (
    <View style={tw.style('flex-row items-center mb-4 mx-4')}>
      <View style={tw.style('mr-4')}>{image}</View>
      <Text style={tw.style('flex-1 text-white text-base font-montserrat')}>
        {nameCountry}
      </Text>
      <TouchableOpacity
        onPress={handleCheckBox}
        style={tw.style('border-2 border-textGrey rounded-full p-0.5')}>
        <View
          style={tw.style(
            'h-5 w-5',
            isChecked && 'bg-primaryBlueAccent rounded-full',
          )}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CardCountry;
