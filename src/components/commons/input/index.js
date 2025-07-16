/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from '../../../../tailwind';
import { IconEyeOff } from '../../../assets';

const Input = ({
  styles,
  labelStyles,
  textInputStyles,
  label = '',
  value = '',
  onChangeText = () => {},
  isSecureText = false,
  isEditable = true,
  ...props
}) => {
  const [visibleLabel, setVisibleLabel] = useState(true);
  const [secureText, setSecureText] = useState(isSecureText);
  const [valInput, setValInput] = useState('');

  useEffect(() => {
    if (!value) {
      setVisibleLabel(true);
    } else {
      setVisibleLabel(false);
    }
  }, []);

  return (
    <View
      style={tw.style(
        'flex-row h-14 border rounded-full border-primarySoft p-4 items-center',
        styles,
      )}>
      <Text
        style={tw.style(
          'text-textWhiteGrey font-montserratMedium text-xs absolute ml-4 bg-primaryDark px-1',
          !visibleLabel && 'absolute mb-7.5 ml-6 bottom-4.5',
          labelStyles,
        )}>
        {label}
      </Text>
      <TextInput
        value={value}
        editable={isEditable}
        onFocus={() => {
          setVisibleLabel(false);
        }}
        onBlur={() => {
          if (valInput !== '') {
            setVisibleLabel(false);
          } else {
            setVisibleLabel(true);
          }
        }}
        onChangeText={val => {
          setValInput(val);
          onChangeText(val);
        }}
        style={tw.style(
          'flex-1 h-14 text-textWhiteGrey font-montserratMedium text-sm',
          textInputStyles,
        )}
        secureTextEntry={secureText}
        {...props}
      />
      {isSecureText && (
        <TouchableOpacity
          onPress={() => {
            setSecureText(!secureText);
          }}>
          <IconEyeOff />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
