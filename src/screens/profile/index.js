import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from '../../../tailwind';
import { Button, Header, ProfileItem } from '../../components/commons';
import {
  IconAlert,
  IconEditProfile,
  IconFinish,
  IconGlobe,
  IconNotification,
  IconPadlock,
  IconPerson,
  IconQuestion,
  IconShield,
  IconTrash,
  ImgQuestion,
} from '../../assets';
import { globalStore, userStore } from '../../stores';
import { ProfileSection } from '../../components/sections';
import useAuthFirebase from '../../hooks/use-auth-firebase';

export default function ProfileScreen({ navigation }) {
  const [visibleModal, setVisibleModal] = useState(false);

  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const setLoading = globalStore(state => state.setLoading);
  const loading = globalStore(state => state.loading);

  const { logout } = useAuthFirebase();

  const onClearCacheApp = () => {
    setVisibleModal(false);
    setLoading(false);
    setUser({});
    navigation.reset({
      index: 0,
      routes: [{ name: 'OnboardingScreen' }],
    });
  };

  const handlePressLogout = () => {
    setLoading(true);
    logout()
      .then(() => {
        onClearCacheApp();
      })
      .catch(() => {
        onClearCacheApp();
      });
  };
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Profile"
          styles={tw.style('mx-4')}
          isOnBackPress={false}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={tw.style(
              'flex-row mx-4 mt-4 border border-2 border-primarySoft rounded-2xl p-4 items-center mb-3',
            )}>
            <View style={tw.style('h-14 w-14 bg-textGrey rounded-full mr-4')} />
            <View style={tw.style('flex-1')}>
              <Text
                style={tw.style(
                  'font-montserratSemiBold text-white text-base',
                )}>
                {getUser?.fullName || ''}
              </Text>
              <Text style={tw.style('font-montserrat text-textGrey text-sm')}>
                {getUser?.email || ''}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileEditScreen')}>
              <IconEditProfile />
            </TouchableOpacity>
          </View>

          <ProfileSection title="Account" styles={tw.style('mb-4')}>
            <ProfileItem title="Member" iconLeft={<IconPerson />} />
            <ProfileItem
              title="Change Password"
              iconLeft={<IconPadlock />}
              isLastItem
            />
          </ProfileSection>
          <ProfileSection title="General" styles={tw.style('mb-4')}>
            <ProfileItem title="Notification" iconLeft={<IconNotification />} />
            <ProfileItem title="Language" iconLeft={<IconGlobe />} />
            <ProfileItem title="Country" iconLeft={<IconFinish />} />
            <ProfileItem
              title="Clear Cache"
              iconLeft={<IconTrash />}
              isLastItem
            />
          </ProfileSection>
          <ProfileSection title="More" styles={tw.style('mb-10')}>
            <ProfileItem title="Legal and Policies" iconLeft={<IconShield />} />
            <ProfileItem title="Help & Feedback" iconLeft={<IconQuestion />} />
            <ProfileItem title="About Us" iconLeft={<IconAlert />} isLastItem />
          </ProfileSection>

          <Button
            textButton="Log Out"
            isLoading={loading}
            onPress={() => {
              setVisibleModal(true);
            }}
            textStyles={tw.style('text-primaryBlueAccent')}
            styles={tw.style(
              'bg-primaryDark border border-2 border-primaryBlueAccent mx-4 mb-10',
            )}
          />
        </ScrollView>
      </View>

      <Modal
        isVisible={visibleModal}
        onBackdropPress={() => {
          setVisibleModal(false);
        }}>
        <View style={tw.style('bg-primarySoft p-5 rounded-3xl')}>
          <View style={tw.style('self-center mb-2 mt-2')}>
            <ImgQuestion height={125} width={125} />
          </View>
          <Text
            style={tw.style(
              'font-montserratSemiBold text-2xl text-white self-center mb-4 mt-5',
            )}>
            Are you sure ?
          </Text>
          <Text
            style={tw.style(
              'text-textGrey text-center mb-10 self-center font-montserrat',
            )}>
            You will be logged out of your account and You can log back in at
            any time.
          </Text>
          <View style={tw.style('flex-row mb-2')}>
            <Button
              textButton="Logout"
              onPress={handlePressLogout}
              textStyles={tw.style('text-primaryBlueAccent')}
              styles={tw.style(
                'w-1/2 bg-primarySoft border border-primaryBlueAccent',
              )}
            />
            <Button
              textButton="Cancel"
              styles={tw.style('flex-1 ml-2')}
              onPress={() => {
                setVisibleModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
