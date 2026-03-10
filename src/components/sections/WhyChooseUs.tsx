// src/components/sections/WhyChooseUs.tsx
import { Shield, Award, Users, Map, Clock, Heart } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All guides are certified in first aid and emergency procedures',
    color: 'from-primary-500 to-orange-400'
  },
  {
    icon: Award,
    title: 'Expert Guides',
    description: 'Local experts with 5+ years of experience and deep regional knowledge',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Users,
    title: 'Small Groups',
    description: 'Maximum 12 travelers per tour for personalized attention',
    color: 'from-emerald-500 to-green-400'
  },
  {
    icon: Map,
    title: 'Unique Routes',
    description: 'Access to exclusive locations not available to the general public',
    color: 'from-purple-500 to-pink-400'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Multiple daily departures and private tour options available',
    color: 'from-amber-500 to-yellow-400'
  },
  {
    icon: Heart,
    title: 'Sustainable Tourism',
    description: 'Committed to environmental protection and supporting local communities',
    color: 'from-rose-500 to-red-400'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
              <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
            Why Travel with Phoenix Ethiopia Tour?
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-white">The </span>
              <span className="text-primary-500">Adventure</span>
              <span className="text-white"> Difference</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              We don't just show you places - we create experiences that transform how you see the world. 
              Our commitment to excellence ensures every tour is unforgettable.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-500/20 rounded-xl">
                  <Award className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl mb-2">Expert Guides</h4>
                  <p className="text-gray-400">Our experienced local guides are passionate about Ethiopia and eager to
share their knowledge with you.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-500/20 rounded-xl">
                  <Heart className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl mb-2">Authentic Experiences</h4>
                  <p className="text-gray-400">Immerse yourself in local cultures, participate in traditional ceremonies, and
enjoy authentic Ethiopian cuisine.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-500/20 rounded-xl">
                  <Heart className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl mb-2">Safety & Comfort</h4>
                  <p className="text-gray-400">Your safety and comfort are our top priorities. We adhere to the highest
standards of service and care.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-500/20 rounded-xl">
                  <Heart className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl mb-2">Responsible Tourism</h4>
                  <p className="text-gray-400">We promote sustainable travel practices that benefit local communities and
protect Ethiopia’s natural environment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-primary-500 transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-primary-500 mb-2">98%</div>
            <div className="text-gray-300">Customer Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-primary-500 mb-2">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-primary-500 mb-2">5⭐</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
            <div className="text-gray-300">Professional Guides</div>
          </div>
        </div>
      </div>
    </section>
  );
}