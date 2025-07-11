import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from '../../../../tailwind';
import { Gap } from '../../commons';
import { useNavigation } from '@react-navigation/native';
import { IconNotification, ImgProfile } from '../../../assets';
import FastImage from 'react-native-fast-image';

const HomeHeaderSection = ({ data = {} }) => {
  const navigation = useNavigation();

  return (
    <View style={tw.style('flex-row items-center py-2')}>
      <Gap width={16} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfileEditScreen');
        }}
        style={tw.style('')}>
        <FastImage source={ImgProfile} style={tw.style('h-12 w-12')} />
      </TouchableOpacity>
      <View style={tw.style('flex-1 ml-4')}>
        <Text style={tw.style('text-base text-white font-montserratSemiBold')}>
          Hello, {data?.fullName}
        </Text>
        <Text style={tw.style('text-textGrey font-montserrat text-xs')}>
          Let's find your favorite movie
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NotificationScreen');
        }}
        style={tw.style(
          'h-10 w-10 bg-primarySoft items-center justify-center rounded-xl',
        )}>
        <IconNotification />
      </TouchableOpacity>
      <Gap width={16} />
    </View>
  );
};

export default HomeHeaderSection;
