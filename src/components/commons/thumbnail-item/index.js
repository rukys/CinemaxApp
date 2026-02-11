import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../../tailwind';
import { Play } from 'lucide-react-native';

const ThumbnailItem = ({ thumbnailUrl = '', onPress = () => {} }) => {
  return (
    <TouchableOpacity
      style={tw.style('w-42 items-center mr-2')}
      onPress={onPress}>
      {thumbnailUrl === '' || thumbnailUrl === null ? (
        <View
          style={tw.style(
            'h-32 w-42 rounded-lg bg-primarySoft items-center justify-center',
          )}>
          <Text
            style={tw.style('text-center text-xs text-white font-montserrat')}>
            Image not available
          </Text>
        </View>
      ) : (
        <>
          <FastImage
            source={{ uri: thumbnailUrl }}
            resizeMode="cover"
            style={tw.style('h-32 w-42 rounded-lg')}
          />
          <Play
            size={18}
            color="red"
            fill="red"
            opacity={0.9}
            style={tw.style('absolute bottom-2 right-2')}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

export default ThumbnailItem;
