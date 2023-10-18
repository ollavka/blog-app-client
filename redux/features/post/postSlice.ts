/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createNewPost, fetchOnePost, fetchPosts, fetchPostsByUser } from './thunks';
import { ApiError, Post } from '@/types';
import { AxiosError } from 'axios';

export interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  error: ApiError | AxiosError | null;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ApiError;
      });

    builder
      .addCase(fetchPostsByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ApiError;
      });

    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ApiError;
      });

    builder
      .addCase(fetchOnePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOnePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.selectedPost = action.payload;
      })
      .addCase(fetchOnePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ApiError;
      });
  },
});

export default postSlice.reducer;
