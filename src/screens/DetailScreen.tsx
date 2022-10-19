import {View, Text, Image, StyleSheet, Button, ScrollView, ActivityIndicator} from 'react-native';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {savePost} from '../store/PostReducer/PostReducer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackParamList';
import { IHomeScreen } from '../interfaces';
import { addToFavorites, removeFromFavorites } from '../store/FavReducer/FavReducer';
import { RootState } from '../store';



const DetailScreen = () => {
    useEffect(() => {
        klik();
        btn();
    }, []);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [addFav,setaddFav] = useState('');
    const [flag,setflag] = useState(false);
    const like = useSelector((state: RootState) => state.fav);

    const btn = () => {
        if (like.favs.some(e => e.id === route.params.item.id)) {
            setflag(true);
            setaddFav('REMOVE FROM FAVORITE');
          } else {
            setflag(false);
            setaddFav('ADD TO FAVORITE');
          }
    }
    const addToFavorite = () => {
      const favorites: IHomeScreen = {
          id: route.params.item.id,
          title: `${route.params.item.title}`,
          price :`${route.params.item.price}`,
          image: `${route.params.item.image}`,
          description :`${route.params.item.description}`
      }
      if (flag) {
        setflag(false);
        setaddFav('ADD TO FAVORITE');
        dispatch(removeFromFavorites(favorites))
      } else {
        setflag(true);
        setaddFav('REMOVE FROM FAVORITE');
        dispatch(addToFavorites(favorites))
      }
    }
    const klik = async () => {
        try {
        setLoading(true);
        const url =
            'https://fakestoreapi.com/products/'+`${route.params.item.id}`;
        const response = await axios.get<IHomeScreen[]>(url);
        } catch (ex) {
        console.log(ex);
        } finally {
        setLoading(false);
        }
    };
    const route = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>();
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    return (
        <View style={{display:'flex',flex:1}}>
            <ScrollView>
            <View style={styles.itemContainer}><Image
            source={{uri: `${route.params.item.image}`}}
            style={{marginLeft:'auto', marginRight:'auto',height: 275, width: 265,}}></Image>
            </View>
            <Text style={{fontSize:20,marginTop:18,marginLeft:20, color:'black',fontWeight:'bold'}}>Title:</Text>
            <Text style={{fontSize:16,marginTop:5,marginLeft:20, color:'black'}}>{route.params.item.title}</Text>
            <Text style={{fontSize:20,marginTop:18,marginLeft:20, color:'black',fontWeight:'bold'}}>Price:</Text>
            <Text style={{fontSize:16,marginTop:5,marginLeft:20, color:'black'}}>${route.params.item.price}</Text>
            <Text style={{fontSize:20,marginTop:18,marginLeft:20, color:'black',fontWeight:'bold'}}>Description:</Text>
            <Text style={{fontSize:16,marginTop:5, marginBottom: 20,marginLeft:20, color:'black'}}>{route.params.item.title}{route.params.item.description}</Text>
            <Button title={addFav} onPress={addToFavorite}/></ScrollView>
        </View>
  );
  
};

export default DetailScreen;


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor:'white',
    fontFamily:'sans-serif'
  },
  itemContainer: {
    backgroundColor:'#686D76',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.55,
    shadowRadius: 4.84,

    elevation: 5,
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 
