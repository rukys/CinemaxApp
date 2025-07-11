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
        'flex-row h-14 border rounded-full border-primarySoft px-4 py-4',
        styles,
      )}>
      <Text
        style={tw.style(
          'text-textWhiteGrey font-montserratMedium text-xs absolute ml-4 -mt-2 bg-primaryDark px-1',
          visibleLabel && 'bottom-4.5',
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
          'flex-1 text-textWhiteGrey font-montserratMedium text-sm',
          textInputStyles,
        )}
        secureTextEntry={secureText}
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
