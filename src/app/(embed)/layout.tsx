import '../globals.css';
import React from 'react';

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
