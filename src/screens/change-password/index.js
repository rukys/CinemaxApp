import { View, ScrollView } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components/commons';

export default function ChangePasswordScreen({ navigation }) {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Change Password"
          styles={tw.style('mx-4')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView style={tw.style('flex-1')}>
          <View style={tw.style('mt-6')}>
            {/* <Input label="Old Password" styles={tw.style('mx-6 mb-6')} /> */}
            <Input label="New Password" styles={tw.style('mx-6 mb-6')} />
            <Input label="Re-New Password" styles={tw.style('mx-6 mb-6')} />
          </View>
        </ScrollView>
        <View style={tw.style('mx-6 mb-10')}>
          <Button textButton="Change Password" styles={tw.style('')} />
        </View>
      </View>
    </>
  );
}
