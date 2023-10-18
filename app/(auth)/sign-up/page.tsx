import RegistrationForm from '@/components/RegistrationForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up | Blog app',
};

export default function RegistrationPage() {
  return (
    <RegistrationForm />
  );
};
