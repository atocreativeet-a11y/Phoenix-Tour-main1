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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const renderNavItem = (item: typeof navItems[0]) => {
    const Icon = item.icon;

    const isActive =
      item.href === '/'
        ? pathname === '/'
        : pathname?.startsWith(item.href);

    return (
      <Link
        key={item.label}
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group ${
          isActive
            ? 'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-lg'
            : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
        }`}
      >
        <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span className="font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="relative">
      {/* Desktop */}
      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Mobile Button */}
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ✅ FIXED MOBILE MENU */}
      <nav
        className={`fixed top-20 left-4 right-4 bg-white shadow-xl p-4 rounded-xl z-50 flex flex-col gap-2 transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {navItems.map((item) => renderNavItem(item))}
      </nav>
    </div>
  );
}