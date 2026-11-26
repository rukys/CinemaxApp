import { View } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigations/types';

type Props = StackScreenProps<RootStackParamList, 'NotificationScreen'>;

export default function NotificationScreen({ navigation }: Props) {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Notification"
          styles={tw.style('mx-4')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
}
