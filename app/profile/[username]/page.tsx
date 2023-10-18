import ProfilePage from '@/components/ProfilePage';
import { Metadata } from 'next';

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params;

  return {
    title: `Profile page of ${username} | Blog app`,
  };
}

export default async function UserProfile({ params }: Props) {
  const { username } = params;

  return (
    <ProfilePage username={username} />
  );
}
