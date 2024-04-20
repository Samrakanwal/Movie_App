// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomMovies, searchMovies } from '../redux/movieslice';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchRandomMovies());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(searchMovies(searchQuery));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
    >
      <Image source={{ uri: item.poster }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginLeft: 15,
  },
  image: {
    width: 50,
    height: 75,
  },
});

export default HomeScreen;
