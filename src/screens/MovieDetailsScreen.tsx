// src/screens/MovieDetailsScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../redux/movieslice';
import { RootState } from '../redux/store';
import { RouteProp } from '@react-navigation/native';

type ParamList = {
  MovieDetail: {
    movieId: string;
  };
};

interface MovieDetailsScreenProps {
  route: RouteProp<ParamList, 'MovieDetail'>;
}

const MovieDetailsScreen: React.FC<MovieDetailsScreenProps> = ({ route }) => {
  const { movieId } = route.params;
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.movies.selectedMovie);

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, [dispatch, movieId]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text>{movie.description}</Text>
      <Text style={styles.subtitle}>Actors:</Text>
      {movie.actors?.map((actor, index) => (
        <Text key={index}>{actor}</Text>
      ))}
      <Text style={styles.subtitle}>Reviews:</Text>
      {movie.reviews?.map((review, index) => (
        <Text key={index}>{review}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default MovieDetailsScreen;
