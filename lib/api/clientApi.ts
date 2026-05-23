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

export const checkSession = async () => {
  const res = await nextServer.get('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
};

export const logout = async () => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<NotesResponse> => {
  const response = await nextServer.get<NotesResponse>('/notes', {
    params: { page, search, tag },
  });

  return response.data;
};

export const createNote = async (newTask: CreateNotePayload) => {
  const response = await nextServer.post<Note>('/notes', newTask);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};
