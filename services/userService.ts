import { httpClient } from '@/http/httpClient';
import type { ApiSuccess, UserToUpdate, User } from '@/types';

const uploadAvatar = (avatar: File) => {
  return httpClient.post<void, { avatarUrl: string }>(
    '/users/uploadAvatar',
    { avatar },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

const updateUserData = (data: UserToUpdate) => {
  return httpClient.patch<void, ApiSuccess>('/users/updateUserData', data);
};

const loadUserProfile = (username: string) => {
  return httpClient.get<void, Omit<User, 'password'>>(`/users/${username}`);
}

export const userService = { uploadAvatar, updateUserData, loadUserProfile };
