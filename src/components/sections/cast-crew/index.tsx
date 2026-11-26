import { View, Text, ScrollView, type ViewStyle } from 'react-native';
import React from 'react';
import { CastCrewItem, Gap } from '../../commons';
import tw from '../../../../tailwind';
import type { CastMember, CrewMember } from '../../../types/tmdb';

type CastCrew = CastMember | CrewMember;

interface Props {
  data?: CastCrew[];
  title?: string;
  onPressCastCrew?: (item: CastCrew) => void;
  /** Merged through `tw.style`, so it must be a plain style object. */
  styles?: ViewStyle;
}

const CastCrewSection = ({
  data = [],
  title = '',
  onPressCastCrew = () => {},
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
          <CastCrewItem
            key={index?.toString()}
            image={item?.profile_path}
            fullName={item?.name}
            onPress={() => {
              onPressCastCrew(item);
            }}
          />
        ))}
        <Gap width={16} />
      </ScrollView>
    </View>
  );
};

export default CastCrewSection;
