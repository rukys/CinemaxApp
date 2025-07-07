import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from '../../../../tailwind';
import { IconSearch } from '../../../assets';

const SearchSection = ({
  styles,
  onPress = () => {},
  onCancel = () => {},
  isOnPress = false,
  placeholder = '',
  value = '',
  onChangeText,
  textInputStyles,
}) => {
  return (
    <View style={tw.style('flex-row')}>
      <TouchableOpacity
        onPress={onPress}
        disabled={!isOnPress}
        style={tw.style(
          'flex-1 bg-primarySoft py-3 px-4 rounded-3xl flex-row items-center',
          styles,
        )}>
        <IconSearch />
        {isOnPress ? (
          <Text style={tw.style('ml-2 text-textGrey font-montserratMedium')}>
            Search by title
          </Text>
        ) : (
          <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={tw.color('textGrey')}
            style={tw.style(
              'flex-1 ml-2 text-textGrey font-montserratMedium',
              textInputStyles,
            )}
            onChangeText={onChangeText}
          />
        )}
      </TouchableOpacity>
      {value !== '' && (
        <TouchableOpacity
          style={tw.style('items-center justify-center mr-4')}
          onPress={onCancel}>
          <Text
            style={tw.style(
              'text-sm text-textGrey -mt-3.5 font-montserratMedium',
            )}>
            Cancel
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchSection;
