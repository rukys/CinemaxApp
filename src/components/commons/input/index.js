import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from '../../../../tailwind';
import { Eye, EyeOff } from 'lucide-react-native';

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
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(isSecureText);

  // The label sits inside the field only while it is empty and unfocused.
  // Derived from `value` on every render so values that arrive later
  // (e.g. loaded profile data) never overlap the label.
  const visibleLabel = !isFocused && !value;

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
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChangeText={onChangeText}
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
          {secureText ? (
            <EyeOff color={tw.color('white')} size={24} />
          ) : (
            <Eye color={tw.color('white')} size={24} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
