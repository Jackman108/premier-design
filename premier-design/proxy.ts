import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { SITE_PATHNAME_HEADER } from '@shared/lib/seo/site-pathname-header';

/** Next.js 16+: прежний `middleware`; проброс пути для hreflang / канона в `generateMetadata`. */
export function proxy(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set(SITE_PATHNAME_HEADER, request.nextUrl.pathname);
	return NextResponse.next({
		request: { headers: requestHeaders },
	});
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
