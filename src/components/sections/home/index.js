import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from '../../../../tailwind';
import { CardPoster, Gap } from '../../commons';

const HomeSection = ({
  dataHomeSection = [],
  title = '',
  onPressSeeAll = () => {},
  onPressHomeSection = () => {},
  styles,
  isSeeAll = true,
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
        {dataHomeSection.length > 4 && isSeeAll && (
          <Text
            onPress={onPressSeeAll}
            style={tw.style(
              'text-base text-primaryBlueAccent font-montserratSemiBold',
            )}>
            Sea All
          </Text>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Gap width={16} />
        {dataHomeSection.map((item, index) => (
          <CardPoster
            key={index.toString()}
            image={item?.poster_path}
            title={item?.title}
            onPressCard={() => {
              onPressHomeSection(item);
            }}
          />
        ))}
        <Gap width={16} />
      </ScrollView>
    </View>
  );
};

export default HomeSection;
