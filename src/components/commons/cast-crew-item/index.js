import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../../tailwind';
import { ImageCastAndCrew } from '../../../constants';

const CastCrewItem = ({ image = '', fullName = '', onPress = () => {} }) => {
  const urlImage = ImageCastAndCrew(image);

  return (
    <TouchableOpacity
      style={tw.style('w-20 items-center mr-2')}
      onPress={onPress}>
      {image === null ? (
        <View
          style={tw.style(
            'h-18 w-18 rounded-lg bg-primarySoft items-center justify-center',
          )}>
          <Text
            style={tw.style('text-center text-xs text-white font-montserrat')}>
            Image not available
          </Text>
        </View>
      ) : (
        <FastImage
          source={{ uri: urlImage }}
          resizeMode="cover"
          style={tw.style('h-18 w-18 rounded-lg')}
        />
      )}
      <Text
        style={tw.style(
          'text-center self-center mt-2 text-white text-sm font-montserrat',
        )}
        numberOfLines={1}>
        {fullName}
      </Text>
    </TouchableOpacity>
  );
};

export default CastCrewItem;
