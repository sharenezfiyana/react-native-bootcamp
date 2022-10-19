import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigation from './src/navigation';
import DetailScreen from './src/screens/DetailScreen';
import {persistor, store} from './src/store';

const App = () => {
  // const localImageSource = require('./images/ASD.png')

  return (
    <SafeAreaView style={styles.base}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    flex: 1,
  },

  backgroundView: {
    backgroundColor: 'grey',
    height: '50%',
  },

  sampleText: {
    color: 'white',
    fontSize: 24,
  },

  button: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
  },

  image: {
    height: 100,
    width: 100,
  },
});

export default App;
