import {View,Text,StyleSheet,FlatList,ListRenderItemInfo,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IHomeScreen} from '../interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {savePost} from '../store/PostReducer/PostReducer';
import {iteratorSymbol} from 'immer/dist/internal';
import {RootState} from '../store';
import {ITodoListItem} from '../interfaces';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';

const HomeScreen = () => {
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'DetailScreen'>>();

  const navigateToDetailScreen = (item: IHomeScreen) => {
        navigation.navigate("DetailScreen", {
            item: item
        });
    };
  const postState = useSelector((state: RootState) => state.post);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = 'https://fakestoreapi.com/products';
      const response = await axios.get<IHomeScreen[]>(url);

      dispatch(savePost(response.data));
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  const renderTodoItem = (renderItemInfo: ListRenderItemInfo<IHomeScreen>) => {
    const {item} = renderItemInfo;
    return (
      <TouchableOpacity onPress={() => navigateToDetailScreen(item)}>
        <View style={styles.itemContainer}>
          <Image
            source={{uri: `${item.image}`}}
            style={{height: 75, width: 65,padding: 10, alignItems:'flex-start'}}></Image>
            <View><Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.prices}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
  return (
    <View style={styles.container}>
      <FlatList data={postState.posts} renderItem={renderTodoItem} />
    </View>
  );
};


export default HomeScreen;

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
    fontSize: 15,
    marginRight:-50,
    marginLeft:15,
    width:290,
    fontWeight: 'bold',
    textAlign: 'left', 
    color:'black',
  },
  prices:{
    marginTop:7,
    fontSize: 14,
    marginLeft:15,
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
});
