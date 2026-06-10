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
  
  const [isReady, setIsReady] = useState(false);
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

  // Absolute Overwrite Interceptor Engine
  useEffect(() => {
    const enforceLanguageState = () => {
      const storedTarget = window.localStorage.getItem('user_target_lang') || 'en';
      const match = document.cookie.match(/googtrans=\/(?:en|auto)\/([^;]+)/);
      const currentCookieLang = match ? match[1] : 'en';

      if (storedTarget !== currentCookieLang) {
        const hostname = window.location.hostname;
        if (storedTarget === 'en') {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${hostname}`;
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        } else {
          document.cookie = `googtrans=/auto/${storedTarget}; path=/; domain=${hostname}`;
          document.cookie = `googtrans=/auto/${storedTarget}; path=/;`;
        }
        setCurrentLang(storedTarget);
      } else {
        setCurrentLang(currentCookieLang);
      }

      setIsReady(true);
    };

    enforceLanguageState();
    const interval = setInterval(enforceLanguageState, 150);
    return () => clearInterval(interval);
  }, []);

  const changeGlobalLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangOpen(false);
    
    window.localStorage.setItem('user_target_lang', langCode);

    const hostname = window.location.hostname;
    const dotHostname = hostname.includes('.') ? `.${hostname}` : hostname;

    const cookiePaths = ['/', '', '/en', '/en/'];
    const cookieDomains = [hostname, dotHostname, `www.${hostname}`, ''];

    cookiePaths.forEach(path => {
      cookieDomains.forEach(domain => {
        let cookieStr = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        if (path) cookieStr += ` path=${path};`;
        if (domain) cookieStr += ` domain=${domain};`;
        document.cookie = cookieStr;
      });
    });

    try {
      window.sessionStorage.removeItem('googtrans');
      window.localStorage.removeItem('googtrans');
      Object.keys(sessionStorage).forEach(k => k.includes('googtrans') && sessionStorage.removeItem(k));
    } catch (e) {}

    if (langCode !== 'en') {
      document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${hostname}`;
      document.cookie = `googtrans=/auto/${langCode}; path=/;`;
    } else {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${hostname}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }

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

      <div className="w-full sticky top-0 z-50">
        
        <div className={`transition-opacity duration-150 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          
          <div className="w-full bg-gradient-to-r from-primary-600 to-orange-600 text-white text-sm py-2">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-between items-center">

              {/* Added translate="no" and "notranslate" class here to lock language selection nodes */}
              <div className="relative flex items-center gap-1 notranslate" translate="no" ref={langRef}>
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
                        className="block w-full text-left px-3 py-2 hover:bg-orange-50 text-sm font-medium"
                      >
                        {langMap[lang]}
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

          <header
            className={`w-full bg-white transition-all duration-300 border-b 
            ${isScrolled ? 'border-orange-500 shadow-lg' : 'border-orange-500/30'}`}
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
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 font-medium text-gray-700 hover:text-orange-500 whitespace-nowrap pointer-events-auto"
                      >
                        {item.label}
                        {item.dropdown && <ChevronDown className="w-4 h-4 pointer-events-none" />}
                      </Link>

                      {item.dropdown && (
                        <div 
                          className={`absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-orange-500/20 py-2 z-[1000] min-w-[14rem] transition-all duration-200
                          ${activeDropdown === item.label 
                            ? 'opacity-100 translate-y-0 pointer-events-auto visibility-visible' 
                            : 'opacity-0 -translate-y-2 pointer-events-none visibility-hidden'
                          }`}
                        >
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

                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 hover:bg-orange-50 rounded-lg text-gray-700"
                >
                  <Menu />
                </button>

              </div>
            </div>
          </header>

          <div 
            className={`fixed inset-0 z-[9999] transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)} />

            <div 
              className={`relative h-full w-full max-w-md ml-auto bg-white flex flex-col transition-transform duration-300 ease-in-out shadow-2xl
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
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
        </div>
      </div>

      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        tour={{ name: 'General Inquiry', duration: 'Customizable', difficulty: 'All Levels' }}
      />
    </>
  );
}