import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

const MESSAGE_NAMESPACES = [
  'common',
  'admin',
  'application-management',
  'applications',
  'attribute-management',
  'banner-management',
  'competencies',
  'dashboard',
  'employer-contents',
  'employer-workflow',
  'freelancer-workflow',
  'html-editor',
  'invoice',
  'job-posting',
  'jobs',
  'landing',
  'menu',
  'otp',
  'payment',
  'profile-detail',
  'publishment',
  'search',
  'statistics',
  'user',
  'widgets',
  'header',
  'footer',
  'login',
  'register',
  'profile',
];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages: { [key: string]: string } = {};
  for (const namespace of MESSAGE_NAMESPACES) {
    messages[namespace] = (
      await import(`../../public/locales/${locale}/${namespace}.json`)
    ).default;
  }

  return {
    locale,
    messages,
  };
});
