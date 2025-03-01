import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PhoneDetails from './screens/PhoneDetails';
import { Phone } from './components/Phone';

export type RootStackParamList = {
  Home: undefined;
  Details: { phone: Phone };
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Liste des annonces',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Details"
            component={PhoneDetails}
            options={{ title: 'Annonce', headerTitleAlign: 'center' }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ title: 'Mes Favoris', headerTitleAlign: 'center' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
