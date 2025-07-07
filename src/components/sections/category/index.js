import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from '../../../../tailwind';
import { Gap } from '../../commons';

const CategorySection = ({
  styles,
  dataCategory = [],
  selectedCategory = 'All',
  onSelectCategory = () => {},
}) => {
  const valueAll = {
    id: 1,
    name: 'All',
  };
  const newArray = [valueAll, ...dataCategory];

  return (
    <View style={tw.style('', styles)}>
      <Text
        style={tw.style(
          'text-base text-white font-montserratSemiBold ml-4 mb-4',
        )}>
        Categories
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw.style('flex-row')}>
        <Gap width={16} />
        {newArray.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={tw.style(
              'px-6 py-2 rounded-xl mr-4',
              selectedCategory === item?.name ? 'bg-primarySoft' : 'px-2',
            )}
            onPress={() => {
              onSelectCategory(item?.name);
            }}>
            <Text
              style={tw.style(
                'text-white font-montserrat text-sm',
                selectedCategory === item?.name && 'text-primaryBlueAccent',
              )}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        ))}
        <Gap width={16} />
      </ScrollView>
    </View>
  );
};

export default CategorySection;
