import { User } from './User';

export interface Comment {
  id: string;
  message: string;
  createdAt: Date;
  userId: string;
  postId: string;
  user: User;
}
