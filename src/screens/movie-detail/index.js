/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Pressable,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import { Button, Header } from '../../components/commons';
import { ImageBackdrop } from '../../constants';
import useMovieGenre from '../../hooks/use-movie-genre';
import useMovieDetail from '../../hooks/use-movie-detail';
import useStoreFirebase from '../../hooks/use-store-firebase';
import {
  CastCrewSection,
  HomeSection,
  ThumbnailSection,
} from '../../components/sections';
import ReactNativeModal from 'react-native-modal';
import { globalStore, userStore } from '../../stores';
import {
  Calendar,
  Heart,
  SquareArrowOutUpRight,
  Star,
} from 'lucide-react-native';
import useMovieVideos from '../../hooks/use-movie-videos';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const formatDateWithPrefix = (dateString, prefix = '') => {
  if (!dateString) {
    return '';
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `${prefix} ${formattedDate}`;
  } catch (error) {
    // console.error('Date formatting error:', error);
    return '';
  }
};

export default function MovieDetailScreen({ navigation, route }) {
  const { movieData = {} } = route.params || {};

  const [isAtTop, setIsAtTop] = useState(true);

  const [visiblePoster, setVisiblePoster] = useState(false);
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

  const { videoThumbnails, isLoadingMovieVideos } = useMovieVideos(
    movieData?.id,
  );

  const { saveFavoriteMovie, getFavoriteMovie, deleteFavoriteMovie } =
    useStoreFirebase();

  const valCastArray = resultMovieDetailCredits?.cast || [];
  const valCrewArray = resultMovieDetailCredits?.crew || [];

  const { getGenreNames, isLoadingMovieGenre, onRefetchMovieGenre } =
    useMovieGenre();
  const valGenre = useMemo(() => {
    if (movieData?.genre_ids) {
      return movieData.genre_ids;
    }

    try {
      return JSON.parse(movieData?.genres || '[]');
    } catch (error) {
      // console.error('Failed to parse genres:', error);
      return [];
    }
  }, [movieData?.genre_ids, movieData?.genres]);
  const genreNames = useMemo(
    () => getGenreNames(valGenre),
    [getGenreNames, valGenre],
  );
  const genreText = genreNames.join(' | ');

  const rated = Number(resultMovieDetail?.vote_average).toFixed(1) || '0';

  const urlImageBackdrop = ImageBackdrop(resultMovieDetail?.poster_path) || '';

  const onSaveFavorite = useCallback(async () => {
    const genreMovie = resultMovieDetail?.genres?.map(item => item.id) || [];
    const storeFavMovie = {
      id: String(resultMovieDetail?.id),
      title: resultMovieDetail?.title,
      posterPath: resultMovieDetail?.poster_path,
      releaseDate: resultMovieDetail?.release_date,
      rated: String(resultMovieDetail?.vote_average),
      genres: JSON.stringify(genreMovie),
    };

    try {
      await saveFavoriteMovie(storeFavMovie, getUser?.id);
      setIsFavorite(true);
    } catch (error) {
      // console.error('Failed to save favorite:', error);
    }
  }, [resultMovieDetail, getUser?.id, saveFavoriteMovie]);

  const onDeleteFavorite = useCallback(async () => {
    try {
      await deleteFavoriteMovie(String(resultMovieDetail?.id), getUser?.id);
      setIsFavorite(false);
    } catch (error) {
      // console.error('Failed to delete favorite:', error);
    }
  }, [resultMovieDetail?.id, getUser?.id, deleteFavoriteMovie]);

  const onUpdateFavorite = useCallback(async () => {
    if (!resultMovieDetail?.id || !getUser?.id) {
      return;
    }

    try {
      const res = await getFavoriteMovie(
        String(resultMovieDetail.id),
        getUser.id,
      );
      setIsFavorite(!!res);
    } catch (error) {
      // console.error('Failed to check favorite status:', error);
      setIsFavorite(false);
    }
  }, [resultMovieDetail?.id, getUser?.id, getFavoriteMovie]);

  const onPressCastCrew = useCallback(item => {
    setValCastCrew(item);
    setVisibleModal(true);
  }, []);

  const onPressThumbnail = useCallback(item => {
    navigation.navigate('WebViewScreen', { url: item?.videoUrl || '' });
  }, []);

  const handleModalClose = useCallback(() => {
    setVisibleModal(false);
  }, []);

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onNavigateToMovieList = useCallback(() => {
    navigation.navigate('MovieListScreen', {
      movieList: resultMovieDetailSimilar,
      title: 'Similar Movie',
    });
  }, [navigation, resultMovieDetailSimilar]);

  const onNavigateToMovieDetail = useCallback(
    item => {
      navigation.navigate('MovieDetailScreen', { movieData: item });
    },
    [navigation],
  );

  const onScroll = useCallback(event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const shouldBeAtTop = offsetY <= 0;

    setIsAtTop(prev => {
      if (prev !== shouldBeAtTop) {
        return shouldBeAtTop;
      }
      return prev;
    });
  }, []);

  const isLoadingRefreshScreen = useMemo(() => {
    return (
      isLoading ||
      isLoadingMovieDetail ||
      isLoadingMovieGenre ||
      isLoadingMovieDetailCredits ||
      isLoadingMovieDetailSimilar ||
      isLoadingMovieVideos
    );
  }, [
    isLoading,
    isLoadingMovieDetail,
    isLoadingMovieGenre,
    isLoadingMovieDetailCredits,
    isLoadingMovieDetailSimilar,
  ]);

  const onRefreshScreen = useCallback(async () => {
    setIsLoading(true);

    const minDelay = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      await Promise.all([
        minDelay,
        onRefetchMovieDetail(),
        onRefetchMovieGenre(),
        onRefetchMovieDetailCredits(),
        onRefetchMovieDetailSimilar(),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [
    onRefetchMovieDetail,
    onRefetchMovieGenre,
    onRefetchMovieDetailCredits,
    onRefetchMovieDetailSimilar,
  ]);

  useFocusEffect(
    useCallback(() => {
      if (resultMovieDetail?.id || getUser?.id) {
        onUpdateFavorite();
      }
    }, [resultMovieDetail?.id, getUser?.id]),
  );

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <ImageBackground
          source={{ uri: urlImageBackdrop }}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: screenWidth,
            height: screenHeight * 0.68,
            opacity: 0.2,
            zIndex: 0,
          }}
        />
        <LinearGradient
          colors={['transparent', tw.color('primaryDark')]}
          style={{
            position: 'absolute',
            top: screenHeight * 0.68 - screenHeight * 0.3,
            left: 0,
            right: 0,
            width: screenWidth,
            height: screenHeight * 0.3,
            zIndex: 0,
          }}
        />
        {/* <ImageBackground
          source={{ uri: urlImageBackdrop }}
          resizeMode="cover"
          style={tw.style('absolute h-78% w-full opacity-20 z-0')}
        />
        <LinearGradient
          colors={['transparent', tw.color('primaryDark')]}
          style={tw.style('absolute top-0 mt-82 h-48 w-full z-0')}
        /> */}
        <ScrollView
          stickyHeaderIndices={[0]}
          scrollEventThrottle={16}
          onScroll={onScroll}
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
            onBackPress={onBackPress}
          />
          <View style={tw.style('items-center mb-8')}>
            <Pressable
              onPress={() => setVisiblePoster(true)}
              style={tw.style('h-90 w-65% rounded-xl mb-6')}>
              <FastImage
                source={{ uri: urlImageBackdrop }}
                resizeMode="cover"
                style={tw.style('h-full w-full rounded-xl')}
              />
            </Pressable>
            <View style={tw.style('flex-row items-center mb-2')}>
              <Calendar
                color={tw.color('textWhite')}
                size={16}
                style={tw.style('mr-1')}
              />
              <Text style={tw.style('ml-1 text-white font-montserrat')}>
                {formatDateWithPrefix(resultMovieDetail?.release_date)}
              </Text>
            </View>
            <Text
              style={tw.style(
                'text-white text-center text-base font-montserrat',
              )}>
              {genreText}
            </Text>
          </View>
          <View style={tw.style('flex-row justify-center mb-6')}>
            {rated !== 0 && (
              <TouchableOpacity
                style={tw.style(
                  'flex-row items-center bg-primarySoft px-4 rounded-full mr-2',
                )}>
                <Star
                  size={25}
                  color={tw.color('secondaryOrange')}
                  fill={tw.color('secondaryOrange')}
                />
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
              {isFavorite ? (
                <Heart
                  size={25}
                  color={tw.color('secondaryRed')}
                  fill={tw.color('secondaryRed')}
                />
              ) : (
                <Heart
                  size={25}
                  color={tw.color('primaryBlueAccent')}
                  fill={tw.color('primaryBlueAccent')}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'h-14 bg-primarySoft justify-center p-4 rounded-full ml-2',
              )}>
              <SquareArrowOutUpRight color={tw.color('white')} size={25} />
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

          <View style={tw.style('px-4 bg-primaryDark')}>
            <Text
              style={tw.style(
                'text-base text-white font-montserratSemiBold mb-2 mt-2',
              )}>
              Duration
            </Text>
            <Text style={tw.style('text-white font-montserrat mb-2')}>
              {resultMovieDetail?.runtime || ''} Minutes
            </Text>
          </View>

          <ThumbnailSection
            title="Trailer & Teaser"
            data={videoThumbnails}
            styles={tw.style('bg-primaryDark pt-2 pb-2')}
            onPressThumbnail={item => {
              onPressThumbnail(item);
            }}
          />

          <CastCrewSection
            title="Cast"
            data={valCastArray}
            styles={tw.style('bg-primaryDark pb-2 pt-2')}
            onPressCastCrew={item => {
              onPressCastCrew(item);
            }}
          />

          <CastCrewSection
            title="Crew"
            data={valCrewArray}
            styles={tw.style('bg-primaryDark pt-2')}
            onPressCastCrew={item => {
              onPressCastCrew(item);
            }}
          />

          <View style={tw.style('h-6 bg-primaryDark')} />

          <HomeSection
            title="Similar Movie"
            // isSeeAll={false}
            styles={tw.style('mb-6 bg-primaryDark')}
            dataHomeSection={resultMovieDetailSimilar}
            onPressSeeAll={onNavigateToMovieList}
            onPressHomeSection={item => {
              onNavigateToMovieDetail(item);
            }}
          />
        </ScrollView>
      </View>

      <ImageView
        images={[{ uri: urlImageBackdrop }]}
        imageIndex={0}
        visible={visiblePoster}
        onRequestClose={() => setVisiblePoster(false)}
      />

      <ReactNativeModal
        isVisible={visibleModal}
        onBackdropPress={handleModalClose}>
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
              onPress={handleModalClose}
            />
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
}
