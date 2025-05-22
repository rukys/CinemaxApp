import { View, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { IconApp } from '../../assets';
import tw from '../../../tailwind';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { userStore } from '../../stores';

export default function SplashScreen({ navigation }) {
  const setUser = userStore(state => state.setUser);

  const { onAuthStateChanged } = useAuthFirebase();
  const { getUserFromFirestore } = useStoreFirebase();

  useEffect(() => {
    let didNavigate = false;

    const unsubscribe = onAuthStateChanged(response => {
      if (didNavigate) {
        return;
      }

      setTimeout(() => {
        if (response?._user) {
          getUserFromFirestore(response?.uid).then(snapshot => {
            if (didNavigate) {
              return;
            }
            didNavigate = true;

            setUser(snapshot);
            navigation.reset({
              index: 0,
              routes: [{ name: 'AppBarScreen' }],
            });
          });
        } else {
          if (didNavigate) {
            return;
          }
          didNavigate = true;

          navigation.replace('OnboardingScreen');
        }
      }, 2000);
    });

    return () => {
      unsubscribe();
    };
  }, [getUserFromFirestore, navigation, onAuthStateChanged, setUser]);

  return (
    <>
      <StatusBar hidden />
      <View
        style={tw.style('flex-1 bg-primaryDark items-center justify-center')}>
        <IconApp />
      </View>
    </>
  );
}
