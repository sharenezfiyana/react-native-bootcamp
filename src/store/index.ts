import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostReducer from './PostReducer/PostReducer';
import FavReducer from './FavReducer/FavReducer';
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  post: PostReducer,
  fav : FavReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export {store, persistor};
