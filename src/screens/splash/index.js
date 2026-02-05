import React, { useEffect, useCallback, useRef } from 'react';
import { View, StatusBar } from 'react-native';
import { IconApp } from '../../assets';
import tw from '../../../tailwind';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { userStore } from '../../stores';

export default function SplashScreen({ navigation }) {
  const didNavigateRef = useRef(false);
  const timeoutRef = useRef(null);

  const setUser = userStore(state => state.setUser);
  const { onAuthStateChanged } = useAuthFirebase();
  const { getUserFromFirestore } = useStoreFirebase();

  const navigateToAppBar = useCallback(
    userData => {
      if (didNavigateRef.current) {
        return;
      }
      didNavigateRef.current = true;
      navigation.reset({ index: 0, routes: [{ name: 'AppBarScreen' }] });
    },
    [navigation],
  );

  const navigateToOnboarding = useCallback(() => {
    if (didNavigateRef.current) {
      return;
    }
    didNavigateRef.current = true;
    navigation.replace('OnboardingScreen');
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async response => {
      if (didNavigateRef.current) {
        return;
      }

      // pastikan hanya ada satu timer aktif
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // delay opsional untuk splash; bebas ubah/hapus
      timeoutRef.current = setTimeout(async () => {
        if (didNavigateRef.current) {
          return;
        }

        try {
          if (response) {
            const snapshot = await getUserFromFirestore(response.uid);
            if (snapshot) {
              setUser(snapshot);
              navigateToAppBar(snapshot);
            } else {
              navigateToOnboarding();
            }
          } else {
            navigateToOnboarding();
          }
        } catch (e) {
          navigateToOnboarding();
        }
      }, 1500);
    });

    // cleanup: buang timer & unsubscribe
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [
    onAuthStateChanged,
    getUserFromFirestore,
    setUser,
    navigateToAppBar,
    navigateToOnboarding,
  ]);

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
