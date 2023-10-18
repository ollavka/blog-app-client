'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registration } from '@/redux/features/auth/thunks';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { selectAuth } from '@/redux/features/auth/selectors';
import { UserCredentials, ApiSuccess } from '@/types';
import { useURL } from '@/hooks/useURL';
import { RequireNonAuth } from '@/components/RequireNonAuth';
import { AiOutlineWarning } from 'react-icons/ai';
import { FaUser, FaLock } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Button, InputGroup, InputLeftElement, Input } from "@chakra-ui/react"
import { capitalize } from '@/utils/capitalize';
import Link from 'next/link';

function RegistrationForm() {
  const { error: apiError } = useAppSelector(selectAuth);
  const [pageLoading, setPageLoading] = useState(true);
  const { getPreparedPathname } = useURL();
  const dispatch = useAppDispatch();

  const { register, formState, handleSubmit, reset } = useForm({ mode: 'onBlur' });
  const { errors, isValid, isSubmitting } = formState;

  useEffect(() => {
    setPageLoading(false);
  }, []);

  useEffect(() => {
    if (!apiError || pageLoading) {
      return;
    }

    const apiErrorList = apiError.errors
      ? Object.entries(apiError.errors)
      : null;

    if (!apiErrorList || !apiErrorList.length) {
      toast.error(`Oops: ${apiError.message}`);

      return;
    }

    apiErrorList.forEach(([field, message]) => {
      const errMessage = `${capitalize(field)}: ${message}`;
      toast.error(errMessage);
    });
  }, [apiError]);

  const onSubmit: SubmitHandler<UserCredentials> = async (credentials) => {
    const { payload } = await dispatch(registration(credentials)) as { payload: ApiSuccess };

    if (payload?.success) {
      toast.success('Check your email. We have sent you email with the activation link');
      reset();

      return;
    }

    toast.error('Oops, something went wrong');
  };

  return (
    <div className="bg-neutral-800 text-white absolute top-0 left-0 min-h-screen w-full flex flex-col gap-10 justify-center items-center p-4">
      <h1 className="font-bold text-4xl">Blog Application</h1>

      <form
        method="post"
        className="flex flex-col gap-4 bg-black p-10 rounded-md"
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        <h2 className="font-bold text-3xl mb-4">Sign up</h2>

        <div className="flex flex-col gap-2">
          <label className="font-bold select-none" htmlFor="email">Email:</label>

          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FiMail />
            </InputLeftElement>

            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/,
                  message: 'Email is not valid',
                }
              })}
              type='email'
              id="email"
              placeholder='example@gmail.com'
            />
          </InputGroup>

          {errors?.email && (
            <div className="flex gap-2 items-center mt-1">
              <AiOutlineWarning className="text-red-500" />
              <p className="text-xs text-red-500">{errors.email.message as string}</p>
            </div>
          )}
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
          <label className="font-bold select-none" htmlFor="password">Password:</label>

          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FaLock />
            </InputLeftElement>

            <Input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'At least 6 characters',
                },

              })}
              type='password'
              id="password"
              placeholder='******'
            />
          </InputGroup>

          {errors?.password ? (
            <div className="flex gap-2 items-center mt-1">
              <AiOutlineWarning className="text-red-500" />
              <p className="text-xs text-red-500">{errors.password.message as string}</p>
            </div>
          ) : (
            <p className="text-xs">At least 6 characters</p>
          )}
        </div>

        <Button
          type="submit"
          colorScheme="telegram"
          className="bg-blue-500"
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          Sign up
        </Button>

        <div>
          Already have an account?{' '}

          <Link
            href={getPreparedPathname({ path: '/login' })}
            className="text-blue-500 transition duration-300 ease-in-out"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RequireNonAuth(RegistrationForm);
