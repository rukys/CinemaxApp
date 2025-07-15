import React, { useState, useCallback, useMemo } from 'react';
import Modal from 'react-native-modal';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import auth from '@react-native-firebase/auth';
import tw from '../../../tailwind';
import { Button, Header, ProfileItem } from '../../components/commons';
import {
  IconAlert,
  IconEditProfile,
  // IconFinish,
  // IconGlobe,
  // IconNotification,
  IconPadlock,
  IconPerson,
  // IconQuestion,
  IconRemove,
  IconShield,
  // IconTrash,
  ImgProfile,
  ImgQuestion,
} from '../../assets';
import { globalStore, userStore } from '../../stores';
import { ProfileSection } from '../../components/sections';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import FastImage from 'react-native-fast-image';
import useStoreFirebase from '../../hooks/use-store-firebase';

export default function ProfileScreen({ navigation }) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const setLoading = globalStore(state => state.setLoading);
  const loading = globalStore(state => state.loading);

  const userProfileData = useMemo(
    () => ({
      fullName: getUser?.fullName || '',
      email: getUser?.email || '',
    }),
    [getUser?.fullName, getUser?.email],
  );

  const { logout } = useAuthFirebase();
  const { deleteUserFireStore, deleteAllFavoriteMovie } = useStoreFirebase();

  const onClearCacheApp = useCallback(() => {
    setVisibleModal(false);
    setVisibleModalDelete(false);
    setLoading(false);
    setUser({});
    navigation.reset({
      index: 0,
      routes: [{ name: 'OnboardingScreen' }],
    });
  }, [navigation, setLoading, setUser]);

  const handlePressLogout = useCallback(() => {
    setLoading(true);
    logout()
      .then(() => {
        onClearCacheApp();
      })
      .catch(() => {
        onClearCacheApp();
      });
  }, [logout, onClearCacheApp, setLoading]);

  const handlePressDeleteAccount = useCallback(async () => {
    const user = auth().currentUser;

    if (user) {
      try {
        await deleteAllFavoriteMovie(user.uid || getUser?.id);
        await deleteUserFireStore(user.uid || getUser?.id);
        await user.delete();
        await handlePressLogout();
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          // console.log(
          //   'Re-authentication required before deleting the account.',
          // );
          // Arahkan user untuk login ulang
        } else {
          // console.error('Failed to delete user:', error);
        }
      }
    } else {
      // console.log('No user is currently signed in.');
    }
  }, [
    deleteAllFavoriteMovie,
    deleteUserFireStore,
    getUser?.id,
    handlePressLogout,
  ]);

  const appVersion = useMemo(() => {
    return deviceInfoModule.getVersion();
  }, []);

  const handleNavigateToEditProfile = useCallback(() => {
    navigation.navigate('ProfileEditScreen');
  }, [navigation]);

  const handleNavigateToChangePassword = useCallback(() => {
    navigation.navigate('ChangePasswordScreen');
  }, [navigation]);

  const handleNavigateToPrivacyPolicy = useCallback(() => {
    navigation.navigate('PrivacyPolicyScreen');
  }, [navigation]);

  const handleNavigateToAbout = useCallback(() => {
    navigation.navigate('AboutScreen');
  }, [navigation]);

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
            <TouchableOpacity onPress={handleNavigateToEditProfile}>
              <FastImage
                source={ImgProfile}
                style={tw.style('h-14 w-14 mr-4')}
              />
            </TouchableOpacity>
            <View style={tw.style('flex-1')}>
              <Text
                style={tw.style(
                  'font-montserratSemiBold text-white text-base',
                )}>
                {userProfileData.fullName}
              </Text>
              <Text style={tw.style('font-montserrat text-textGrey text-sm')}>
                {userProfileData.email}
              </Text>
            </View>
            <TouchableOpacity onPress={handleNavigateToEditProfile}>
              <IconEditProfile />
            </TouchableOpacity>
          </View>

          <ProfileSection title="Account" styles={tw.style('mb-4')}>
            <ProfileItem
              title="Edit Profile"
              iconLeft={<IconPerson />}
              onPress={handleNavigateToEditProfile}
            />
            <ProfileItem
              title="Change Password"
              iconLeft={<IconPadlock />}
              onPress={handleNavigateToChangePassword}
            />
            <ProfileItem
              title="Delete Account"
              iconLeft={<IconRemove />}
              onPress={() => {
                setVisibleModalDelete(true);
              }}
              isLastItem
            />
          </ProfileSection>
          {/* <ProfileSection title="General" styles={tw.style('mb-4')}>
            <ProfileItem
              title="Notification"
              iconLeft={<IconNotification />}
              onPress={() => {
                navigation.navigate('NotificationScreen');
              }}
            />
            <ProfileItem title="Language" iconLeft={<IconGlobe />} />
            <ProfileItem title="Country" iconLeft={<IconFinish />} />
            <ProfileItem
              title="Clear Cache"
              iconLeft={<IconTrash />}
              isLastItem
            />
          </ProfileSection> */}
          <ProfileSection title="More" styles={tw.style('mb-10')}>
            <ProfileItem
              title="Privacy and Policy"
              iconLeft={<IconShield />}
              onPress={handleNavigateToPrivacyPolicy}
            />
            {/* <ProfileItem title="Help & Feedback" iconLeft={<IconQuestion />} /> */}
            <ProfileItem
              isLastItem
              title="About Us"
              iconLeft={<IconAlert />}
              onPress={handleNavigateToAbout}
            />
          </ProfileSection>

          <Text
            style={tw.style(
              'text-white text-sm text-center mb-2 font-montserrat',
            )}>
            version {appVersion}
          </Text>
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

      <Modal
        isVisible={visibleModalDelete}
        onBackdropPress={() => {
          setVisibleModalDelete(false);
        }}>
        <View style={tw.style('bg-primarySoft p-5 rounded-3xl')}>
          <View style={tw.style('self-center mb-2 mt-2')}>
            <ImgQuestion height={125} width={125} />
          </View>
          <Text
            style={tw.style(
              'font-montserratSemiBold text-2xl text-white self-center mb-4 mt-5',
            )}>
            Delete Account ?
          </Text>
          <Text
            style={tw.style(
              'text-textGrey text-center mb-10 self-center font-montserrat',
            )}>
            This will permanently remove your profile, history, and settings.
            This action cannot be undone.
          </Text>
          <View style={tw.style('flex-row mb-2')}>
            <Button
              textButton="Delete"
              onPress={handlePressDeleteAccount}
              textStyles={tw.style('text-primaryBlueAccent')}
              styles={tw.style(
                'w-1/2 bg-primarySoft border border-primaryBlueAccent',
              )}
            />
            <Button
              textButton="Cancel"
              styles={tw.style('flex-1 ml-2')}
              onPress={() => {
                setVisibleModalDelete(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
