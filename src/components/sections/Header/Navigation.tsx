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

  // Close menu on route change
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
      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => renderNavItem(item))}
      </nav>

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

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          mobileOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 left-0 right-0 mt-16 mx-4 bg-white shadow-2xl p-4 rounded-2xl z-[9999] flex flex-col gap-2 transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {navItems.map((item) => renderNavItem(item))}
      </nav>
    </div>
  );
}