'use client';

import { FC, useEffect, useState } from 'react';
import { userService } from '@/services/userService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/selectors';
import { fetchPostsByUser } from '@/redux/features/post/thunks';
import { selectPosts } from '@/redux/features/post/selectors';
import { RequireAuth } from '@/components/RequireAuth';
import { FullScreenLoader } from './FullScreenLoader';
import { PostItem } from './PostItem';
import { toast } from 'react-toastify';
import type { User } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  username: string;
};

const ProfilePage: FC<Props> = ({ username }) => {
  const { user } = useAppSelector(selectAuth);
  const { posts, isLoading: postsLoading } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const [profile, setProfile] = useState<Omit<User, 'password'> | null>(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(false);
  }, []);

  useEffect(() => {
    if (pageLoading) {
      return;
    }

    async function loadProfile() {
      setError(false);

      try {
        const data = await userService.loadUserProfile(username);
        setProfile(data);
      } catch (err) {
        setError(true);
        toast.error('Oops, something went wrong');
      } finally {
        setLoaded(true);
      }
    }

    loadProfile();
  }, [pageLoading]);

  useEffect(() => {
    if (pageLoading || !profile) {
      return;
    }

    dispatch(fetchPostsByUser(profile.id));
  }, [pageLoading, profile]);

  if (!loaded || postsLoading) {
    return (
      <FullScreenLoader />
    )
  }

  if (error || (!profile && loaded)) {
    return (
      <div className="h-screen md:h-full flex items-center justify-center">
        <h1 className="font-bold text-center text-4xl">User with this username was not found</h1>
      </div>
    );
  }

  return (
    <section>
      <div className="flex gap-8 md:gap-20">
        <div className="w-20 h-20 md:w-36 md:h-36 rounded-full border-white border relative overflow-hidden">
          <Image
            width={500}
            height={500}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={profile?.avatar || '/images/avatar.png'}
            alt="avatar"
          />
        </div>

        <div className="flex flex-col gap-4 md:gap-2">
          <div className="flex flex-col md:block gap-1 justify-around">
            <span className="inline-block pb-2 md:pb-0 md:pr-4 border-b md:border-r md:border-b-0 border-neutral-700">{profile?.username}</span>
            <span className="inline-block pt-2 md:pt-0 md:pl-4">{posts.length || 0} posts</span>
          </div>

          {user && (profile?.username === user.username) ? (
            <Link
              href="/profile/edit"
              className="self-start md:self-stretch bg-neutral-700 text-xs text-center font-semibold rounded-md px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-neutral-800"
            >
              Edit profile
            </Link>
          ) : (
            <button
              className="self-start md:self-stretch bg-neutral-700 text-xs text-center font-semibold rounded-md px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-neutral-800"
              onClick={() => alert('in development')}
            >
              Follow
            </button>
          )}
        </div>
      </div>

      {(profile?.firstName || profile?.lastName) && (
        <p className="mt-12 font-bold text-md md:text-xl max-w-[80%] md:max-w-[60%]">{`${profile?.firstName} ${profile?.lastName}`}</p>
      )}

      <p className="mt-12 max-w-[80%] md:max-w-[60%]">{profile?.biography || 'No biography'}</p>

      <div className="mt-8 w-full h-[1px] bg-neutral-700" />

      {(posts.length && user) ? (
        <>
          <p className="text-3xl font-bold text-center my-2">
            Posts:
          </p>
          <div className="flex flex-col gap-1 p-4">
            {posts.map(post => (
              <PostItem post={post} key={post.id} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-3xl font-bold text-center mt-16">
          No Posts
        </p>
      )}
    </section>
  );
};

export default RequireAuth(ProfilePage);
