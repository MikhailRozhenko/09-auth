import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { api } from '../api';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page');
  const search = searchParams.get('search');
  const tag = searchParams.get('tag');

  try {
    const { data } = await api.get('/notes', {
      params: { page, search, tag },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const body = await request.json();

  try {
    const { data } = await api.post('/notes', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 },
    );
  }
}
