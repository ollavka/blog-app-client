'use client';

import { FC, useState } from 'react';
import { Box, Avatar, Spacer, Button } from '@chakra-ui/react';
import { commentsService } from '@/services/commentsService';
import { CommentsModal } from './CommentsModal';
import type { Post } from '@/types';
import Link from 'next/link';

type Props = {
  post: Post;
};

export const PostItem: FC<Props> = ({ post }) => {
  const { user } = post;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
            <Avatar src={user.avatar || '/images/avatar.png'} alt="avatar" size="md" mr="2" />
            <p className="font-bold">{user.username}</p>
          </Link>
          <Spacer />
          <p className="text-gray-500">
            {post.createdAt}
          </p>
        </div>
        <p className="mt-2">{post.description}</p>

        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-400 hover:bg-green-400/50 mt-4"
          colorScheme="whatsapp"
        >
          Show comments
        </Button>
      </Box>

      {showModal && (
        <CommentsModal onClose={() => setShowModal(false)} postId={post.id} />
      )}
    </>
  )
}
