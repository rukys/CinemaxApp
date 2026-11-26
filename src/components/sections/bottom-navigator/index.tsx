import React from 'react';
import { View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigatorItem } from '../../commons';
import tw from '../../../../tailwind';

const BottomNavigator = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={tw.style('bg-white')}>
      <View
        style={tw.style(
          'flex-row justify-between items-center px-10 pb-2 pt-2 shadow-2xl bg-primaryDark',
        )}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          // NavigatorItem picks the icon by name, so only a string label
          // can be used. No tab sets tabBarLabel/title, so this is the
          // route name.
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <NavigatorItem
              key={index}
              title={label}
              active={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavigator;
