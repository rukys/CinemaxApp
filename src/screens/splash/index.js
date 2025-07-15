import { View, StatusBar } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { IconApp } from '../../assets';
import tw from '../../../tailwind';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { userStore } from '../../stores';
import auth from '@react-native-firebase/auth';

export default function SplashScreen({ navigation }) {
  const setUser = userStore(state => state.setUser);

  const { onAuthStateChanged } = useAuthFirebase();
  const { getUserFromFirestore } = useStoreFirebase();

  const ONE_DAY = 24 * 60 * 60 * 1000;

  const isLoginExpired = useCallback(
    user => {
      if (!user?.metadata?.lastSignInTime) {
        return true;
      }

      const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
      const now = Date.now();

      return now - lastSignIn > ONE_DAY;
    },
    [ONE_DAY],
  );

  const navigateToAppBar = useCallback(
    userData => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppBarScreen' }],
      });
    },
    [navigation],
  );

  const navigateToOnboarding = useCallback(() => {
    navigation.replace('OnboardingScreen');
  }, [navigation]);

  useEffect(() => {
    let didNavigate = false;

    const unsubscribe = onAuthStateChanged(response => {
      if (didNavigate) {
        return;
      }

      const timeoutId = setTimeout(() => {
        const user = auth().currentUser;

        // Cek apakah user login sudah expired (lebih dari 1 hari)
        if (user && !isLoginExpired(user)) {
          getUserFromFirestore(response?.uid).then(snapshot => {
            if (didNavigate) {
              return;
            }
            didNavigate = true;

            setUser(snapshot);
            navigateToAppBar(snapshot);
          });
        } else {
          if (didNavigate) {
            return;
          }
          didNavigate = true;

          // Kalau expired atau belum login
          navigateToOnboarding();
        }
      }, 2000);

      // Cleanup timeout jika component unmount
      return () => {
        clearTimeout(timeoutId);
      };
    });

    return () => {
      unsubscribe();
    };
  }, [
    getUserFromFirestore,
    navigateToAppBar,
    navigateToOnboarding,
    onAuthStateChanged,
    setUser,
    isLoginExpired,
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
