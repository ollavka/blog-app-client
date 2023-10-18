import { httpClient } from '@/http/httpClient';
import type { Post } from '@/types';

const getPosts = () => {
  return httpClient.get<void, Post[]>('/posts');
};

const getPostsByUser = (userId: string) => {
  return httpClient.get<void, Post[]>(`/posts/byUser/${userId}`);
};

const getOnePost = (postId: string) => {
  return httpClient.get<void, Post>(`/posts/${postId}`);
}

const createPost = (data: Pick<Post, 'description' | 'userId'>) => {
  return httpClient.post<void, Post>('/posts', data);
};

export const postService = { getPosts, getPostsByUser, getOnePost, createPost };
