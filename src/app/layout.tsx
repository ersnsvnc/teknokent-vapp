import type { Metadata } from 'next';
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portal',
  description: 'Ödeme ve Duyuru modülleri',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="tr">
    <body className="h-screen bg-slate-50">
      <AppLayout>{children}</AppLayout>
    </body>
  </html>
);

export default RootLayout;
