import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Phone } from '../components/Phone';

type FavoritesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorites'
>;

const FavoritesScreen: React.FC<{
  navigation: FavoritesScreenNavigationProp;
}> = ({ navigation }) => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  return (
    <View style={styles.container}>
      {/* Bouton pour revenir à la liste des annonces */}
      <View style={styles.backContainer}>
        <Button
          title="Retour à la liste"
          color="#28A745"
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      {/* Nombre de favoris */}
      <Text style={styles.annonceCount}>
        Nombre de favoris : {favorites.length}
      </Text>

      {/* Liste des favoris ou message si vide */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { phone: item })}
            >
              <View style={styles.phoneContainer}>
                <Text style={styles.phoneTitle}>{item.model}</Text>
                <Text style={styles.phonePrice}>
                  {item.releaseDate} - {item.price} €
                </Text>
                <Text style={styles.phoneDescription} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>
          Vous n'avez aucun favori pour le moment.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  backContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  annonceCount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phoneContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  phoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phonePrice: {
    fontSize: 14,
    color: '#666',
  },
  phoneDescription: {
    fontSize: 14,
    color: '#444',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
