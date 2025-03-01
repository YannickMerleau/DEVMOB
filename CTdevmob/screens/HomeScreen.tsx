import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Phone } from '../components/Phone';
import phoneData from '../donnees/phone.json';

type HomeScreenNavigationProp = StackNavigationProp<any, 'Home'>;

const HomeScreen: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedBrand, setSelectedBrand] = useState('Toutes');
  const [showFilters, setShowFilters] = useState(false);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favorites.length,
  );

  useEffect(() => {
    setPhones(phoneData);
  }, []);

  const handlePressPhone = (phone: Phone) => {
    navigation.navigate('Details', { phone });
  };

  const filteredPhones = phones
    .filter((phone) =>
      phone.model.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter(
      (phone) =>
        selectedBrand === 'Toutes' || phone.constructor === selectedBrand,
    )
    .sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      if (sortOption === 'year_desc') return b.releaseDate - a.releaseDate;
      return 0;
    });

  const brands = [
    'Toutes',
    ...new Set(phones.map((phone) => phone.constructor)),
  ];

  return (
    <View style={styles.container}>
      {/* Bouton Favoris */}
      <View style={styles.favoritesContainer}>
        <Button
          title={`Mes favoris : ${favoritesCount}`}
          color="#28A745"
          onPress={() => navigation.navigate('Favorites')}
        />
      </View>

      {/* Champ de recherche */}
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un téléphone"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Bouton pour afficher/masquer les filtres */}
      <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
        <Text style={styles.toggleFilters}>
          {showFilters ? 'Masquer les filtres ▲' : 'Afficher les filtres ▼'}
        </Text>
      </TouchableOpacity>

      {/* Affichage des filtres seulement si showFilters est true */}
      {showFilters && (
        <View style={styles.filterContainer}>
          {/* Filtre par marque */}
          <Text style={styles.filterTitle}>Marque : {selectedBrand}</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedBrand}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedBrand(itemValue)}
            >
              {brands.map((brand) => (
                <Picker.Item
                  key={brand}
                  label={brand}
                  value={brand}
                  style={{ color: brand === selectedBrand ? 'green' : 'black' }} // ✅ Met en vert l'option choisie
                />
              ))}
            </Picker>
          </View>

          {/* Filtre par tri (prix/année) */}
          <Text style={styles.filterTitle}>
            Trier par :{' '}
            {sortOption === 'default'
              ? 'Par défaut'
              : sortOption === 'price_asc'
                ? 'Prix croissant'
                : sortOption === 'price_desc'
                  ? 'Prix décroissant'
                  : 'Année décroissante'}
          </Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={sortOption}
              style={styles.picker}
              onValueChange={(itemValue) => setSortOption(itemValue)}
            >
              <Picker.Item
                label="Par défaut"
                value="default"
                style={{ color: sortOption === 'default' ? 'green' : 'black' }}
              />
              <Picker.Item
                label="Prix croissant"
                value="price_asc"
                style={{
                  color: sortOption === 'price_asc' ? 'green' : 'black',
                }}
              />
              <Picker.Item
                label="Prix décroissant"
                value="price_desc"
                style={{
                  color: sortOption === 'price_desc' ? 'green' : 'black',
                }}
              />
              <Picker.Item
                label="Année décroissante"
                value="year_desc"
                style={{
                  color: sortOption === 'year_desc' ? 'green' : 'black',
                }}
              />
            </Picker>
          </View>

          {/* Bouton Réinitialiser */}
          <TouchableOpacity
            onPress={() => {
              setSelectedBrand('Toutes');
              setSortOption('default');
            }}
          >
            <Text style={styles.resetFilters}>Réinitialiser les filtres</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Nombre d'annonces */}
      <Text style={styles.annonceCount}>
        Nombre d'annonces : {filteredPhones.length}
      </Text>

      {/* Liste des annonces */}
      <FlatList
        data={filteredPhones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressPhone(item)}>
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
  favoritesContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  toggleFilters: {
    textAlign: 'center',
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resetFilters: {
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  filterContainer: {
    flexDirection: 'column',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
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
});

export default HomeScreen;
