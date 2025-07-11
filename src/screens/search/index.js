import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import tw from '../../../tailwind';
import { CardList } from '../../components/commons';
import { HomeSection, SearchSection } from '../../components/sections';
import useMovieToprated from '../../hooks/use-movie-toprated';
import useMovieNowplaying from '../../hooks/use-movie-nowplaying';
import useMovieGenre from '../../hooks/use-movie-genre';
import useMovieSearch from '../../hooks/use-movie-search';
import { ImgNoResult } from '../../assets';

export default function SearchScreen({ navigation }) {
  const [valueSearch, setValueSearch] = useState('');

  const { resultMovieSearch, isLoadingMovieSearch } =
    useMovieSearch(valueSearch);
  const { resultMovieToprated } = useMovieToprated();
  const { moviesToday } = useMovieNowplaying();
  const { getGenreNames } = useMovieGenre();

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <SearchSection
          placeholder="Search title movie"
          value={valueSearch}
          onChangeText={val => {
            setValueSearch(val);
          }}
          onCancel={() => {
            setValueSearch('');
          }}
          styles={tw.style('mx-4 mt-2 mb-5')}
        />
        {valueSearch !== '' &&
          resultMovieSearch.length === 0 &&
          !isLoadingMovieSearch && (
            <View style={tw.style('items-center justify-center mt-40')}>
              <View style={tw.style('mb-5')}>
                <ImgNoResult />
              </View>
              <Text
                style={tw.style(
                  'text-white font-montserratSemiBold text-base text-center mb-2',
                )}>
                We Are Sorry, We Can{'\n'} Not Find The Movie :(
              </Text>
              <Text
                style={tw.style('mb-4 text-textGrey text-sm font-montserrat')}>
                Find your movie by Type title
              </Text>
            </View>
          )}
        {valueSearch === '' &&
          resultMovieSearch.length === 0 &&
          moviesToday.length !== 0 && (
            <View style={tw.style('mx-4 mb-5')}>
              <Text
                style={tw.style(
                  'text-base text-white font-montserratSemiBold mb-4',
                )}>
                Today
              </Text>
              <CardList
                image={moviesToday[0]?.poster_path}
                title={moviesToday[0]?.title}
                key={moviesToday[0]?.id}
                relaseDate={moviesToday[0]?.release_date}
                genreName={getGenreNames(moviesToday[0]?.genre_ids)}
                onPressCard={() => {
                  navigation.navigate('MovieDetailScreen', {
                    movieData: moviesToday[0],
                  });
                }}
              />
            </View>
          )}
        {resultMovieSearch.length === 0 && valueSearch === '' && (
          <HomeSection
            title="Top Rated"
            styles={tw.style('mb-6', moviesToday.length === 0 && 'mt-5')}
            dataHomeSection={resultMovieToprated.slice(0, 5)}
            onPressSeeAll={() => {
              navigation.navigate('MovieListScreen', {
                movieList: resultMovieToprated,
                title: 'Top Rated',
              });
            }}
            onPressHomeSection={item => {
              navigation.navigate('MovieDetailScreen', { movieData: item });
            }}
          />
        )}
        {resultMovieSearch !== 0 && (
          <FlatList
            data={resultMovieSearch}
            style={tw.style('px-4')}
            keyExtractor={item => {
              return item?.id?.toString();
            }}
            renderItem={({ item, index }) => (
              <CardList
                key={index.toString()}
                image={item?.poster_path}
                title={item?.title}
                relaseDate={item?.release_date}
                rated={item?.vote_average}
                genreName={getGenreNames(item?.genre_ids)}
                onPressCard={() => {
                  navigation.navigate('MovieDetailScreen', { movieData: item });
                }}
              />
            )}
          />
        )}
      </View>
    </>
  );
}
