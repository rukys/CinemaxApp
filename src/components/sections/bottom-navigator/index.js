import React from 'react';
import { View } from 'react-native';
import { NavigatorItem } from '../../commons';
import tw from '../../../../tailwind';

const BottomNavigator = ({ state, descriptors, navigation }) => {
  return (
    <View style={tw.style('bg-white')}>
      <View
        style={tw.style(
          'flex-row justify-between items-center px-10 pb-1 pt-3.5 shadow-2xl bg-primaryDark',
        )}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
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
              size={22}
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
