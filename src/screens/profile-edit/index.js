import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components/commons';
import FastImage from 'react-native-fast-image';
import { IconEditProfileDetail, ImgProfile } from '../../assets';
import { userStore } from '../../stores';

export default function ProfileEditScreen({ navigation }) {
  const getUser = userStore(state => state.user);

  const isEditablePhoneNumber =
    getUser?.phoneNumber === null ||
    getUser?.phoneNumber === '' ||
    getUser?.phoneNumber === 'null';

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Edit Profile"
          styles={tw.style('mx-4')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={tw.style('flex-1 items-center mt-6 mb-6')}>
            <TouchableOpacity style={tw.style('')}>
              <FastImage
                source={ImgProfile}
                style={tw.style('h-32 w-32 mr-4')}
              />
              <TouchableOpacity
                style={tw.style('absolute bottom-0 right-0 mr-4')}>
                <IconEditProfileDetail />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* <View>
              <Text
                style={tw.style(
                  'text-white text-xl font-montserratSemiBold text-center mb-1',
                )}>
                {getUser.fullName || ''}
              </Text>
              <Text
                style={tw.style(
                  'text-textGrey text-base font-montserrat text-center',
                )}>
                {getUser.email || ''}
              </Text>
            </View> */}
          </View>
          <View style={tw.style('mt-6')}>
            <Input
              label="Full Name"
              value={getUser?.fullName}
              styles={tw.style('mx-6 mb-6')}
              isEditable={false}
            />
            <Input
              label="Email"
              value={getUser?.email}
              styles={tw.style('mx-6 mb-6')}
              isEditable={false}
            />
            <Input
              label="Phone Number"
              value={getUser?.phoneNumber}
              styles={tw.style('mx-6 mb-6')}
              isEditable={isEditablePhoneNumber}
            />
          </View>
        </ScrollView>
        <View style={tw.style('mx-6 mb-10')}>
          <Button textButton="Save Changes" styles={tw.style('')} />
        </View>
      </View>
    </>
  );
}
