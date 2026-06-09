import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-800 antialiased selection:bg-amber-500/10">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        
        {/* Return Home Link */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors duration-200 font-poppins"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">
              &larr;
            </span>
            Return Home
          </Link>
        </div>

        {/* Header */}
        <header className="border-b border-slate-200 pb-8 mb-12">
          <p className="text-sm font-semibold tracking-wider text-amber-600 uppercase mb-2 font-poppins">
            Phoenix Ethiopia Tours &bull; Legal Docs
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 md:text-5xl font-poppins">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm">Last updated: June 8, 2026</p>
        </header>

        {/* Content */}
        <div className="space-y-10 leading-relaxed text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-poppins">1. Information We Collect</h2>
            <p className="mb-4">
              At Phoenix Ethiopia Tours, accessible from https://www.phoenixtourethiopia.et, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by our platform and how we use it.
            </p>
            <p>
              If you contact us directly to book a tour (such as a Lalibela, Omo Valley, or Danakil Depression package), we may receive additional information about you such as your name, email address, phone number, and the contents of your message.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-poppins">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Provide, operate, and maintain our travel agency platform</li>
              <li>Improve, personalize, and expand tour packages and itineraries</li>
              <li>Understand and analyze how you interact with our website functions</li>
              <li>Communicate with you for customer service, updates, and booking configurations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-poppins">3. Contact Corporate Support</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our compliance team directly at:
            </p>
            <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200 inline-block font-mono text-sm">
              Email: info@phoenixtourethiopia.et
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}