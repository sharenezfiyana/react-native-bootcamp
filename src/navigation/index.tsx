import React,{Component} from 'react';
import {View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParamList';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();
const ImageSource = require('../../images/heart.png')

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
        name={'HomeScreen'} 
        component={HomeScreen}
        options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity  onPress={() => navigation.navigate('FavoriteScreen')}>
                <Image source={ImageSource} style={styles.image}></Image>
              </TouchableOpacity>
            ),
        })}
        />
        <Stack.Screen name={'DetailScreen'} component={DetailScreen} /> 
        <Stack.Screen name={'FavoriteScreen'} component={FavoriteScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
    image: {
      height: 25,
      width: 25
    }
  });
export default AppNavigation;
