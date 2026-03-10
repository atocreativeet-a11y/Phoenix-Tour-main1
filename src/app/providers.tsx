'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      // Remove refetchInterval for now to debug
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}