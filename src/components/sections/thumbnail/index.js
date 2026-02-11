import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { ThumbnailItem, Gap } from '../../commons';
import tw from '../../../../tailwind';

const ThumbnailSection = ({
  data = [],
  title = '',
  onPressThumbnail = () => {},
  styles,
}) => {
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
