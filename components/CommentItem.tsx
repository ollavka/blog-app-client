'use client';

import { FC } from 'react';
import { Box, Avatar, Spacer, Button } from '@chakra-ui/react';
import { commentsService } from '@/services/commentsService';
import { CommentsModal } from './CommentsModal';
import type { Comment } from '@/types';
import Link from 'next/link';

type Props = {
  comment: Comment;
};

export const CommentItem: FC<Props> = ({ comment }) => {
  const { user } = comment;

  const date = new Date(comment.createdAt);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}/${hours}-${minutes}`;

  return (
    <Box
      p="4"
      mb="4"
      bg="gray.800"
      borderRadius="lg"
      boxShadow="md"
      color="white"
      w="full"
    >
      <div className="flex flex-col md:flex-row">
        <Link href={`/profile/${user.username}`}>
          <Avatar
            src={user.avatar || '/images/avatar.png'}
            size="md"
            mr="2"
          />
          <p className="font-bold">{user.username}</p>
        </Link>
        <Spacer />
        <p className="text-gray-500">{formattedDate}</p>
      </div>
      <p className="mt-2">{comment.message}</p>
    </Box>
  );
};
