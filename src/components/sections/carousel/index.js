import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
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
    refCarousel.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View style={tw.style('flex-1', styles)}>
      <Carousel
        loop={true}
        autoPlay={true}
        mode="parallax"
        ref={refCarousel}
        autoPlayInterval={2500}
        width={width}
        height={width / 2}
        data={dataCarousel}
        onProgressChange={progress}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item, index }) => (
          <Carouselitem
            key={index.toString()}
            image={item?.backdrop_path}
            title={item?.title}
            releaseDate={item?.release_date}
            onPress={() => {
              onPressCarousel(item);
            }}
          />
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={dataCarousel}
        activeDotStyle={tw.style('rounded-full bg-primaryBlueAccent')}
        dotStyle={tw.style('rounded-full bg-primarySoft')}
        containerStyle={tw.style('mt-2 gap-1.5')}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default CarouselSection;
