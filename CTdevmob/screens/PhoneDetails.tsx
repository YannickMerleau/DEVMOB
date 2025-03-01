import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import { RootState } from '../store';

const PhoneDetails: React.FC<{ route: any }> = ({ route }) => {
  const { phone } = route.params;
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favorites.some((fav) => fav.id === phone.id),
  );

  return (
    <View style={styles.container}>
      {/* Titre de l'annonce */}
      <Text style={styles.title}>{phone.model}</Text>

      {/* Section Information */}
      <Text style={styles.sectionTitle}>Information :</Text>
      <Text style={styles.info}>Prix : {phone.price} €</Text>
      <Text style={styles.info}>Système d'exploitation : {phone.os}</Text>
      <Text style={styles.info}>Marque : {phone.constructor}</Text>
      <Text style={styles.info}>Année de sortie : {phone.releaseDate}</Text>

      {/* Section Vendeur */}
      <Text style={styles.sectionTitle}>Vendeur :</Text>
      <View style={styles.sellerContainer}>
        <Image source={{ uri: phone.salerAvatar }} style={styles.avatar} />
        <View>
          <Text style={styles.sellerName}>{phone.saler}</Text>
          <Text style={styles.sellerInfo}>
            Pays : {phone.salerCountry} • Ville : {phone.salerCity}
          </Text>
          <Text style={styles.sellerInfo}>Tel. {phone.phone}</Text>
        </View>
      </View>

      {/* Section Description */}
      <Text style={styles.sectionTitle}>Description :</Text>
      <Text style={styles.description}>{phone.description}</Text>

      {/* Bouton Favoris */}
      <View style={styles.buttonContainer}>
        {isFavorite ? (
          <Button
            title="Retirer des favoris"
            color="#C82333"
            onPress={() => dispatch(removeFavorite(phone.id))}
          />
        ) : (
          <Button
            title="Ajouter au favoris"
            color="#28A745"
            onPress={() => dispatch(addFavorite(phone))}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sellerInfo: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default PhoneDetails;
