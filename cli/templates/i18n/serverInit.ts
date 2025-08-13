import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

export const supportedLanguages = ['en', 'tr'];
export const defaultNS = 'common';

export async function serverInit(locale: string) {
  if (!i18next.isInitialized) {
    await i18next
      .use(Backend)
      .init({
        lng: locale,
        fallbackLng: 'en',
        ns: [defaultNS],
        defaultNS,
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: path.resolve(process.cwd(), 'src/locales/{{lng}}/{{ns}}.json'),
        },
        initImmediate: false, // important for SSR & RSC compliance
      });
  }

  return i18next;
}
