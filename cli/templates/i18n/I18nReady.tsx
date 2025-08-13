'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function I18nReady({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
    } else {
      const onInit = () => {
        setReady(true);
        i18n.off('initialized', onInit);
      };
      i18n.on('initialized', onInit);
    }
  }, [i18n]);

  if (!ready) return null;

  return <>{children}</>;
}
