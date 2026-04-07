// src/components/seo/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import * as Icons from "lucide-react";

const ChevronRight = (Icons as any).ChevronRight;
const Home = (Icons as any).Home;
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://www.phoenixtourethiopia.et${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <nav className="py-4 bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="flex items-center hover:text-primary-600">
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={item.href} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                {index === items.length - 1 ? (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                ) : (
                  <Link 
                    href={item.href}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}