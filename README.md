# 🚀 Next.js Boilerplate

A highly customizable Next.js boilerplate built with **i18n-ready**, **CLI-configurable** scaffolding.  
Supports **SSR**, **CSR**, and **RSC** translation flows with hydration-safe architecture.

---

## ✨ Features

✅ Built with **Next.js App Router**  
✅ CLI-based setup (`setupI18n`, optional design system, backend toggle)  
✅ Full **i18n** support:
- Server Side Rendering (SSR)
- React Server Components (RSC)
- Client Side Rendering (CSR)

✅ Mock support (real or mock API switching via `yarn dev` / `yarn dev:mock`)  
✅ ESLint + Prettier with Husky pre-commit checks  
✅ TypeScript with centralized types management  
✅ Hydration-safe `<html lang>` handling  
✅ Modular file architecture  
✅ Git-ready with milestone-based tagging

---

## 📦 Installation

```bash
git clone https://github.com/Venhancer-Technology/vuicore-nextjs
```

---

## 🛠️ CLI Setup

From within the CLI folder (default: `cli/`), run:

```bash
cd cli
yarn dev
```

This will prompt configuration questions like:

- Do you want to enable i18n?
- Do you want to include backend capabilities?
- Do you want to use the design system?

Based on answers, files and folders will be generated automatically.

---

## 🌐 i18n Setup

If i18n is selected via CLI:

- `src/app/layout.tsx` and `src/app/page.tsx` are removed
- `[locale]/layout.tsx` and `[locale]/page.tsx` are added
- `LocaleBootstrap.tsx` is included to sync locale in client
- `document.documentElement.lang` is set safely via React client

Supports both:
- `/public/locales/**` → for CSR via `i18next-http-backend`
- `/src/locales/**` → for SSR / RSC via `i18next-fs-backend`

Middleware is also set to redirect unknown routes to preferred locale based on `Accept-Language`.


## 🌐 Internationalization (i18n) Usage

This boilerplate includes full support for SSR, RSC, and CSR localization using `i18next`, `react-i18next`, and Next.js App Router.

### 📁 Folder Structure

- `public/locales/*/*.json` → used for **CSR**
- `src/locales/*/*.json` → used for **SSR/RSC**

---

### ✅ SSR & RSC Support

Use the `serverInit(locale)` helper in any server or React Server Component to fetch translations during server-side rendering.

```ts
// app/[locale]/page.tsx
import { serverInit } from '@/lib/i18n/serverInit';

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const i18n = await serverInit(locale);
  const t = i18n.getFixedT(locale, 'common');

  return <h1>{t('welcome')}</h1>; // ✅ SSR output
}
```

---

### ✅ CSR Support with Hydration Safety

In client components (`"use client"`), use the `<I18nReady>` wrapper to ensure translations are initialized before rendering:

```tsx
// app/[locale]/Test.tsx
'use client';

import { useTranslation } from 'react-i18next';
import { I18nReady } from '@/components/I18nReady';

const Test = () => {
  const { t } = useTranslation('common');

  return (
    <I18nReady>
      <span>{t('welcome')}</span>
    </I18nReady>
  );
};

export default Test;
```

---

### 🧠 Locale Synchronization

The boilerplate uses a `<LocaleBootstrap />` client component to ensure the HTML `<html lang="...">` attribute is synced with the active locale:

```tsx
// app/[locale]/layout.tsx
import { LocaleBootstrap } from '@/components/LocaleBootstrap';

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = params;

  return (
    <html>
      <body>
        <LocaleBootstrap locale={locale} />
        {children}
      </body>
    </html>
  );
}
```

---

### 🧪 Hydration Safe Strategy

| Case       | Strategy                                 |
|------------|------------------------------------------|
| SSR/RSC    | `serverInit(locale)` + `getFixedT()`     |
| CSR        | `useTranslation()` inside `<I18nReady>`  |
| HTML `<lang>` | `LocaleBootstrap` sets it on mount   |

---

## 🧪 Development Scripts

```bash
yarn dev         # starts Next.js with real backend
yarn dev:mock    # starts with mock API endpoints
yarn lint        # runs ESLint
yarn format      # runs Prettier
yarn test        # (upcoming) runs unit tests
```

---

## 📁 Project Structure (after i18n)

```bash
vuicore-nextjs/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/
│   │   └── LocaleBootstrap.tsx
│   ├── lib/
│   │   └── i18n/
│   │       ├── i18n.ts
│   │       └── serverInit.ts
│   ├── middleware.ts
│   └── locales/
│       ├── en/common.json
│       └── tr/common.json
├── public/
│   └── locales/
│       ├── en/common.json
│       └── tr/common.json
├── cli/
│   └── templates/i18n/
├── next.config.ts
└── README.md
```

---

## 🔧 Development Workflow

1. Create a new branch:  
   `git checkout -b feat/phase-X-feature-name`

2. Make changes using CLI-driven config

3. Commit with scope:  
   `feat(i18n): add locale-aware layout`

4. Merge to `main` only after tests pass

5. Tag new versions:  
   `git tag v0.2.0 -m "Faz 2.5: i18n CLI Integration"`  
   `git push origin v0.2.0`

---

## 📌 Current Version

**v0.2.0 – i18n Integration via CLI (SSR, RSC, CSR ready)**

---

## 🔭 Roadmap

- [ ] ✅ Phase 3: Tailwind / SCSS toggle support via CLI  
- [ ] 🔒 Optional Role-based Auth integration  
- [ ] 🧪 Unit test CLI templates + Husky + pre-push  
- [ ] ⚙️ Fully customizable design system integration  
- [ ] 📦 Publish internal npm CLI tool (`npx create-vuicore-nextjs`)

---

## 🤝 Contributing

If you’d like to contribute to this boilerplate setup (e.g., improve CLI UX, add templates, write docs), feel free to open a PR or issue. We're following milestone-based Git flow.

---

## 📄 License

MIT – you can use this boilerplate freely in internal or commercial projects.
