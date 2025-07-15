import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from '../../../../tailwind';

const Button = ({
  textButton = '',
  onPress = () => {},
  styles,
  textStyles,
  isDisabled = false,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        tw.style(
          'bg-primaryBlueAccent h-14 items-center justify-center rounded-full',
          isDisabled && 'bg-textGrey',
        ),
        styles,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={tw.color('white')} />
      ) : (
        <Text
          style={tw.style(
            'text-textWhite font-montserratMedium text-base',
            textStyles,
          )}>
          {textButton}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
