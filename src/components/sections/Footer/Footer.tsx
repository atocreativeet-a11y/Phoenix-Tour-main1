import Link from "next/link";
import * as Icons from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const MapPin = (Icons as any).MapPin;
const Mail = (Icons as any).Mail;
const Facebook = (Icons as any).Facebook;
const Instagram = (Icons as any).Instagram;
const MessageCircle = (Icons as any).MessageCircle;
const Linkedin = (Icons as any).Linkedin;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/phoenixethiopiatours", color: "hover:text-blue-500" },
    { icon: Facebook, label: "Facebook", url: "https://www.facebook.com/phoenixethiopiatours", color: "hover:text-blue-500" },
    { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/phoenixethiopiatours", color: "hover:text-pink-500" },
    { icon: FaTiktok, label: "TikTok", url: "https://www.tiktok.com/@phoenixethiopiatours", color: "hover:text-teal-400" },
  ];

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* 3 Equal columns on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Column 1: About */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-5">Phoenix Ethiopia Tours</h3>
            <p className="text-gray-400 text-sm mb-3">
              Authentic Ethiopian Adventures Since 2010
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              We create transformative travel experiences that connect you
              with Ethiopia's rich heritage, breathtaking landscapes,
              and vibrant cultures.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-5">Contact</h4>
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>contact@phoenixethiopiantours.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>+251 911 92 04 11 (WhatsApp)</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>Bole Road, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Column 3: Social */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-5">Connect With Us</h4>
            <div className="flex gap-4 flex-wrap mb-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`text-gray-400 transition transform hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Follow us for Ethiopia travel inspiration and tour updates.
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 my-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400 text-sm">
          
          <div className="text-center md:text-left">
            © {currentYear} Phoenix Ethiopia Tours. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-5 justify-center md:justify-start">
            <Link href="/privacy-policy" className="hover:text-primary-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-500">
              Terms & Conditions
            </Link>
            <Link href="/cookies" className="hover:text-primary-500">
              Cookies
            </Link>
            <Link href="/accessibility" className="hover:text-primary-500">
              Accessibility
            </Link>
          </div>

        </div>

        {/* Branding Credit */}
        <div className="text-center text-xs text-gray-500 mt-8">
          Powered by{" "}
          <a 
            href="https://atocreative.et/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary-500 underline decoration-gray-700 transition-colors"
          >
            ato creative solutions
          </a>
        </div>

      </div>
    </footer>
  );
}