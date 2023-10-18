const KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string;

const get = () => {
  return localStorage.getItem(KEY)
}

const save = (token: string) => {
  return localStorage.setItem(KEY, token);
}

const remove = () => {
  return localStorage.removeItem(KEY)
}

export const accessTokenService = { get, save, remove };
