/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useMemo } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components/commons';
import FastImage from 'react-native-fast-image';
import { IconEditProfileDetail, ImgProfile, ImgSuccess } from '../../assets';
import { globalStore, userStore } from '../../stores';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileEditScreen({ navigation }) {
  const [valPhoneNumber, setValPhoneNumber] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);

  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

  const { updateUserToFirestore, getUserFromFirestore } = useStoreFirebase();

  const isEditablePhoneNumber = useMemo(() => {
    return (
      getUser?.phoneNumber === null ||
      getUser?.phoneNumber === '' ||
      getUser?.phoneNumber === 'null'
    );
  }, [getUser?.phoneNumber]);

  const onGetDataProfile = useCallback(() => {
    getUserFromFirestore(getUser?.id)
      .then(res => {
        if (res) {
          setUser(res);
        }
      })
      .catch(() => {});
  }, [getUser?.id, getUserFromFirestore, setUser]);

  const onUpdateDataProfile = useCallback(() => {
    setIsLoading(true);
    const updateStore = {
      ...getUser,
      phoneNumber: valPhoneNumber,
    };

    updateUserToFirestore(updateStore)
      .then(() => {
        onGetDataProfile();
        setIsLoading(false);
        setVisibleModal(true);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [getUser, valPhoneNumber, updateUserToFirestore, onGetDataProfile]);

  const handlePhoneNumberChange = useCallback(text => {
    setValPhoneNumber(text);
  }, []);

  const handleModalClose = useCallback(() => {
    setVisibleModal(false);
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      onGetDataProfile();
    }, []),
  );

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Edit Profile"
          styles={tw.style('mx-4')}
          onBackPress={handleBackPress}
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
              value={getUser?.phoneNumber || valPhoneNumber}
              onChangeText={handlePhoneNumberChange}
              styles={tw.style('mx-6 mb-6')}
              isEditable={isEditablePhoneNumber}
              keyboardType="number-pad"
            />
          </View>
        </ScrollView>
        <View style={tw.style('mx-6 mb-10')}>
          <Button
            textButton="Save Changes"
            styles={tw.style('')}
            isLoading={isLoading}
            isDisabled={!isEditablePhoneNumber}
            onPress={onUpdateDataProfile}
          />
        </View>
      </View>

      <Modal isVisible={visibleModal} onBackdropPress={handleModalClose}>
        <View style={tw.style('bg-primarySoft p-5 rounded-3xl')}>
          <View style={tw.style('self-center mb-2 mt-2')}>
            <ImgSuccess height={125} width={125} />
          </View>
          <Text
            style={tw.style(
              'font-montserratSemiBold text-2xl text-center text-white self-center mb-4 mt-5',
            )}>
            Update data profile success
          </Text>
          {/* <Text
            style={tw.style(
              'text-textGrey text-center mb-10 self-center font-montserrat',
            )}>
            You will be logged out of your account and You can log back in at
            any time.
          </Text> */}
          <View style={tw.style('')}>
            <Button
              textButton="Close"
              styles={tw.style('mt-4')}
              onPress={handleModalClose}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
