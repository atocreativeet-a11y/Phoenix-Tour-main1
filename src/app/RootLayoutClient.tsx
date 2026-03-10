'use client';

import { SessionProvider } from 'next-auth/react';
import Header from '@/components/sections/Header/Header';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </SessionProvider>
  );
}