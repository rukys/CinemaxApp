import { View } from 'react-native';
import React, { useCallback } from 'react';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigations/types';

type Props = StackScreenProps<RootStackParamList, 'HelpFaqScreen'>;

export default function HelpFaqScreen({ navigation }: Props) {
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Help & Feedback"
          styles={tw.style('mx-4')}
          onBackPress={handleBackPress}
        />
      </View>
    </>
  );
}
