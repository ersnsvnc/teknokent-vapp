import './globals.css';
import 'antd/dist/reset.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Portal',
  description: 'Ödeme ve Duyuru modülleri',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
