'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Map, Info, Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '/', icon: Compass },
  { label: 'Tours', href: '/tours', icon: Map },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Phone },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // CLOSE on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // LOCK SCROLL when open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const renderNavItem = (item: (typeof navItems)[0]) => {
    const Icon = item.icon;

    const isActive =
      item.href === '/'
        ? pathname === '/'
        : pathname?.startsWith(item.href);

    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        aria-current={isActive ? 'page' : undefined}
        className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-md'
            : 'text-gray-700 hover:text-primary-500 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-base font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="relative z-50">
      {/* Desktop Navigation */}
<div className="hidden md:flex w-full justify-center items-center">
  <nav className="flex items-center gap-2 w-fit">
    {navItems.map((item) => renderNavItem(item))}
  </nav>
</div>

      {/* Mobile Button */}
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:scale-95 transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center ${
          mobileOpen ? '' : 'pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Sheet */}
        <nav
          className={`relative w-full max-w-md mx-auto mb-4 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 flex flex-col gap-2
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${mobileOpen
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-16 opacity-0 scale-95'
            }`}
          style={{
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
          }}
        >
          {/* Drag Handle */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />

          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </div>
    </div>
  );
}