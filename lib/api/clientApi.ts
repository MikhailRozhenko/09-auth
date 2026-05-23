import { Note } from '@/types/note';
import { User } from '@/types/user';

import { nextServer } from './api';

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

/* AUTH */

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await nextServer.get('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

/* NOTES */

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<NotesResponse> => {
  const res = await nextServer.get<NotesResponse>('/notes', {
    params: {
      page,
      search,
      tag,
    },
  });

  return res.data;
};

export const createNote = async (newNote: CreateNotePayload) => {
  const res = await nextServer.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};
