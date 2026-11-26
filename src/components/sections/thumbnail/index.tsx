import { View, Text, ScrollView, type ViewStyle } from 'react-native';
import React from 'react';
import { ThumbnailItem, Gap } from '../../commons';
import tw from '../../../../tailwind';
import type { VideoThumbnail } from '../../../types/tmdb';

interface Props {
  data?: VideoThumbnail[];
  title?: string;
  onPressThumbnail?: (item: VideoThumbnail) => void;
  /** Merged through `tw.style`, so it must be a plain style object. */
  styles?: ViewStyle;
}

const ThumbnailSection = ({
  data = [],
  title = '',
  onPressThumbnail = () => {},
  styles,
}: Props) => {
  return (
    <View style={tw.style('', styles)}>
      <View style={tw.style('flex-row mx-4 mb-4')}>
        <Text
          style={tw.style(
            'flex-1 text-base text-white font-montserratSemiBold',
          )}>
          {title}
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Gap width={16} />
        {data.map((item, index) => (
          <ThumbnailItem
            key={index?.toString()}
            thumbnailUrl={item?.thumbnailUrl}
            onPress={() => {
              onPressThumbnail(item);
            }}
          />
        ))}
        <Gap width={16} />
      </ScrollView>
    </View>
  );
};

export default ThumbnailSection;
