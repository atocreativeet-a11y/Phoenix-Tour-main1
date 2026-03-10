'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Map, Info, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/', icon: Compass },
  { label: 'Tours', href: '/tours', icon: Map },
  // { label: 'Guides', href: '/guides', icon: Users },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Phone },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavItem = (item: typeof navItems[0], onClick?: () => void) => {
    const Icon = item.icon;
    const isActive =
      pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

    const baseClasses =
      'flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300';
    const activeClasses =
      'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-lg shadow-primary-500/30';
    const inactiveClasses = 'text-gray-700 hover:text-primary-500 hover:bg-primary-50';

    return (
      <Link
        key={item.label}
        href={item.href}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        onClick={onClick}
      >
        <Icon className="w-4 h-4" />
        <span className="font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">{navItems.map((item) => renderNavItem(item))}</nav>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center justify-end">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden flex flex-col gap-2 mt-2 bg-white shadow-lg p-4 rounded-xl">
          {navItems.map((item) => renderNavItem(item, () => setMobileOpen(false)))}
        </nav>
      )}
    </div>
  );
}