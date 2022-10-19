import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IHomeScreen} from '../../interfaces';

interface FavState {
  favs: IHomeScreen[];
}

const initialState = {
  favs: [],
} as FavState;

const FavSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<IHomeScreen>) {
            state.favs.unshift(action.payload)

    },
    removeFromFavorites(state, action: PayloadAction<IHomeScreen>) {
        const searchIndex = state.favs.findIndex(e => e.id == action.payload.id)
        state.favs.splice(searchIndex,1)
    },
  },
});

export const {addToFavorites, removeFromFavorites} = FavSlice.actions;
export default FavSlice.reducer;
