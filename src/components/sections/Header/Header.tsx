'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Menu, X, Phone, ChevronDown, Search, BookOpen, Mountain, Globe, Map, Building, Trees, Flag
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

  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isApplyModalOpen) setIsMobileMenuOpen(false);
  }, [isApplyModalOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickedOutside =
        Object.values(dropdownRefs.current).every(
          ref => !ref || !ref.contains(e.target as Node)
        ) &&
        Object.values(navItemRefs.current).every(
          ref => !ref || !ref.contains(e.target as Node)
        );

      if (clickedOutside) setActiveDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ FIXED CLEANUP (NO NULL RETURN)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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

  const openDropdown = useCallback((label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
  }, []);

  const closeDropdown = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const handleDropdownRef = useCallback(
    (label: string) => (el: HTMLDivElement | null) => {
      dropdownRefs.current[label] = el;
    },
    []
  );

  const handleNavItemRef = useCallback(
    (label: string) => (el: HTMLDivElement | null) => {
      navItemRefs.current[label] = el;
    },
    []
  );

  const handleMobileDropdownToggle = useCallback(
    (label: string) => {
      if (window.innerWidth < 1024) {
        setActiveDropdown(activeDropdown === label ? null : label);
      }
    },
    [activeDropdown]
  );

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-orange-600 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div />
          <div className="flex items-center gap-4">
            <select className="bg-transparent outline-none text-white">
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="am">አማርኛ</option>
            </select>

            <div className="hidden md:flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+251 911 - 92 04 11</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-primary-100' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map(item => (
                <div
                  key={item.label}
                  className="relative"
                  ref={handleNavItemRef(item.label)}
                  onMouseEnter={() => openDropdown(item.label)}
                  onMouseLeave={closeDropdown}
                >
                  <Link href={item.href} className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary-500">
                    {item.label === 'Blog' && <BookOpen className="w-4 h-4 mr-1" />}
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {item.dropdown && activeDropdown === item.label && (
                    <div
                      ref={handleDropdownRef(item.label)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 bg-white rounded-xl shadow-2xl border py-2"
                    >
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
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </header>

      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        tour={{ name: 'General Inquiry', duration: 'Customizable', difficulty: 'All Levels' }}
      />
    </>
  );
}