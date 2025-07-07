import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../../tailwind';
import { ImageBackdrop } from '../../../constants';

const formatDateWithPrefix = (dateString, prefix = 'On') => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `${prefix} ${formattedDate}`;
};

const Carouselitem = ({
  image,
  title = '',
  releaseDate,
  onPress = () => {},
}) => {
  const urlImg = ImageBackdrop(image) || '';

  return (
    <TouchableOpacity style={tw.style('flex-1 mx-1')} onPress={onPress}>
      <FastImage
        source={{ uri: urlImg }}
        style={tw.style('h-full w-full rounded-2xl')}
      />
      <View style={tw.style('absolute bottom-0 mb-4 ml-4')}>
        <Text style={tw.style('text-lg text-white font-montserratSemiBold')}>
          {title}
        </Text>
        <Text style={tw.style('text-white text-xs font-montserrat')}>
          {formatDateWithPrefix(releaseDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Carouselitem;
