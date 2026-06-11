'use client';

import { SessionProvider } from 'next-auth/react'; // 1. Import this
import { I18nProvider } from "./providers/I18nProvider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <I18nProvider>
        {children}
      </I18nProvider>
    </SessionProvider>
  );
}