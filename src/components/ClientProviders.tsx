"use client";

import { Providers } from "app/providers"; // Adjust path to your original providers file

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}