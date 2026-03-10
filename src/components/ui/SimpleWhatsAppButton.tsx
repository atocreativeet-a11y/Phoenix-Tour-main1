'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function SimpleWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hovered, setHovered] = useState(false);

  const whatsappNumber = '251911920411';
  const message = encodeURIComponent(
    'Hello! I saw your website and have questions about Ethiopian tours.'
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'bottom-6 opacity-100' : 'bottom-0 opacity-0'
        } right-6`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative">

          {/* Pulse effect behind WhatsApp button */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>

          {/* WhatsApp Button */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110">

            <FaWhatsapp className="w-8 h-8 text-white" />

            {/* Red Notification Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-md animate-badgePulse">
              <span className="text-white text-xs font-bold">2</span>
            </div>

          </div>

          {/* Tooltip */}
          <div
            className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 ${
              hovered ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-200 pointer-events-none`}
          >
            <div className="bg-gray-900 text-white text-sm font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Chat on WhatsApp
            </div>
          </div>
        </div>
      </a>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-badgePulse {
          animation: badgePulse 1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}