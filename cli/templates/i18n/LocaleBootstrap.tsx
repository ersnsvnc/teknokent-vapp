'use client';

import { useEffect } from 'react';
import i18n from '@/lib/i18n/i18n';

export function LocaleBootstrap({ locale }: { locale: string }) {
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
      localStorage.setItem('i18nextLng', locale);
    }

    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
