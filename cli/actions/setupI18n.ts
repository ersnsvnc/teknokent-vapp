import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

export async function setupI18n() {
  const root = path.resolve(process.cwd(), '../');
  const srcPath = path.join(root, 'src');
  const localesPublic = path.join(root, 'public/locales');
  const localesSrc = path.join(root, 'src/locales');
  const appLocaleLayout = path.join(root, 'src/app/[locale]');
  const appPath = path.join(srcPath, 'app');


  const translations = {
    en: { welcome: 'Welcome', logout: 'Logout' },
    tr: { welcome: 'Hoş geldiniz', logout: 'Çıkış' },
  };

  try {
    // Root app/layout.tsx and app/page.tsx should be deleted
    await fs.remove(path.join(appPath, 'layout.tsx'));
    await fs.remove(path.join(appPath, 'page.tsx'));
    //  public/locales → CSR
    await fs.outputJson(path.join(localesPublic, 'en/common.json'), translations.en, { spaces: 2 });
    await fs.outputJson(path.join(localesPublic, 'tr/common.json'), translations.tr, { spaces: 2 });

    //  src/locales → SSR / RSC
    await fs.outputJson(path.join(localesSrc, 'en/common.json'), translations.en, { spaces: 2 });
    await fs.outputJson(path.join(localesSrc, 'tr/common.json'), translations.tr, { spaces: 2 });

    // templates
    const templatesBase = path.join(__dirname, '../templates/i18n');

    await fs.copy(path.join(templatesBase, 'i18n.ts'), path.join(srcPath, 'lib/i18n/i18n.ts'));
    await fs.copy(path.join(templatesBase, 'serverInit.ts'), path.join(srcPath, 'lib/i18n/serverInit.ts'));
    await fs.copy(path.join(templatesBase, 'middleware.ts'), path.join(srcPath, 'middleware.ts'));
    await fs.copy(path.join(templatesBase, 'next.config.ts'), path.join(root, 'next.config.ts'));
    await fs.copy(path.join(templatesBase, 'layout.tsx'), path.join(appLocaleLayout, 'layout.tsx'));
    await fs.copy(path.join(templatesBase, 'page.tsx'), path.join(appLocaleLayout, 'page.tsx'));
    await fs.copy(path.join(templatesBase, 'LocaleBootstrap.tsx'), path.join(srcPath, 'components/LocaleBootstrap.tsx'));
    await fs.copy(
      path.join(templatesBase, 'I18nReady.tsx'),
      path.join(srcPath, 'components/I18nReady.tsx')
    );

    // packages
    console.log(chalk.blue('Installing i18n packages...'));
    execSync('yarn add i18next react-i18next i18next-browser-languagedetector i18next-http-backend i18next-fs-backend', { cwd: root, stdio: 'inherit' });
    execSync('yarn add -D @types/i18next @types/react-i18next', { cwd: root, stdio: 'inherit' });

    console.log(chalk.green('✅ i18n setup completed.'));
  } catch (err) {
    console.error(chalk.red('❌ Failed to setup i18n:'), err);
  }
}
