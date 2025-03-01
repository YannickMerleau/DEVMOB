import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Phone } from './Phone';

interface PhoneListProps {
  phones: Phone[];
  onPressPhone: (phone: Phone) => void;
}

const PhoneList: React.FC<PhoneListProps> = ({ phones, onPressPhone }) => {
  return (
    <FlatList
      data={phones}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressPhone(item)}>
          <View style={styles.phoneContainer}>
            <Image source={{ uri: item.salerAvatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.model}</Text>
              <Text style={styles.subtitle}>
                {item.constructor} - {item.os}
              </Text>
              <Text style={styles.price}>{item.price} €</Text>
              <Text style={styles.seller}>
                Vendu par {item.saler} ({item.salerCity}, {item.salerCountry})
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Pour Android
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  seller: {
    fontSize: 12,
    color: '#888',
  },
});

export default PhoneList;
