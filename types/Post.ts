import { User } from './User';
import { Comment } from './Comment';

export interface Post {
  id: string;
  description: string;
  photo: string | null;
  userId: string;
  createdAt: Date;
  user: User;
  comment: Comment;
}
