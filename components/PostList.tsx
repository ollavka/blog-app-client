'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/selectors';
import { selectPosts } from '@/redux/features/post/selectors';
import { fetchPosts } from '@/redux/features/post/thunks';
import { RequireAuth } from './RequireAuth';
import { FullScreenLoader } from './FullScreenLoader';
import { PostItem } from './PostItem';

const PostList = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const { user } = useAppSelector(selectAuth);
  const { posts, isLoading, error } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPageLoading(false);
  }, []);

  useEffect(() => {
    if(pageLoading) {
      return;
    }

    dispatch(fetchPosts(null));
  }, [pageLoading])

  if (pageLoading || isLoading) {
    return (
      <FullScreenLoader />
    );
  }

  return (
    <div className="flex flex-col p-4 gap-2">
      {posts.length > 0 ? (
        posts.map(post => (
          <PostItem post={post} key={post.id} />
        ))
      ) : (
        <p className="text-3xl">No posts</p>
      )}
    </div>
  );
}

export default RequireAuth(PostList);
