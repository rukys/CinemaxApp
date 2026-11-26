import React, { useRef } from 'react';
import { Dimensions, View, type ViewStyle } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
  Carousel,
  Pagination,
  type CarouselRef,
} from 'react-native-reanimated-carousel';
import tw from '../../../../tailwind';
import { Carouselitem } from '../../commons';
import type { Movie } from '../../../types/tmdb';

const width = Dimensions.get('window').width;

interface Props {
  dataCarousel?: Movie[];
  /** Merged through `tw.style`, so it must be a plain style object. */
  styles?: ViewStyle;
  onPressCarousel?: (item: Movie) => void;
}

const CarouselSection = ({
  dataCarousel = [],
  styles,
  onPressCarousel = () => {},
}: Props) => {
  const refCarousel = useRef<CarouselRef>(null);
  const progress = useSharedValue(0);

  const onPressPagination = (index: number) => {
    refCarousel.current?.scrollTo({ index, animated: true });
  };

  return (
    <View style={tw.style('flex-1', styles)}>
      <Carousel
        ref={refCarousel}
        loop
        autoplay
        autoplayInterval={2500}
        style={{ width, height: width / 2 }}
        data={dataCarousel}
        progress={progress}
        layout={{ type: 'parallax', scale: 0.9, offset: 50 }}
        keyExtractor={(item, index) => String(item?.id ?? index)}
        renderItem={({ item }) => (
          <Carouselitem
            image={item?.backdrop_path}
            title={item?.title}
            releaseDate={item?.release_date}
            onPress={() => {
              onPressCarousel(item);
            }}
          />
        )}
      />

      <Pagination
        progress={progress}
        count={dataCarousel.length}
        activeDotStyle={tw.style('rounded-full bg-primaryBlueAccent')}
        dotStyle={tw.style('rounded-full bg-primarySoft')}
        containerStyle={tw.style('mt-2 gap-1.5 self-center')}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default CarouselSection;
