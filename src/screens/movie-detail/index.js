import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';
import { ImageBackdrop } from '../../constants';
import useMovieGenre from '../../hooks/use-movie-genre';
import {
  IconCalendar,
  IconHeartFill,
  IconShare,
  IconStarOrange,
} from '../../assets';
import useMovieDetail from '../../hooks/use-movie-detail';
import { HomeSection } from '../../components/sections';

const formatDateWithPrefix = (dateString, prefix = '') => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `${prefix} ${formattedDate}`;
};

export default function MovieDetailScreen({ navigation, route }) {
  const { movieData = {} } = route.params || {};

  const { resultMovieDetail, resultMovieDetailSimilar } = useMovieDetail(
    movieData?.id,
  );

  const { getGenreNames } = useMovieGenre();
  const genreNames = getGenreNames(movieData?.genre_ids);
  const genreText = genreNames.join(' | ');

  const rated = Number(resultMovieDetail?.vote_average).toFixed(1) || 0;

  const urlImageBackdrop = ImageBackdrop(resultMovieDetail?.poster_path) || '';

  console.log(resultMovieDetailSimilar);

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <ImageBackground
          source={{ uri: urlImageBackdrop }}
          resizeMode="cover"
          style={tw.style('absolute h-128 w-full opacity-20 z-0')}
        />
        <LinearGradient
          colors={['transparent', tw.color('primaryDark')]}
          style={tw.style('absolute bottom-65 h-48 w-full z-0')}
        />
        <ScrollView stickyHeaderIndices={[0]}>
          <Header
            styles={tw.style('mx-4 mb-5 mt-2')}
            title={resultMovieDetail?.title || ''}
            onBackPress={() => {
              navigation.goBack();
            }}
          />
          <View style={tw.style('items-center mt-2 mb-8')}>
            <FastImage
              source={{ uri: urlImageBackdrop }}
              resizeMode="cover"
              style={tw.style('h-90 w-65% rounded-xl mb-6')}
            />
            <View style={tw.style('flex-row items-center mb-2')}>
              <IconCalendar />
              <Text style={tw.style('ml-1 text-white font-montserrat')}>
                {formatDateWithPrefix(resultMovieDetail?.release_date)}
              </Text>
            </View>
            <Text style={tw.style('text-white text-base font-montserrat')}>
              {genreText}
            </Text>
          </View>
          <View style={tw.style('flex-row justify-center mb-6')}>
            {rated !== 0 && (
              <TouchableOpacity
                style={tw.style(
                  'flex-row items-center bg-primarySoft px-4 rounded-full mr-2',
                )}>
                <IconStarOrange height={25} width={25} />
                <Text
                  style={tw.style(
                    'text-secondaryOrange text-base font-montserratSemiBold ml-2',
                  )}>
                  {rated}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={tw.style(
                'h-14 bg-primarySoft justify-center p-4 rounded-full ml-2 mr-2',
              )}>
              <IconHeartFill />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'h-14 bg-primarySoft justify-center p-4 rounded-full ml-2',
              )}>
              <IconShare />
            </TouchableOpacity>
          </View>
          <View style={tw.style('px-4 bg-primaryDark')}>
            <Text
              style={tw.style(
                'text-base text-white font-montserratSemiBold mb-2 mt-2',
              )}>
              Story Line
            </Text>
            <Text style={tw.style('text-white font-montserrat mb-2')}>
              {resultMovieDetail?.overview || ''}
            </Text>
            <Text
              style={tw.style(
                'text-base text-white font-montserratSemiBold mb-2 mt-2',
              )}>
              Cast
            </Text>
            <Text style={tw.style('text-white font-montserrat mb-2')}>
              {resultMovieDetail?.overview || ''}
            </Text>
            <Text
              style={tw.style(
                'text-base text-white font-montserratSemiBold mb-2 mt-2',
              )}>
              Crew
            </Text>
            <Text style={tw.style('text-white font-montserrat mb-6')}>
              {resultMovieDetail?.overview || ''}
            </Text>
          </View>

          <HomeSection
            title="Similar Movie"
            // isSeeAll={false}
            styles={tw.style('mb-6 bg-primaryDark')}
            dataHomeSection={resultMovieDetailSimilar}
            onPressSeeAll={() => {
              navigation.navigate('MovieListScreen', {
                movieList: resultMovieDetailSimilar,
                title: 'Similar Movie',
              });
            }}
            onPressHomeSection={item => {
              navigation.navigate('MovieDetailScreen', { movieData: item });
            }}
          />
        </ScrollView>
      </View>
    </>
  );
}
