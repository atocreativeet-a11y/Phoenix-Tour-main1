'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Menu, X, Phone, ChevronDown, BookOpen, Mountain, Globe, Map, Building, Trees, Flag
} from 'lucide-react';
import ApplyTourModal from '@/components/modals/ApplyTourModal';
import Logo from '@/components/ui/logo';

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; icon?: React.ReactNode }[];
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isApplyModalOpen) setIsMobileMenuOpen(false);
  }, [isApplyModalOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
      label: 'Destinations',
      href: '/destinations',
      dropdown: [
        { label: 'Addis Ababa', href: '/destinations/addis-ababa', icon: <Globe className="w-3 h-3" /> },
        { label: 'Northern Circuit', href: '/destinations/northern-circuit', icon: <Map className="w-3 h-3" /> },
        { label: 'Southern Circuit', href: '/destinations/southern-circuit', icon: <Map className="w-3 h-3" /> },
        { label: 'Eastern (Harar)', href: '/destinations/eastern-harar', icon: <Flag className="w-3 h-3" /> },
        { label: 'Western (Gambella)', href: '/destinations/western-gambella', icon: <Trees className="w-3 h-3" /> }
      ]
    },
    {
      label: 'Tours',
      href: '/tours',
      dropdown: [
        { label: 'Ethiopia Highlights', href: '/tours?category=Ethiopia Highlights', icon: <Globe className="w-3 h-3" /> },
        { label: 'Historical Tours', href: '/tours?category=Historical Tours', icon: <Building className="w-3 h-3" /> },
        { label: 'Cultural Tours', href: '/tours?category=Cultural Tours', icon: <Flag className="w-3 h-3" /> },
        { label: 'Nature & Trekking', href: '/tours?category=Nature & Trekking', icon: <Mountain className="w-3 h-3" /> },
        { label: 'Adventure', href: '/tours?category=Adventure', icon: <Mountain className="w-3 h-3" /> },
        { label: 'Day Trips', href: '/tours?category=Day Trips', icon: <Map className="w-3 h-3" /> }
      ]
    },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' }
  ];

  const handleMobileDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-orange-600 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div />
          <div className="hidden md:flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+251 911 - 92 04 11</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-primary-100' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            <Link href="/"><Logo /></Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map(item => (
                <div key={item.label} className="relative group">
                  <Link href={item.href} className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary-500">
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {item.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 bg-white rounded-xl shadow-2xl border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                      {item.dropdown.map(sub => (
                        <Link key={sub.label} href={sub.href} className="flex items-center gap-2 px-5 py-3 hover:bg-gray-50">
                          {sub.icon}
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden z-[10000]"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </header>

      {/* ✅ MOBILE MENU (FIXED) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/40">
          <div className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 overflow-y-auto">

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-6"
            >
              <X />
            </button>

            {navItems.map(item => (
              <div key={item.label} className="border-b">

                <div
                  className="flex justify-between items-center py-4 font-medium"
                  onClick={() =>
                    item.dropdown
                      ? handleMobileDropdownToggle(item.label)
                      : setIsMobileMenuOpen(false)
                  }
                >
                  <Link href={item.href}>
                    {item.label}
                  </Link>

                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </div>

                {item.dropdown && activeDropdown === item.label && (
                  <div className="pl-4 pb-3 flex flex-col gap-2">
                    {item.dropdown.map(sub => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="flex items-center gap-2 text-sm text-gray-600 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.icon}
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>
      )}

      {/* Modal */}
      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        tour={{ name: 'General Inquiry', duration: 'Customizable', difficulty: 'All Levels' }}
      />
    </>
  );
}