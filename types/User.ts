export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  biography: string | null;
  activationToken: string | null;
}
