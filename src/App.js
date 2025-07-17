import React, { useRef } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { StatusBar, LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigations from './navigations';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import tw from '../tailwind';
// import {colors} from './utils';

LogBox.ignoreAllLogs();
const queryClient = new QueryClient();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={tw.style('flex-1 bg-primaryDark')}>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                routeNameRef.current = navigationRef.getCurrentRoute().name;
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.getCurrentRoute().name;

                const trackScreenView = () => {
                  // Your implementation of analytics goes here!
                };

                if (previousRouteName !== currentRouteName) {
                  // Save the current route name for later comparison
                  routeNameRef.current = currentRouteName;

                  // Replace the line below to add the tracker from a mobile analytics SDK
                  await trackScreenView(currentRouteName);
                  // console.log(currentRouteName);
                }
              }}>
              <StatusBar
                backgroundColor={tw.color('primaryDark')}
                barStyle="light-content"
              />
              <Toast />
              <Navigations />
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
