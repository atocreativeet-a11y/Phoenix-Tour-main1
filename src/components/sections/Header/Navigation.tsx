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

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close on ESC keypress
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Header Container - Keeps content centered and fixes the scrolling glitch with an elegant orange border */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-orange-500/30 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand/Logo */}
          <Link href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
            Explore
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-orange-600 bg-orange-50/60 font-semibold'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 active:scale-95 transition-all duration-200 z-50 relative"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 transform ${mobileOpen ? 'rotate-90 opacity-0 scale-70' : 'rotate-0 opacity-100 scale-100'}`} />
                <X className={`w-6 h-6 absolute transition-all duration-300 transform ${mobileOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-70'}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Sheet Menu - Extracted outside the header to fix clipping/dropdown bugs */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible pointer-events-none'}`}>
        
        {/* Backdrop Tint */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Bottom Sheet Drawer */}
        <nav
          className={`absolute bottom-0 left-0 right-0 w-full bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(249,115,22,0.15)]
            transition-transform duration-500 ease-[cubic-bezier(0.32,0.94,0.6,1)] transform will-change-transform
            ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}`}
          style={{
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)',
          }}
        >
          {/* 🔴 FIXED FOR RESPONSIVENESS AND TABLETS: Wrapper container inside the drawer sheet */}
          <div className="max-w-md mx-auto w-full">
            {/* Aesthetic Drag Handle Indicator */}
            <div className="w-12 h-1.5 bg-orange-100 rounded-full mx-auto mt-4 mb-6" />

            {/* Nav Items Wrapper */}
            <div className="px-6 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg shadow-orange-500/15'
                        : 'text-gray-700 hover:bg-orange-50/40 active:bg-orange-100/40'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span className="text-base font-semibold tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}