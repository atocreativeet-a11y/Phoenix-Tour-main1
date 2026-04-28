import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Providers } from "./providers";
import "./globals.css";
import "@/lib/i18n";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Phoenix Ethiopia Tours | Best Local Tour Operator in Ethiopia',
    template: '%s | Phoenix Ethiopia Tours'
  },
  description: 'Authentic Ethiopian tours with local experts. Cultural, historical, adventure & wildlife tours in Ethiopia. Lalibela, Omo Valley, Simien Mountains & more.',
  keywords: [
    'Ethiopia tour operator',
    'Ethiopia travel agency',
    'Ethiopia cultural tours',
    'Ethiopia private tours',
    'Ethiopia adventure tours',
    'Ethiopia safari',
    'Lalibela tours',
    'Omo Valley tours',
    'Simien Mountains trekking',
    'Danakil Depression tours',
    'Ethiopian cultural experiences',
    'Best Ethiopia tours',
    'Local Ethiopia tour guide',
    'Ethiopia UNESCO sites tours',
    'Ethiopia photography tours'
  ],
  authors: [{ name: 'Phoenix Ethiopia Tours' }],
  creator: 'Phoenix Ethiopia Tours',
  publisher: 'Phoenix Ethiopia Tours',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.phoenixethiopiatours.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.phoenixtourethiopia.et',
    title: 'Phoenix Ethiopia Tours | Best Local Tour Operator in Ethiopia',
    description: 'Authentic Ethiopian tours with local experts. Cultural, historical, adventure & wildlife tours in Ethiopia.',
    siteName: 'Phoenix Ethiopia Tours',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Phoenix Ethiopia Tours - Authentic Ethiopian Experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phoenix Ethiopia Tours | Best Local Tour Operator in Ethiopia',
    description: 'Authentic Ethiopian tours with local experts. Cultural, historical, adventure & wildlife tours in Ethiopia.',
    images: ['/twitter-image.jpg'],
    creator: '@PhoenixEthTours',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'travel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Schema.org JSON-LD for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              '@id': 'https://www.phoenixtourethiopia.et/#organization',
              name: 'Phoenix Ethiopia Tours',
              url: 'https://www.phoenixtourethiopia.et',
              logo: 'https://www.phoenixtourethiopia.et/logo.png',
              description: 'Authentic Ethiopian tours with local experts. Cultural, historical, adventure & wildlife tours in Ethiopia.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bole Road',
                addressLocality: 'Addis Ababa',
                addressRegion: 'Addis Ababa',
                postalCode: '1000',
                addressCountry: 'ET',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '9.0320',
                longitude: '38.7465',
              },
              telephone: '+251-11-123-4567',
              email: 'info@phoenixtourethiopia.et',
              openingHours: 'Mo-Su 08:00-20:00',
              priceRange: '$$$',
              sameAs: [
                'https://www.facebook.com/PhoenixEthiopiaTours',
                'https://www.instagram.com/phoenixethiopiatours',
                'https://twitter.com/PhoenixEthTours',
              ],
              areaServed: {
                '@type': 'Country',
                name: 'Ethiopia',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Ethiopia Tour Packages',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Cultural Tours',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Adventure Tours',
                    },
                  },
                ],
              },
            }),
          }}
        />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Canonical tag */}
        <link rel="canonical" href="https://www.phoenixtourethiopia.et" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased`}>
     <Providers>
          {children}
        </Providers>
        
        {/* Google Analytics Script */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  );
}