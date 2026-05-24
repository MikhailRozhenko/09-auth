import { Note } from '@/types/note';
import { cookies } from 'next/headers';

import { User } from '@/types/user';

import { nextServer } from './api';

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<NotesResponse> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<NotesResponse>('/notes', {
    params: {
      page,
      search,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};
