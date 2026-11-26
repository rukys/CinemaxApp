import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Carousel, Pagination } from 'react-native-reanimated-carousel';
import tw from '../../../../tailwind';
import { Carouselitem } from '../../commons';

const width = Dimensions.get('window').width;

const CarouselSection = ({
  dataCarousel = [],
  styles,
  onPressCarousel = () => {},
}) => {
  const refCarousel = useRef(null);
  const progress = useSharedValue(0);

  const onPressPagination = index => {
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
        containerStyle={tw.style('mt-2 gap-1.5')}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default CarouselSection;
