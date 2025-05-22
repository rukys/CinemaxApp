/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import tw from '../../../../tailwind';
import {
  IconHeart,
  IconHeartFill,
  IconHome,
  IconHomeFill,
  IconPerson,
  IconPersonFill,
  IconSearch,
  IconSearchFill,
} from '../../../assets';

const iconMap = {
  HomeScreen: {
    default: IconHome,
    active: IconHomeFill,
    label: 'Home',
  },
  SearchScreen: {
    default: IconSearch,
    active: IconSearchFill,
    label: 'Search',
  },
  FavoriteScreen: {
    default: IconHeart,
    active: IconHeartFill,
    label: 'Favorite',
  },
  ProfileScreen: {
    default: IconPerson,
    active: IconPersonFill,
    label: 'Profile',
  },
};

const NavigatorIcon = ({ title, active }) => {
  const containerAnim = useRef(new Animated.Value(active ? 1 : 0)).current;
  const textOpacityAnim = useRef(new Animated.Value(active ? 1 : 0)).current;

  const iconConfig = iconMap[title];

  if (!iconConfig) {
    return null;
  }

  const { default: DefaultIcon, active: ActiveIcon, label } = iconConfig;

  useEffect(() => {
    const duration = 300;

    if (active) {
      // Animate to active state
      Animated.parallel([
        Animated.timing(containerAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false,
        }),
        Animated.timing(textOpacityAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Animate to inactive state
      Animated.parallel([
        Animated.timing(containerAnim, {
          toValue: 0,
          duration: duration,
          useNativeDriver: false,
        }),
        Animated.timing(textOpacityAnim, {
          toValue: 0,
          duration: duration,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [active, containerAnim, textOpacityAnim]);

  if (active) {
    return (
      <Animated.View
        style={[
          tw.style(
            'h-10 flex-row bg-primarySoft items-center p-2 px-3 rounded-xl',
          ),
          {
            opacity: containerAnim,
            transform: [
              {
                scaleX: containerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}>
        <ActiveIcon />
        <Animated.Text
          style={[
            tw.style(
              'text-xs text-primaryBlueAccent font-montserratMedium ml-2',
            ),
            {
              opacity: textOpacityAnim,
            },
          ]}>
          {label}
        </Animated.Text>
      </Animated.View>
    );
  }

  // Inactive state - simpler container without background
  return (
    <View style={tw.style('items-center justify-center')}>
      <DefaultIcon />
    </View>
  );
};

const NavigatorItem = ({ title, active, onPress, onLongPress }) => {
  const pressAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(pressAnim, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: pressAnim }],
      }}>
      <TouchableOpacity
        style={tw.style('items-center')}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}>
        <NavigatorIcon title={title} active={active} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NavigatorItem;
