import type { User } from './User';

export interface AuthResponse {
  accessToken: string;
  user: User;
}
