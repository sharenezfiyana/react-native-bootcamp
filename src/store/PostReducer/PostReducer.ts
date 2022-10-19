import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IHomeScreen} from '../../interfaces';

interface PostState {
  posts: IHomeScreen[];
}

const initialState = {
  posts: [],
} as PostState;

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    savePost(state, action: PayloadAction<IHomeScreen[]>) {
      state.posts = action.payload;
    },
  },
});

export const {savePost} = postSlice.actions;
export default postSlice.reducer;
