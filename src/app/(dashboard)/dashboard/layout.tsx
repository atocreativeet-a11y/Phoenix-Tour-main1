'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import * as Icons from "lucide-react";

const getIcon = (name: string) => (Icons as any)[name] || (() => null);

const Loader2 = getIcon("Loader2");
const Loader = getIcon("Loader");
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // Check authentication pages
  const isLoginPage = pathname === '/dashboard/login';
  const isSignupPage = pathname === '/dashboard/signup';
  const isAuthPage = isLoginPage || isSignupPage;

  useEffect(() => {
    if (status === 'loading') return;

    // If user is authenticated and on auth pages → go to dashboard
    if (status === 'authenticated' && isAuthPage) {
      router.push('/dashboard');
      return;
    }

    // If user is not authenticated → go to login
    if (status === 'unauthenticated' && !isAuthPage) {
      router.push('/dashboard/login');
      return;
    }

    // Role protection
    if (status === 'authenticated' && session?.user) {
      const isAdmin =
        session.user.role === 'admin' ||
        session.user.role === 'super_admin';

      if (!isAdmin && pathname.startsWith('/dashboard')) {
        router.push('/');
        return;
      }
    }
  }, [session, status, pathname, isAuthPage, router]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 animate-ping opacity-20"></div>
            <Loader2 className="w-8 h-8 animate-spin text-green-500 mx-auto mb-4 absolute inset-0 m-auto" />
          </div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
          <p className="text-gray-400 text-sm mt-2">
            Preparing your workspace
          </p>
        </div>
      </div>
    );
  }

  // Auth pages (login/signup) → no dashboard layout
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50/20 flex">
      {/* Sidebar for mobile */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-w-0">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <Header />
        </div>

        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}