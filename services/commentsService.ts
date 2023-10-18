import { httpClient } from '@/http/httpClient';
import type { Comment } from '@/types';

const getCommentsByPostId = (postId: string) => {
  return httpClient.get<void, Comment[]>(`/comments/${postId}`);
};

const createComment = (data: Pick<Comment, 'message' | 'userId' | 'postId'>) => {
  return httpClient.post<void, Comment>('/comments', data);
};

export const commentsService = { getCommentsByPostId, createComment };
