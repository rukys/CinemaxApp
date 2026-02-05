/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollView, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import tw from '../../../tailwind';
import { Button, CardCountry, Header } from '../../components/commons';
// import { SearchSection } from '../../components/sections';
import { useFocusEffect } from '@react-navigation/native';
import { listCountry } from '../../constants';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { userStore } from '../../stores';

export default function CountryScreen({ navigation, route }) {
  const { isFromSignup = false } = route.params || {};

  const [valCountry, setValCountry] = useState('');
  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);

  const { getUserFromFirestore, updateUserCountryCode } = useStoreFirebase();

  const onGetDataProfile = useCallback(() => {
    getUserFromFirestore(getUser?.id)
      .then(res => {
        if (res) {
          setUser(res);
        }
      })
      .catch(() => {});
  }, [getUser?.id, getUserFromFirestore]);

  const handleUpdateCountryCode = async countryCode => {
    setValCountry(countryCode);
    try {
      await updateUserCountryCode(getUser?.id, countryCode);
      await onGetDataProfile();
    } catch (error) {
      // console.error('Error updating country code:', error.message);
    }
  };

  const handleSaveChanges = () => {
    if (isFromSignup) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppBarScreen' }],
      });
    } else {
      navigation.goBack();
    }
  };

  const isDisabledButton = isFromSignup ? valCountry === '' : false;

  useFocusEffect(
    useCallback(() => {
      if (getUser?.id) {
        onGetDataProfile();
      }
    }, []),
  );

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Country"
          styles={tw.style('mx-4 mb-5')}
          isOnBackPress={!isFromSignup}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        {/* <SearchSection
          value={searchText}
          onChangeText={onChangeSearch}
          onCancel={() => onChangeSearch('')}
          placeholder="Search your region"
          styles={tw.style('mx-4 mb-5')}
        /> */}

        <ScrollView>
          {listCountry.map(item => (
            <CardCountry
              key={item.id.toString()}
              nameCountry={item?.country}
              image={item?.icon}
              isChecked={getUser?.countryCode === item?.code_iso}
              handleCheckBox={() => handleUpdateCountryCode(item?.code_iso)}
            />
          ))}
        </ScrollView>
        <View style={tw.style('mx-6 mb-4 bg-primaryDark mt-4')}>
          <Button
            textButton={isFromSignup ? 'Save Country' : 'Save Changes'}
            isDisabled={isDisabledButton}
            onPress={handleSaveChanges}
            styles={tw.style('')}
          />
        </View>
      </View>
    </>
  );
}
