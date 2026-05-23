import axios from 'axios';

const baseURL =
  typeof window === 'undefined'
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : '/api';

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
