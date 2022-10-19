import {View,Text,StyleSheet,FlatList,ListRenderItemInfo,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IHomeScreen} from '../interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import { removeFromFavorites } from '../store/FavReducer/FavReducer';

const ImageSource = require('../../images/trash.png')

const FavoriteScreen = () => {
  
  const dispatch = useDispatch();
  const favState = useSelector((state: RootState) => state.fav);
   const renderTodoItem = (renderItemInfo: ListRenderItemInfo<IHomeScreen>) => {
    const {item} = renderItemInfo;
    
    const deleteFromFav = () => {
      const data: IHomeScreen = {
        id: item.id,
        title: `${item.title}`,
        price :`${item.price}`,
        image: `${item.image}`,
        description :`${item.description}`
      }
      dispatch(removeFromFavorites(data))
    }
    return (
        <View style={styles.itemContainer}>
          <Image
            source={{uri: `${item.image}`}}
            style={{height: 75, width: 65,padding: 10, marginEnd:10, alignItems:'flex-start'}}></Image>
            <View><Text style={styles.textTitle}>{item.title}</Text><Text style={styles.prices}>{item.price}</Text></View>
            <TouchableOpacity onPress={deleteFromFav} >
                <Image source={ImageSource} style={styles.image}></Image>
              </TouchableOpacity>
        </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={favState.favs} renderItem={renderTodoItem} />
    </View>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor:'white',
    fontFamily:'sans-serif'
  },
  itemContainer: {
    display: 'flex',
    flexDirection:'row',
    padding: 12,
    margin: 12,
    backgroundColor:'#F3F1F5',
    borderRadius:8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textTitle:{
    marginTop:12,
    fontSize: 13,
    width:280,
    fontWeight: 'bold',
    textAlign: 'left', 
    color:'black',
  },
  prices:{
    marginTop:7,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
      marginTop: 50,
      height: 20,
      width: 20,
      padding: 5,
      marginLeft: -10
  }
});