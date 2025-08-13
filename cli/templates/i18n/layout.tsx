import type { ReactNode } from 'react';
import { LocaleBootstrap } from '@/components/LocaleBootstrap';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const {locale} = await params;

  return (
    <html>
      <body>
        <LocaleBootstrap locale={locale} />
        {children}
      </body>
    </html>
  );
}
