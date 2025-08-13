import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'tr'];
const PUBLIC_FILE = /\.(.*)$/;

function normalizeLocaleFromHeader(req: NextRequest): string {
  const acceptLang = req.headers.get('accept-language');
  const rawLang = acceptLang?.split(',')[0].toLowerCase() || 'en';
  const langCode = rawLang.split('-')[0];
  return SUPPORTED_LOCALES.includes(langCode) ? langCode : 'en';
}

function hasValidLocale(pathname: string): boolean {
  const firstSegment = pathname.replace(/^\/+/, '').split('/')[0];
  return SUPPORTED_LOCALES.includes(firstSegment);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/locales') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (hasValidLocale(pathname)) {
    return NextResponse.next();
  }

  const preferredLocale = normalizeLocaleFromHeader(req);
  return NextResponse.redirect(new URL(`/${preferredLocale}${pathname}`, req.url));
}
