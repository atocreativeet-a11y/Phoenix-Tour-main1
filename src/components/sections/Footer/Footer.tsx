// src/components/sections/Footer.tsx
import Link from "next/link";
import {
  MapPin,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronRight,
  X
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: Facebook, label: "Facebook", url: "#", color: "hover:text-blue-500" },
    { icon: Instagram, label: "Instagram", url: "#", color: "hover:text-pink-500" },
    { icon: X, label: "X", url: "#", color: "hover:text-gray-300" },
    { icon: FaTiktok, label: "TikTok", url: "#", color: "hover:text-white" },
    { icon: Youtube, label: "YouTube", url: "#", color: "hover:text-red-500" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">

          {/* Brand */}
          <div className="break-words">
            <h3 className="text-xl font-bold mb-2">Phoenix Ethiopia Tour</h3>
            <p className="text-gray-400 text-sm mb-3">Authentic Ethiopian Adventures Since 2021</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              We create transformative travel experiences that connect you
              with Ethiopia's rich heritage, breathtaking landscapes,
              and vibrant cultures.
            </p>
          </div>

          {/* Contact */}
          <div className="break-words">
            <h4 className="text-lg font-semibold mb-5">Contact</h4>
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>Bole Road, Addis Ababa, Ethiopia</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>+251 911 92 04 11 (WhatsApp)</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>contact@phoenixethiopiantours.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="break-words">
            <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["Tours", "Blog", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 text-gray-300 hover:text-primary-500 transition break-words"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="break-words">
            <h4 className="text-lg font-semibold mb-5">Connect With Us</h4>
            <div className="flex gap-4 flex-wrap">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className={`text-gray-400 transition transform hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Follow us for Ethiopia travel inspiration and tour updates.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-col md:flex-row items-center justify-between gap-6 text-gray-400 text-sm">

          <div className="text-center md:text-left break-words">
            © {currentYear} Phoenix Ethiopia Tour. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-5 justify-center md:justify-start break-words">
            <Link href="/privacy-policy" className="hover:text-primary-500">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-500">Terms</Link>
            <Link href="/cookies" className="hover:text-primary-500">Cookies</Link>
            <Link href="/accessibility" className="hover:text-primary-500">Accessibility</Link>
          </div>

          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Globe className="w-4 h-4" />
            <select className="bg-transparent text-sm outline-none">
              <option>English</option>
              <option>Amharic (አማርኛ)</option>
            </select>
          </div>

        </div>
      </div>
    </footer>
  );
}