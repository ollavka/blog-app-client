'use client';

import { FC, useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { commentsService } from '@/services/commentsService';
import { AiOutlineWarning } from 'react-icons/ai';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/selectors';
import { CommentItem } from './CommentItem';
import { Loader } from './Loader';
import { toast } from 'react-toastify';
import { Comment } from '@/types';

type Props = {
  onClose: () => void;
  postId: string;
};

export const CommentsModal: FC<Props> = ({ postId, onClose }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user } = useAppSelector(selectAuth);

  const { register, formState, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });
  const { errors, isValid, isSubmitting } = formState;

  useEffect(() => {
    setPageLoading(false);
  }, []);

  useEffect(() => {
    if (pageLoading) {
      return;
    }

    const loadComments = async () => {
      setLoading(true);

      try {
        const data = await commentsService.getCommentsByPostId(postId);
        setCommentList(data);
      } catch (err) {
        toast.error('Oops: Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [pageLoading]);

  const onSubmit: SubmitHandler<{ message: string }> = async ({ message }) => {
    if (!message) {
      return;
    }

    try {
      const data = await commentsService.createComment({
        message,
        postId,
        userId: user?.id as string,
      });

      setCommentList((prev) => [data, ...prev]);

      reset();
      toast.success('Comment was successfuly created');
    } catch (err) {
      toast.error('Oops: Something went wrong');
    }
  };

  return (
    <Modal isCentered isOpen onClose={onClose} size="xl">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent>
        {pageLoading || loading ? (
          <div className="flex justify-center items-center py-40">
            <Loader />
          </div>
        ) : (
          <>
            <ModalHeader>Comments</ModalHeader>
            <ModalCloseButton className="hover:bg-gray-600" />
            <ModalBody>
              <div className="border-b pb-4 max-h-[300px] overflow-y-auto">
                {!commentList.length && (
                  <p className="font-bold text-3xl text-center">
                    No comments yet
                  </p>
                )}

                {commentList.map((comment) => (
                  <CommentItem comment={comment} key={comment.id} />
                ))}
              </div>
              <form
                method="post"
                className="flex flex-col gap-4 mt-4 rounded-md"
                onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
              >
                <div className="flex flex-col gap-2">
                  <label className="font-bold select-none" htmlFor="message">
                    Message:
                  </label>

                  <Textarea
                    {...register('message', {
                      required: 'Message is required',
                    })}
                    id="message"
                    placeholder="new comment"
                  />

                  {errors?.message && (
                    <div className="flex gap-2 items-center mt-1">
                      <AiOutlineWarning className="text-red-500" />
                      <p className="text-xs text-red-500">
                        {errors.message.message as string}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  colorScheme="whatsapp"
                  className="bg-green-500"
                  isLoading={isSubmitting}
                  isDisabled={!isValid || isSubmitting}
                >
                  Submit
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
