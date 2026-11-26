import React, { useState, useCallback, useMemo } from 'react';
import Modal from 'react-native-modal';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import tw from '../../../tailwind';
import {
  CircleMinus,
  Flag,
  Info,
  LockKeyhole,
  Shield,
  SquarePen,
  User,
} from 'lucide-react-native';
import {
  Button,
  Header,
  Input,
  ProfileItem,
} from '../../components/commons';
import { ImgProfile, ImgQuestion } from '../../assets';
import { userStore } from '../../stores';
import { ProfileSection } from '../../components/sections';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import FastImage from '@d11/react-native-fast-image';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { getAuthErrorMessage } from '../../utils/firebase-error';

export default function ProfileScreen({ navigation }) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const [loading, setLoading] = useState(false);

  const userProfileData = useMemo(
    () => ({
      fullName: getUser?.fullName || '',
      email: getUser?.email || '',
    }),
    [getUser?.fullName, getUser?.email],
  );

  const { logout, reauthenticate, deleteAccount } = useAuthFirebase();
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

  const handleCloseDeleteModal = useCallback(() => {
    if (isDeleting) {
      return;
    }
    setVisibleModalDelete(false);
    setDeletePassword('');
    setDeleteError('');
  }, [isDeleting]);

  // Order matters: re-authenticate first so nothing is deleted when the
  // password is wrong, then remove Firestore data, then the auth account.
  const handlePressDeleteAccount = useCallback(async () => {
    if (!deletePassword) {
      setDeleteError(getAuthErrorMessage('auth/missing-password'));
      return;
    }

    setIsDeleting(true);
    setDeleteError('');

    let user = null;
    try {
      user = await reauthenticate(deletePassword);
    } catch (error) {
      setDeleteError(getAuthErrorMessage(error));
      setIsDeleting(false);
      return;
    }

    try {
      await deleteAllFavoriteMovie(user.uid);
      await deleteUserFireStore(user.uid);
      await deleteAccount(user);
    } catch (error) {
      setDeleteError(
        error?.code
          ? getAuthErrorMessage(error)
          : 'Failed to delete your account. Please try again.',
      );
      setIsDeleting(false);
      return;
    }

    setIsDeleting(false);
    setDeletePassword('');
    // Deleting the auth account also signs the user out.
    onClearCacheApp();
  }, [
    deletePassword,
    deleteAccount,
    reauthenticate,
    deleteAllFavoriteMovie,
    deleteUserFireStore,
    onClearCacheApp,
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

  const handleNavigateToCountry = useCallback(() => {
    navigation.navigate('CountryScreen');
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
              <SquarePen color={tw.color('primaryBlueAccent')} size={24} />
            </TouchableOpacity>
          </View>

          <ProfileSection title="Account" styles={tw.style('mb-4')}>
            <ProfileItem
              title="Edit Profile"
              iconLeft={<User color={tw.color('white')} size={24} />}
              onPress={handleNavigateToEditProfile}
            />
            <ProfileItem
              title="Change Password"
              iconLeft={<LockKeyhole color={tw.color('white')} size={24} />}
              onPress={handleNavigateToChangePassword}
            />
            <ProfileItem
              title="Delete Account"
              iconLeft={<CircleMinus color={tw.color('white')} size={24} />}
              onPress={() => {
                setVisibleModalDelete(true);
              }}
              isLastItem
            />
          </ProfileSection>
          <ProfileSection title="General" styles={tw.style('mb-4')}>
            {/* <ProfileItem
              title="Notification"
              iconLeft={<IconNotification />}
              onPress={() => {
                navigation.navigate('NotificationScreen');
              }}
            /> */}
            {/* <ProfileItem title="Language" iconLeft={<IconGlobe />} /> */}
            <ProfileItem
              title="Country"
              iconLeft={<Flag color={tw.color('white')} size={24} />}
              onPress={handleNavigateToCountry}
              isLastItem
            />
            {/* <ProfileItem
              title="Clear Cache"
              iconLeft={<IconTrash />}
              isLastItem
            /> */}
          </ProfileSection>
          <ProfileSection title="More" styles={tw.style('mb-10')}>
            <ProfileItem
              title="Privacy and Policy"
              iconLeft={<Shield color={tw.color('white')} size={24} />}
              onPress={handleNavigateToPrivacyPolicy}
            />
            {/* <ProfileItem title="Help & Feedback" iconLeft={<IconQuestion />} /> */}
            <ProfileItem
              isLastItem
              title="About Us"
              iconLeft={<Info color={tw.color('white')} size={24} />}
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
        avoidKeyboard
        onBackdropPress={handleCloseDeleteModal}
        onBackButtonPress={handleCloseDeleteModal}>
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
          <Input
            label="Password"
            value={deletePassword}
            isSecureText
            onChangeText={setDeletePassword}
            labelStyles={tw.style('bg-primarySoft')}
            styles={tw.style('mb-2 border-textGrey')}
          />
          <Text
            style={tw.style(
              'text-secondaryRed text-xs font-montserrat mb-4 ml-4',
            )}>
            {deleteError}
          </Text>
          <View style={tw.style('flex-row mb-2')}>
            <Button
              textButton="Delete"
              isLoading={isDeleting}
              isDisabled={isDeleting}
              onPress={handlePressDeleteAccount}
              textStyles={tw.style('text-primaryBlueAccent')}
              styles={tw.style(
                'w-1/2 bg-primarySoft border border-primaryBlueAccent',
              )}
            />
            <Button
              textButton="Cancel"
              isDisabled={isDeleting}
              styles={tw.style('flex-1 ml-2')}
              onPress={handleCloseDeleteModal}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
