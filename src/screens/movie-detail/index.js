/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import { Button, Header } from '../../components/commons';
import { ImageBackdrop } from '../../constants';
import useMovieGenre from '../../hooks/use-movie-genre';
import {
  IconCalendar,
  IconHeartFill,
  IconHeartRed,
  IconShare,
  IconStarOrange,
} from '../../assets';
import useMovieDetail from '../../hooks/use-movie-detail';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { CastCrewSection, HomeSection } from '../../components/sections';
import ReactNativeModal from 'react-native-modal';
import { globalStore, userStore } from '../../stores';

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

  const [isAtTop, setIsAtTop] = useState(true);

  const [visibleModal, setVisibleModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [valCastCrew, setValCastCrew] = useState({});

  const getUser = userStore(state => state.user);
  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

  const {
    resultMovieDetail,
    resultMovieDetailCredits,
    resultMovieDetailSimilar,
    isLoadingMovieDetail,
    isLoadingMovieDetailCredits,
    isLoadingMovieDetailSimilar,
    onRefetchMovieDetail,
    onRefetchMovieDetailCredits,
    onRefetchMovieDetailSimilar,
  } = useMovieDetail(movieData?.id);

  const { saveFavoriteMovie, getFavoriteMovie, deleteFavoriteMovie } =
    useStoreFirebase();

  const valCastArray = resultMovieDetailCredits?.cast || [];
  const valCrewArray = resultMovieDetailCredits?.crew || [];

  const { getGenreNames, isLoadingMovieGenre, onRefetchMovieGenre } =
    useMovieGenre();
  const valGenre = movieData?.genre_ids || JSON.parse(movieData?.genres);
  const genreNames = getGenreNames(valGenre);
  const genreText = genreNames.join(' | ');

  const rated = Number(resultMovieDetail?.vote_average).toFixed(1) || 0;

  const urlImageBackdrop = ImageBackdrop(resultMovieDetail?.poster_path) || '';

  const isLoadingRefreshScreen =
    isLoading ||
    isLoadingMovieDetail ||
    isLoadingMovieGenre ||
    isLoadingMovieDetailCredits ||
    isLoadingMovieDetailSimilar;

  const onRefreshScreen = () => {
    setIsLoading(true);
    setTimeout(() => {
      onRefetchMovieDetail();
      onRefetchMovieGenre();
      onRefetchMovieDetailCredits();
      onRefetchMovieDetailSimilar();
      setIsLoading(false);
    }, 1500);
  };

  const onSaveFavorite = () => {
    const genreMovie = resultMovieDetail?.genres.map(item => item.id);
    const storeFavMovie = {
      id: String(resultMovieDetail?.id),
      title: resultMovieDetail?.title,
      posterPath: resultMovieDetail?.poster_path,
      releaseDate: resultMovieDetail?.release_date,
      rated: String(resultMovieDetail?.vote_average),
      genres: JSON.stringify(genreMovie),
    };

    saveFavoriteMovie(storeFavMovie, getUser?.id);
    setIsFavorite(true);
  };

  const onDeleteFavorite = () => {
    deleteFavoriteMovie(String(resultMovieDetail?.id), getUser?.id);
    setIsFavorite(false);
  };

  const onUpdateFavorite = () => {
    const movieId = resultMovieDetail?.id;
    const userId = getUser?.id;

    getFavoriteMovie(String(movieId), userId)
      .then(res => {
        setIsFavorite(!!res);
      })
      .catch(() => {
        setIsFavorite(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      onUpdateFavorite();
    }, []),
  );

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
        <ScrollView
          stickyHeaderIndices={[0]}
          scrollEventThrottle={16}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            setIsAtTop(offsetY <= 0);
          }}
          refreshControl={
            <RefreshControl
              // colors={tw.color('white')}
              tintColor={tw.color('white')}
              refreshing={isLoadingRefreshScreen}
              onRefresh={onRefreshScreen}
            />
          }>
          <Header
            styles={tw.style('px-4 mb-5 py-2', !isAtTop && 'bg-primaryDark')}
            title={resultMovieDetail?.title || ''}
            onBackPress={() => {
              navigation.goBack();
            }}
          />
          <View style={tw.style('items-center mb-8')}>
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
              onPress={() => {
                if (isFavorite) {
                  onDeleteFavorite();
                } else {
                  onSaveFavorite();
                }
              }}
              style={tw.style(
                'h-14 bg-primarySoft justify-center p-4 rounded-full ml-2 mr-2',
              )}>
              {isFavorite ? <IconHeartRed /> : <IconHeartFill />}
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
          </View>

          <CastCrewSection
            title="Cast"
            data={valCastArray}
            styles={tw.style('bg-primaryDark pb-2 pt-2')}
            onPressCastCrew={item => {
              setValCastCrew(item);
              setVisibleModal(true);
            }}
          />

          <CastCrewSection
            title="Crew"
            data={valCrewArray}
            styles={tw.style('bg-primaryDark pt-2')}
            onPressCastCrew={item => {
              setValCastCrew(item);
              setVisibleModal(true);
            }}
          />

          <View style={tw.style('h-6 bg-primaryDark')} />

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

      <ReactNativeModal
        isVisible={visibleModal}
        onBackdropPress={() => {
          setVisibleModal(false);
        }}>
        <View style={tw.style('bg-primarySoft rounded-lg')}>
          <FastImage
            source={{ uri: ImageBackdrop(valCastCrew?.profile_path) }}
            resizeMode="cover"
            style={tw.style('h-96 w-full rounded-t-lg')}
          />
          <View style={tw.style('p-4')}>
            <View style={tw.style('mb-6')}>
              <Text
                style={tw.style(
                  'text-white text-base font-montserratSemiBold',
                )}>
                Name
              </Text>
              <View style={tw.style('flex-row flex-wrap')}>
                <Text
                  style={tw.style('text-white text-base font-montserrat mr-2')}>
                  {valCastCrew?.name}
                </Text>
                <Text
                  style={tw.style(
                    'text-white text-center text-base font-montserrat mr-2',
                  )}>
                  As
                </Text>
                <Text
                  style={tw.style(
                    'text-white text-center text-base font-montserrat',
                  )}>
                  {valCastCrew?.character || valCastCrew?.job}
                </Text>
              </View>
            </View>
            <Button
              textButton="Close"
              textStyles={tw.style('text-primaryBlueAccent')}
              styles={tw.style(
                'border border-primaryBlueAccent bg-primarySoft mt-2',
              )}
              onPress={() => {
                setVisibleModal(false);
              }}
            />
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
}
