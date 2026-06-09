import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-800 antialiased">
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

        <header className="border-b border-slate-200 pb-8 mb-12">
          <p className="text-sm font-semibold tracking-wider text-amber-600 uppercase mb-2 font-poppins">
            Phoenix Ethiopia Tours &bull; Tracking
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 md:text-5xl font-poppins">
            Cookie Policy
          </h1>
          <p className="text-slate-500 text-sm">Last updated: June 8, 2026</p>
        </header>

        <div className="space-y-10 leading-relaxed text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-poppins">How We Use Cookies</h2>
            <p>
              We employ cookie frameworks to assess performance parameters via global tracking tools (like Google Analytics configured inside our application stack). This analytics deployment records anonymized layout interactions to help us refine our custom tour offering strategies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}