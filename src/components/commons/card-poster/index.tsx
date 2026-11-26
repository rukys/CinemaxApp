import { View, Text, TouchableOpacity, type ViewStyle } from 'react-native';
import React from 'react';
import FastImage from '@d11/react-native-fast-image';
import { ImageCard } from '../../../constants';
import tw from '../../../../tailwind';

interface Props {
  image?: string | null;
  title?: string;
  /** Merged through `tw.style`, so it must be a plain style object. */
  styles?: ViewStyle;
  onPressCard?: () => void;
}

const CardPoster = ({
  image,
  title = '',
  styles,
  onPressCard = () => {},
}: Props) => {
  const urlImage = ImageCard(image) || '';
  return (
    <TouchableOpacity
      onPress={onPressCard}
      style={tw.style('bg-primarySoft rounded-xl w-36 mr-4', styles)}>
      {image === null ? (
        <View
          style={tw.style(
            'h-44 w-36 rounded-xl bg-primarySoft items-center justify-center',
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
          style={tw.style('h-44 w-36 rounded-t-xl')}
        />
      )}

      <View style={tw.style('p-4')}>
        <Text
          numberOfLines={1}
          style={tw.style('text-white font-montserratSemiBold')}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardPoster;
