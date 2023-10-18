import type { User } from './User';

export type UserToUpdate = Omit<User, 'id' | 'password' | 'avatar' | 'email' | 'activationToken'>
