import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiError, UserCredentials } from '@/types';
import type { AxiosError } from 'axios';
import { authService } from '@/services/authService';

export const registration = createAsyncThunk(
  'auth/registration',
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.registration(credentials);

      return response;
    } catch (err) {
      const { response } = err as AxiosError<ApiError>;

      if (!response || !response.data) {
        throw err;
      }

      return rejectWithValue(response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Omit<UserCredentials, 'username'>, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      return response;
    } catch (err) {
      const { response } = err as AxiosError<ApiError>;

      if (!response || !response.data) {
        throw err;
      }

      return rejectWithValue(response.data);
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  () => authService.logout()
);

export const checkAuth = createAsyncThunk(
  'auth/check',
  () => authService.refresh()
);

