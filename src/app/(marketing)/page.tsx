// src/app/(marketing)/page.tsx
import Hero from '@/components/sections/Hero/Hero';
import FeaturedTours from '@/components/sections/FeaturedTours';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CallToAction from '@/components/sections/CallToAction';
import FAQSchema from '@/components/seo/FAQSchema';
import SimpleWhatsAppButton from '@/components/ui/SimpleWhatsAppButton';

// Make sure this file exists:
// public/images/logos/logo4.png

export const metadata = {
  title: 'Ethiopia Cultural & Adventure Tours | Phoenix Tours Ethiopia',
  description:
    'Experience authentic Ethiopia with local tour experts. Private cultural tours, adventure expeditions, historical routes, and wildlife safaris across Ethiopia.',
  openGraph: {
    title: 'Ethiopia Cultural & Adventure Tours | Phoenix Tours Ethiopia',
    description: 'Experience authentic Ethiopia with local tour experts.',
    images: [
      {
        url: '/images/logos/logo4.png',
        width: 1200,
        height: 630,
        alt: 'Phoenix Tours Ethiopia - Cultural & Adventure Tours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethiopia Cultural & Adventure Tours | Phoenix Tours Ethiopia',
    description: 'Experience authentic Ethiopia with local tour experts.',
    images: ['/images/logos/logo4.png'],
  },
};

// FAQ data for schema
const faqData = [
  {
    question: 'Is Ethiopia safe for tourists?',
    answer:
      'Yes, Ethiopia is safe when traveling with a licensed local operator like Phoenix Tour. We have 15+ years experience hosting 10,000+ travelers with zero major safety incidents.',
  },
  {
    question: 'Do you arrange visas?',
    answer:
      'We provide comprehensive visa guidance and invitation letter support for all travelers. We assist with Ethiopian eVisa application guidance and step-by-step application support.',
  },
  {
    question: 'Can tours be customized?',
    answer:
      'Absolutely — all our tours are tailor-made to your preferences. We specialize in creating personalized experiences based on your travel dates, interests, and budget.',
  },
];

export default function HomePage() {
  const homepageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.phoenixtourethiopia.et/#webpage',
    url: 'https://www.phoenixtourethiopia.et',
    name: 'Ethiopia Cultural & Adventure Tours | Phoenix Tours Ethiopia',
    description: 'Authentic Ethiopian tours with local experts',
    image: 'https://www.phoenixtourethiopia.et/images/logos/logo4.png',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.phoenixtourethiopia.et',
        },
      ],
    },
    mainEntity: {
      '@type': 'TravelAgency',
      name: 'Phoenix Ethiopia Tours',
      description:
        'Local Ethiopian tour operator specializing in cultural, adventure, and historical tours',
      image: 'https://www.phoenixtourethiopia.et/images/logos/logo4.png',
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />

      <FAQSchema questions={faqData} />

      <main className="min-h-screen">
        {/* Hero */}
        <Hero />

        {/* Featured Tours */}
        <FeaturedTours id="tours" />

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* WhatsApp Floating Button */}
      <SimpleWhatsAppButton />

      {/* Hidden but kept for SEO */}
      <div className="hidden">
        <FAQ />
        <CallToAction />
      </div>
    </>
  );
}