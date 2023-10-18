/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { accessTokenService } from '@/services/accessTokenService';
import { ApiError, User, UserToUpdate } from '@/types';
import { checkAuth, registration, login, logout } from './thunks';
import { AxiosError } from 'axios';

export interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: ApiError | AxiosError | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string>) => {
      const { user } = state;

      if (!user?.avatar) {
        return;
      }

      user.avatar = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserToUpdate>) => {
      const { payload } = action;
      const { user } = state;
      
      state.user = {
        ...user,
        ...payload,
      } as User;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(registration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(registration.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    })
    .addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as ApiError;
    });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;

        state.isAuth = true;
        state.isLoading = false;
        state.user = user;

        accessTokenService.save(accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;

        state.error = action.payload as ApiError;
      });

    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        accessTokenService.save(accessToken);

        state.user = user;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        const error = action.error as AxiosError;
        
        state.user = null;
        state.isLoading = false;
        state.isAuth = false;
        state.error = error;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.isLoading = false;
        state.user = null;

        accessTokenService.remove();
      });
  },
});

export const { setAvatar, setUserData } = authSlice.actions;

export default authSlice.reducer;
