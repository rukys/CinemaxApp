import { View, Text } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';

export default function NotificationScreen({ navigation }) {
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
        {/* <Text>NotificationScreen</Text> */}
      </View>
    </>
  );
}
