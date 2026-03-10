// src/app/blog/coffee-ceremony/page.tsx - Single Blog Post
'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye, Heart, MapPin, User, Coffee, Share2, Bookmark, Tag, ArrowLeft } from 'lucide-react';
import ApplyTourModal from '@/components/modals/ApplyTourModal';

// Note: Since we're using 'use client', we need to handle metadata differently
// You can either keep this as server component and move the modal to a separate client component
// Or use next/dynamic for the modal. I'll show the client component approach.

export default function CoffeeCeremonyPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tourDetails = {
    id: 'coffee-culture-001',
    name: 'Coffee Ceremony Cultural Immersion Tour',
    price: 89,
    duration: '3-4 hours',
    difficulty: 'Easy',
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/blog" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
            {/* Note: Add unoptimized prop if you haven't configured next.config.js */}
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"
              alt="Ethiopian Coffee Ceremony"
              fill
              className="object-cover"
              priority
              unoptimized // Remove this after configuring next.config.js
            />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute top-8 left-8 z-20">
            <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full">
              <Coffee className="w-4 h-4" />
              <span className="text-sm font-semibold">CULTURAL INSIGHTS</span>
            </div>
          </div>

          {/* Article Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Coffee Ceremony: Ethiopia's Soul in a Cup
              </h1>
              
              {/* Author & Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Selam Mekonnen</div>
                    <div className="text-sm opacity-80">Local Guide & Cultural Expert</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Nov 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Addis Ababa, Ethiopia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Stats Bar */}
              <div className="flex items-center justify-between mb-12 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group">
                    <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:scale-110 transition-all" />
                    <span className="font-semibold">2.5K</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <Eye className="w-5 h-5" />
                    <span className="font-semibold">15.7K</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600">Tags:</span>
                  <div className="flex gap-2">
                    {['Coffee Culture', 'Ethiopian Traditions', 'Cultural Rituals', 'Local Experience'].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Article */}
                <div className="lg:col-span-2">
                  {/* Introduction */}
                  <div className="prose prose-lg max-w-none mb-12">
                    <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                      In Ethiopia, coffee is more than just a beverage—it's a spiritual journey, a social ritual, 
                      and a timeless tradition that connects generations. The coffee ceremony, or <em>Bunna</em>, 
                      is the heartbeat of Ethiopian culture, inviting you to slow down, connect, and savor the moment.
                    </p>
                    
                    <div className="relative my-10 p-6 bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl border-l-4 border-primary-500">
                      <Coffee className="absolute -top-4 -left-4 w-8 h-8 text-primary-500 bg-white p-1 rounded-lg" />
                      <blockquote className="text-lg italic text-gray-800 pl-4">
                        "When coffee is poured from the <em>jebena</em>, it's not just a drink being served—it's 
                        hospitality, respect, and community being shared one cup at a time."
                      </blockquote>
                    </div>
                  </div>

                  {/* Section 1 */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      The Three-Round Ritual: A Journey of Transformation
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          title: 'Abol (First Round)',
                          desc: 'Strongest brew, representing life\'s challenges',
                          color: 'bg-yellow-500'
                        },
                        {
                          title: 'Tona (Second Round)',
                          desc: 'Milder taste, symbolizing reconciliation',
                          color: 'bg-orange-500'
                        },
                        {
                          title: 'Baraka (Third Round)',
                          desc: 'Lightest round, bringing blessings',
                          color: 'bg-amber-800'
                        }
                      ].map((round, index) => (
                        <div key={round.title} className="relative">
                          <div className={`${round.color} h-2 rounded-t-lg`}></div>
                          <div className="p-6 bg-white rounded-b-lg border border-gray-200 shadow-sm">
                            <div className="text-2xl font-bold text-gray-900 mb-2">{round.title}</div>
                            <p className="text-gray-600">{round.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Image Gallery */}
                  <div className="mb-12 grid grid-cols-2 gap-4">
                    <div className="relative h-64 rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=800&q=80"
                        alt="Coffee roasting process"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        unoptimized // Remove this after configuring next.config.js
                      />
                    </div>
                    <div className="relative h-64 rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80"
                        alt="Pouring coffee from jebena"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        unoptimized // Remove this after configuring next.config.js
                      />
                    </div>
                  </div>

                  {/* Section 2 */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">The Art of Preparation</h2>
                    
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Traditional Tools</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { name: 'Jebena', desc: 'Clay coffee pot with spherical base' },
                          { name: 'Mukecha & Zenezena', desc: 'Mortar and pestle for grinding' },
                          { name: 'Sini', desc: 'Small handleless cups' },
                          { name: 'Medeb', desc: 'Incense burner for frankincense' }
                        ].map((tool) => (
                          <div key={tool.name} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Coffee className="w-4 h-4 text-primary-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{tool.name}</div>
                              <div className="text-sm text-gray-600">{tool.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Cultural Significance */}
                  <section className="mb-12 bg-gradient-to-br from-primary-500 to-yellow-500 rounded-2xl p-8 text-white">
                    <h2 className="text-3xl font-heading font-bold mb-6">Cultural Significance</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Social Bonds</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Resolving conflicts and building community
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Celebrating important life events
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Daily social interaction and hospitality
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Spiritual Meaning</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Offering prayers and blessings
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Connecting with ancestors
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Purification and renewal
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Tips for Visitors */}
                  <section className="mb-12">
                    <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Experience It Yourself</h2>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Coffee className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">Visitor Etiquette Tips</h3>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">✓</div>
                              <p className="text-gray-700">Always accept coffee when offered—it's considered rude to refuse</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">✓</div>
                              <p className="text-gray-700">Receive the cup with your right hand, palm facing up</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">✓</div>
                              <p className="text-gray-700">Sip slowly and savor each round—the ceremony can last 1-2 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                  {/* Author Card */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-yellow-500 p-1">
                        <div className="w-full h-full rounded-full bg-white p-1">
                          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-12 h-12 text-gray-600" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Selam Mekonnen</h3>
                      <p className="text-primary-600 font-medium mb-3">Cultural Guide & Coffee Expert</p>
                      <p className="text-gray-600 text-sm mb-4">
                        Born and raised in Addis Ababa, Selam has been sharing Ethiopian coffee traditions 
                        with visitors for over 15 years.
                      </p>
                      <button className="w-full py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                        Follow Author
                      </button>
                    </div>
                  </div>

                  {/* Related Articles */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Related Stories</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Traditional Ethiopian Cuisine Guide', reads: '1.2K' },
                        { title: 'Festivals of Ethiopia: Timket Celebration', reads: '890' },
                        { title: 'Lalibela: The Mystical Rock Churches', reads: '3.4K' },
                        { title: 'Omo Valley: Meeting Ancient Tribes', reads: '2.1K' },
                      ].map((article) => (
                        <a 
                          key={article.title}
                          href="#" 
                          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="font-medium text-gray-900 group-hover:text-primary-500 mb-1">
                            {article.title}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Eye className="w-3 h-3" />
                            {article.reads} reads
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Quick Facts */}
                  <div className="bg-gradient-to-br from-gray-900 to-primary-900 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-4">Coffee Quick Facts</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-300">Origin of Coffee</div>
                        <div className="font-bold">Kaffa, Ethiopia (9th century)</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Ceremony Duration</div>
                        <div className="font-bold">1-3 hours typically</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Coffee Production</div>
                        <div className="font-bold">Africa's largest producer</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Cultural Status</div>
                        <div className="font-bold">UNESCO Intangible Heritage</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <section className="mt-16 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">
                  Join the Conversation
                  <span className="ml-3 text-primary-500">(42 comments)</span>
                </h2>
                
                {/* Comment Form */}
                <div className="mb-8">
                  <textarea 
                    placeholder="Share your thoughts about Ethiopian coffee culture..."
                    className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none resize-none"
                  />
                  <div className="flex justify-end mt-4">
                    <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                      Post Comment
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </article>

        {/* CTA Section - UPDATED: Removed "Explore More Blogs" button */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-yellow-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              Experience Authentic Ethiopian Culture
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our cultural immersion tours and experience the coffee ceremony firsthand with local families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Book Cultural Tour
              </button>
              {/* "Explore More Blogs" button has been removed as requested */}
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <ApplyTourModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tour={tourDetails}
      />
    </>
  );
}