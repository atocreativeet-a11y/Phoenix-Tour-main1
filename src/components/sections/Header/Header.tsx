'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu, X, Phone, ChevronDown, Mountain, Globe, Map, Building, Trees, Flag
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

  const [activeLang, setActiveLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setActiveLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', activeLang);
  }, [activeLang]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    setActiveDropdown(prev => (prev === label ? null : label));
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-orange-600 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative flex items-center gap-1" ref={langRef}>
            <Globe className="w-4 h-4" />

            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 font-medium"
            >
              {activeLang}
              <ChevronDown className="w-3 h-3" />
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-2 w-20 bg-white text-black rounded-md shadow-lg border z-[10001]">
                {['EN', 'FR', 'SP', 'PR', 'GE'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setActiveLang(lang);
                      setIsLangOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+251 911 - 92 04 11</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg border-b' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4" ref={navRef}>
          <div className="flex items-center justify-between h-20">

            {/* LEFT GROUP (FIX) */}
            <div className="flex items-center gap-10">
              <Link href="/"><Logo /></Link>

              <nav className="hidden lg:flex items-center gap-10">
                {navItems.map(item => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link href={item.href} className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary-500">
                      {item.label}
                      {item.dropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>

                    {item.dropdown && activeDropdown === item.label && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 bg-white rounded-xl shadow-2xl border py-2 z-[1000]">
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
            </div>

            {/* MOBILE BUTTON (kept) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0" />

          <div className="relative h-full w-full bg-white flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <Logo />
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {navItems.map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between py-3 text-lg font-semibold">
                    <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      {item.label}
                    </Link>

                    {item.dropdown && (
                      <button onClick={() => handleMobileDropdownToggle(item.label)}>
                        <ChevronDown className={`w-5 h-5 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                    )}
                  </div>

                  {item.dropdown && activeDropdown === item.label && (
                    <div className="ml-4 space-y-2">
                      {item.dropdown.map(sub => (
                        <Link key={sub.label} href={sub.href}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        tour={{ name: 'General Inquiry', duration: 'Customizable', difficulty: 'All Levels' }}
      />
    </>
  );
}