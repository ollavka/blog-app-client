'use client';

import { useState, ChangeEvent } from 'react';
import type { AxiosError } from 'axios';
import { RequireAuth } from '@/components/RequireAuth';
import { Button, InputGroup, InputLeftElement, Input, useBreakpointValue, Textarea } from "@chakra-ui/react"
import { AiOutlineWarning } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaUser, FaCheck } from 'react-icons/fa';
import { userService } from '@/services/userService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/selectors';
import { setAvatar, setUserData } from '@/redux/features/auth/authSlice';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { UserToUpdate, ApiError } from '@/types';
import Image from 'next/image';

type Photo = {
  file: File;
  url: string;
}

function EditProfilePage() {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const { register, formState, handleSubmit } = useForm({ mode: 'all' });
  const { errors, isValid, isSubmitting, isDirty, isSubmitted } = formState;

  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const changePhotoButtonSize = useBreakpointValue(
    {
      base: 'xs',
      md: 'md',
    },
    {
      fallback: 'md',
    },
  )

  const onChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files as FileList;
    const url = URL.createObjectURL(file);

    setPhoto({ file, url });
  };

  const uploadAvatar = async () => {
    if (!photo) {
      return;
    }

    try {
      const { avatarUrl } = await userService.uploadAvatar(photo.file);

      dispatch(setAvatar(avatarUrl));

      toast.success('Profile avatars have been successfully updated')
    } catch (error) {
      const { response } = error as AxiosError<ApiError>;

      toast.error(!response?.data?.message || 'An error occurred when changing avatar');
    }
  };

  const updateData = async (data: UserToUpdate) => {
    try {
      await userService.updateUserData(data);

      dispatch(setUserData(data))

      toast.success('Profile data has been successfully updated')
    } catch (error) {
      const { response } = error as AxiosError<ApiError>;

      toast.error(!response?.data?.message || 'An error occurred when changing text fields');
    }
  };

  const onSubmit: SubmitHandler<UserToUpdate> = async (data) => {
    await Promise.all([uploadAvatar(), updateData(data)]);
  };

  return (
    <>
      <header className="flex flex-col">
        <h1 className="text-3xl font-bold">Edit profile</h1>

        <p className="mt-4 mb-2">{user?.email}</p>

        <div className="flex gap-2 items-center">
          {user?.activationToken ? (
            <>
              <IoMdCloseCircleOutline color="red" className="w-5 h-5" />
              <p>Activate your email</p>
            </>
          ) : (
            <>
              <FaCheck color="green" className="w-5 h-5" />
              <p>Your email is activated</p>
            </>
          )}
        </div>
      </header>

      <form
        method="post"
        className="flex flex-col gap-8 my-8"
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        <div className="flex gap-8 items-center">
          <div className="w-20 h-20 rounded-full border-white border relative overflow-hidden">
            <Image
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={photo?.url || user?.avatar || '/images/avatar.png'}
              alt="avatar"
              width={500}
              height={500}
            />
          </div>

          <div>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={onChangePhoto}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button
                as="span"
                size={changePhotoButtonSize}
                variant="outline"
                colorScheme="purple"
                leftIcon={<FiEdit />}
              >
                Change photo
              </Button>
            </label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-bold select-none" htmlFor="firstName">First name:</label>

            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaUser />
              </InputLeftElement>

              <Input
                {...register('firstName', {
                  value: user?.firstName || '',
                })}
                type='text'
                id="firstName"
                placeholder='John'
              />
            </InputGroup>
          </div>

          <div clssName="flex flex-col gap-2">
            <label className="font-bold select-none" htmlFor="lastName">Last name:</label>

            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaUser />
              </InputLeftElement>

              <Input
                {...register('lastName', {
                  value: user?.lastName || '',
                })}
                type='text'
                id="lastName"
                placeholder='Smith'
              />
            </InputGroup>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold select-none" htmlFor="username">Username:</label>

          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FaUser />
            </InputLeftElement>

            <Input
              {...register('username', {
                required: 'Username is required',
                value: user?.username || '',
              })}
              type='text'
              id="username"
              placeholder='JohnSmith'
            />
          </InputGroup>

          {errors?.username && (
            <div className="flex gap-2 items-center mt-1">
              <AiOutlineWarning className="text-red-500" />
              <p className="text-xs text-red-500">{errors.username.message as string}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold select-none" htmlFor="biography">Bio:</label>

            <Textarea
              {...register('biography', {
                value: user?.biography || '',
              })}
              id="biography"
              placeholder='Biography...'
            />
        </div>

        <Button
          type="submit"
          colorScheme="green"
          className="bg-green-700 text-white self-start"
          isDisabled={(!isDirty && !photo) || !isValid || isSubmitting}
          isLoading={isSubmitting}
        >
          Save changes
        </Button>
      </form>
    </>
  );
};

export default RequireAuth(EditProfilePage);
