import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiError, Post, UserCredentials } from '@/types';
import type { AxiosError } from 'axios';
import { postService } from '@/services/postService';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (_:any, { rejectWithValue }) => {
    try {
      const posts = await postService.getPosts();

      return posts;
    } catch (err) {
      const { response } = err as AxiosError<ApiError>;

      if (!response || !response.data) {
        throw err;
      }

      return rejectWithValue(response.data);
    }
  }
);



export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchByUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const posts = await postService.getPostsByUser(userId);

      return posts;
    } catch (err) {
      const { response } = err as AxiosError<ApiError>;

      if (!response || !response.data) {
        throw err;
      }

      return rejectWithValue(response.data);
    }
  }
);

export const fetchOnePost = createAsyncThunk(
  'posts/fetchOne',
  async (userId: string, { rejectWithValue }) => {
    try {
      const post = await postService.getOnePost(userId);

      return post;
    } catch (err) {
      const { response } = err as AxiosError<ApiError>;

      if (!response || !response.data) {
        throw err;
      }

      return rejectWithValue(response.data);
    }
  }
);

export const createNewPost = createAsyncThunk(
  'posts/create',
  async (data: Pick<Post, 'userId' | 'description'>, { rejectWithValue }) => {
    try {
      const post = await postService.createPost(data);

      return post;
    } catch (err) {
      const { response } = err as AxiosError<ApiError>;

      if (!response || !response.data) {
        throw err;
      }

      return rejectWithValue(response.data);
    }
  }
);
