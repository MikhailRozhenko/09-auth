// proxy.ts

import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];

const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession();

      const setCookie = data.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };

          if (parsed.accessToken) {
            cookieStore.set('accessToken', parsed.accessToken, options);
          }

          if (parsed.refreshToken) {
            cookieStore.set('refreshToken', parsed.refreshToken, options);
          }
        }

        // якщо користувач авторизований —
        // не пускаємо на public routes
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/profile', request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }

        // дозволяємо private routes
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }

    // якщо користувач НЕ авторизований
    // public routes доступні
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // private routes заборонені
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // якщо accessToken існує —
  // редіректимо з public routes
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // дозволяємо private routes
  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
