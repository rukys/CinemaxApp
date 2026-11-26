import { ScrollView, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import tw from '../../../tailwind';
import { Button, CardCountry, Header } from '../../components/commons';
import { useFocusEffect } from '@react-navigation/native';
import { listCountry } from '../../constants';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { userStore } from '../../stores';
import { showErrorToast } from '../../utils/toast';

export default function CountryScreen({ navigation, route }) {
  const { isFromSignup = false } = route.params || {};

  // Selection stays local until the user presses Save.
  const [valCountry, setValCountry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);

  const { getUserFromFirestore, updateUserCountryCode } = useStoreFirebase();

  const selectedCountry = valCountry || getUser?.countryCode || '';

  const onGetDataProfile = useCallback(() => {
    if (!getUser?.id) {
      return;
    }
    getUserFromFirestore(getUser.id)
      .then(res => {
        if (res) {
          setUser(res);
        }
      })
      .catch(() => {});
  }, [getUser?.id, getUserFromFirestore, setUser]);

  const goNext = useCallback(() => {
    if (isFromSignup) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppBarScreen' }],
      });
    } else {
      navigation.goBack();
    }
  }, [isFromSignup, navigation]);

  const handleSaveChanges = useCallback(async () => {
    const hasChanged = !!valCountry && valCountry !== getUser?.countryCode;
    if (!hasChanged) {
      goNext();
      return;
    }

    setIsSaving(true);
    try {
      await updateUserCountryCode(getUser?.id, valCountry);
      setUser({ ...getUser, countryCode: valCountry });
      goNext();
    } catch (error) {
      showErrorToast('Failed to save your country. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [valCountry, getUser, updateUserCountryCode, setUser, goNext]);

  const isDisabledButton =
    isSaving || (isFromSignup ? selectedCountry === '' : false);

  useFocusEffect(
    useCallback(() => {
      onGetDataProfile();
    }, [onGetDataProfile]),
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
        <ScrollView>
          {listCountry.map(item => (
            <CardCountry
              key={item.id.toString()}
              nameCountry={item?.country}
              image={item?.icon}
              isChecked={selectedCountry === item?.code_iso}
              handleCheckBox={() => setValCountry(item?.code_iso)}
            />
          ))}
        </ScrollView>
        <View style={tw.style('mx-6 mb-4 bg-primaryDark mt-4')}>
          <Button
            textButton={isFromSignup ? 'Save Country' : 'Save Changes'}
            isLoading={isSaving}
            isDisabled={isDisabledButton}
            onPress={handleSaveChanges}
            styles={tw.style('')}
          />
        </View>
      </View>
    </>
  );
}
