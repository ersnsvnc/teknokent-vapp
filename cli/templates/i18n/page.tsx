import { serverInit } from '@/lib/i18n/serverInit';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const {locale} = await params;

  const i18n = await serverInit(locale);
  const t = i18n.getFixedT(locale, 'common');

  return (
    <main>
      <h1>{t('welcome')}</h1>
      <p>{t('logout')}</p>
    </main>
  );
}
