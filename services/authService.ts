import { authClient } from '@/http/authClient';
import type { ApiSuccess, AuthResponse, UserCredentials } from '@/types';

const registration = (credentials: UserCredentials) => {
  return authClient.post<void, ApiSuccess>('/registration', credentials);
};

const login = (credentials: Omit<UserCredentials, 'username'>) => {
  return authClient.post<void, AuthResponse>('/login', credentials);
};

const logout = () => {
  return authClient.post('/logout')
};

const activate = (activationToken: string) => {
  return authClient.get<ApiSuccess>(`/activation/${activationToken}`);
};

const refresh = () => {
  return authClient.get<void, AuthResponse>('/refresh');
};

export const authService = { registration, login, logout, activate, refresh };
