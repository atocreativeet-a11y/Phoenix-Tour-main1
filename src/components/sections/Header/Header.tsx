'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as Icons from "lucide-react";

const Menu = (Icons as any).Menu;
const X = (Icons as any).X;
const Phone = (Icons as any).Phone;
const ChevronDown = (Icons as any).ChevronDown;
const Globe = (Icons as any).Globe;
const Map = (Icons as any).Map;
const Building = (Icons as any).Building;
const Trees = (Icons as any).Trees;
const Flag = (Icons as any).Flag;
const Mountain = (Icons as any).Mountain;

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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  
  // Collapsible state for mobile dropdown menus
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  const langMap: Record<string, string> = {
    en: "EN",
    fr: "FR",
    es: "SP",
    pt: "PR",
    de: "GE",
  };

  useEffect(() => {
    const getLanguageFromCookie = () => {
      const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
      if (match && match[1]) {
        setCurrentLang(match[1]);
      }
    };
    getLanguageFromCookie();
  }, []);

  const changeGlobalLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangOpen(false);

    const hostname = window.location.hostname;
    const dotHostname = hostname.includes('.') ? `.${hostname}` : hostname;

    // Clear out old variations of the cookie that Google Translate might have cached
    const cookiePaths = ['/', ''];
    const cookieDomains = [hostname, dotHostname, ''];

    cookiePaths.forEach(path => {
      cookieDomains.forEach(domain => {
        let cookieStr = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        if (path) cookieStr += ` path=${path};`;
        if (domain) cookieStr += ` domain=${domain};`;
        document.cookie = cookieStr;
      });
    });

    // Set the new language cookie parameters explicitly
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    
    // Explicit clean wipe if switching back to the default language (English)
    if (langCode === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }

    // Reload the page to force the Google Translate script to grab the new cookie state
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

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

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="w-full bg-gradient-to-r from-primary-600 to-orange-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-between items-center">

          <div className="relative flex items-center gap-1" ref={langRef}>
            <Globe className="w-4 h-4" />

            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 font-medium uppercase"
            >
              {langMap[currentLang] || "EN"}
              <ChevronDown className="w-3 h-3" />
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-2 w-20 bg-white text-black rounded-md shadow-lg border border-orange-500/20 z-[10001]">
                {['en', 'fr', 'es', 'pt', 'de'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => changeGlobalLanguage(lang)}
                    className="block w-full text-left px-3 py-2 hover:bg-orange-50 text-sm"
                  >
                    {langMap[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+251 911 - 92 04 11</span>
          </div>

        </div>
      </div>

      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 border-b 
        ${isScrolled 
          ? 'bg-white border-orange-500 shadow-lg'
          : 'bg-white/80 backdrop-blur-md lg:bg-transparent border-orange-500/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" ref={navRef}>
          <div className="flex items-center justify-between h-20 relative">

            <Link href="/"><Logo /></Link>

            <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 h-full">
              {navItems.map(item => (
                <div
                  key={item.label}
                  className="relative flex items-center h-full z-10"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Clean standard link that forwards immediately on desktop click */}
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 font-medium text-gray-700 hover:text-orange-500 whitespace-nowrap pointer-events-auto"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-4 h-4 pointer-events-none" />}
                  </Link>

                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-orange-500/20 py-2 z-[1000] min-w-[14rem]">
                      {item.dropdown.map(sub => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-center gap-2 px-5 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 whitespace-nowrap"
                        >
                          {sub.icon}
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Hamburger Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-orange-50 rounded-lg text-gray-700"
            >
              <Menu />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu with Accordion Collapsible Dropdowns */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative h-full w-full bg-white flex flex-col">

            <div className="flex items-center justify-between px-6 py-5 border-b border-orange-500/30">
              <Logo />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-orange-50 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {navItems.map(item => {
                const hasDropdown = !!item.dropdown;
                const isAccordionOpen = mobileAccordion === item.label;

                return (
                  <div key={item.label} className="border-b border-orange-100/40 last:border-none pb-2">
                    {hasDropdown ? (
                      <div>
                        {/* Split Row Layout: Text links to directory page, Chevron toggles visibility */}
                        <div className="w-full flex items-center justify-between py-3 text-lg font-semibold text-gray-800">
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex-1 hover:text-orange-500 whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={() => setMobileAccordion(isAccordionOpen ? null : item.label)}
                            className="p-2 -mr-2 hover:bg-orange-50 rounded-lg transition-colors"
                            aria-label={`Toggle ${item.label} dropdown`}
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isAccordionOpen ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
                          </button>
                        </div>
                        
                        {/* Collapsible Submenu Container */}
                        <div className={`grid transition-all duration-300 ease-in-out pl-4 overflow-hidden ${
                          isAccordionOpen ? 'grid-rows-[1fr] opacity-100 my-1' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                        }`}>
                          <div className="overflow-hidden space-y-2">
                            {item.dropdown?.map(sub => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 py-2.5 px-3 text-base text-gray-600 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all whitespace-nowrap"
                              >
                                {sub.icon}
                                <span>{sub.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between py-3 text-lg font-semibold">
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex-1 text-gray-800 hover:text-orange-500 whitespace-nowrap"
                        >
                          {item.label}
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
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