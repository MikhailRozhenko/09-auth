import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page');
  const search = searchParams.get('search');
  const tag = searchParams.get('tag');

  const { data } = await api.get('/notes', {
    params: {
      page,
      search,
      tag,
    },
  });

  return NextResponse.json(data);
}
