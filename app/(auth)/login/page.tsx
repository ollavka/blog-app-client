import LoginForm from '@/components/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log in | Blog app',
};

export default function LoginPage() {
  return (
    <LoginForm />
  );
};
