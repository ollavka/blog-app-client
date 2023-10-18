'use client';

import { FC } from 'react';
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
import { createNewPost } from '@/redux/features/post/thunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/selectors';
import { AiOutlineWarning } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Post } from '@/types';

type Props = {
  onClose: () => void;
};

export const CreatePostModal: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const { register, formState, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });
  const { errors, isValid, isSubmitting } = formState;

  const onSubmit: SubmitHandler<Pick<Post, 'description'>> = async ({
    description,
  }) => {
    if (!description) {
      return;
    }

    try {
      const data = await dispatch(
        createNewPost({ userId: user.id, description })
      );

      if (data?.error) {
        toast.error('Oops: Something went wrong');
        return;
      }

      reset();
      toast.success('Post was successfuly created');
    } catch (err) {
      toast.error('Oops: Something went wrong');
    }
  };

  return (
    <Modal isCentered isOpen onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton className="hover:bg-gray-600" />
        <ModalBody>
          <form
            method="post"
            className="flex flex-col gap-4 p-10 rounded-md"
            onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
          >
            <div className="flex flex-col gap-2">
              <label className="font-bold select-none" htmlFor="description">
                Descritpion:
              </label>

              <Textarea
                {...register('description', {
                  required: 'Description is required',
                })}
                id="description"
                placeholder="new post"
              />

              {errors?.description && (
                <div className="flex gap-2 items-center mt-1">
                  <AiOutlineWarning className="text-red-500" />
                  <p className="text-xs text-red-500">
                    {errors.description.message as string}
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
      </ModalContent>
    </Modal>
  );
};
