import axios from 'axios';

export const createClient = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL as string,
    withCredentials: true,
  });
};
