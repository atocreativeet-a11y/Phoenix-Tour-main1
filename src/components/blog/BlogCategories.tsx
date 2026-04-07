// src/components/blog/BlogCategories.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as Icons from "lucide-react";

const LayoutDashboard = (Icons as any).LayoutDashboard;
const Calendar = (Icons as any).Calendar;
const Users = (Icons as any).Users;
const Map = (Icons as any).Map;
const MapPin = (Icons as any).MapPin;
const Settings = (Icons as any).Settings;
const LogOut = (Icons as any).LogOut;
const BarChart3 = (Icons as any).BarChart3;
const FileText = (Icons as any).FileText;
const ChevronLeft = (Icons as any).ChevronLeft;
const ChevronRight = (Icons as any).ChevronRight;
const Bell = (Icons as any).Bell;
const HelpCircle = (Icons as any).HelpCircle;
const Shield = (Icons as any).Shield;
const PlusCircle = (Icons as any).PlusCircle;
const List = (Icons as any).List;
const Tag = (Icons as any).Tag;
const ImageIcon = (Icons as any).Image;
const DollarSign = (Icons as any).DollarSign;
const Star = (Icons as any).Star;
const Globe = (Icons as any).Globe;
const Compass = (Icons as any).Compass;
const Mountain = (Icons as any).Mountain;
const Castle = (Icons as any).Castle;
const Sun = (Icons as any).Sun;
const Trees = (Icons as any).Trees;
const Church = (Icons as any).Church;
const Camera = (Icons as any).Camera;
const Utensils = (Icons as any).Utensils;
const Bed = (Icons as any).Bed;
const Flag = (Icons as any).Flag;
const Package = (Icons as any).Package;
const Layers = (Icons as any).Layers;
const CalendarDays = (Icons as any).CalendarDays;
const UserCheck = (Icons as any).UserCheck;
const MessageSquare = (Icons as any).MessageSquare;
const CreditCard = (Icons as any).CreditCard;
const TrendingUp = (Icons as any).TrendingUp;
const RefreshCw = (Icons as any).RefreshCw;
const Download = (Icons as any).Download;
const Upload = (Icons as any).Upload;
const Building = (Icons as any).Building;
const Search = (Icons as any).Search;
const BookOpen = (Icons as any).BookOpen;
const Navigation = (Icons as any).Navigation;
const ShieldCheck = (Icons as any).ShieldCheck;
const Award = (Icons as any).Award;
const Target = (Icons as any).Target;
const PieChart = (Icons as any).PieChart;
const FileBarChart = (Icons as any).FileBarChart;
const Globe2 = (Icons as any).Globe2;
const Mail = (Icons as any).Mail;
const Users2 = (Icons as any).Users2;
const CheckCircle = (Icons as any).CheckCircle;
const AlertCircle = (Icons as any).AlertCircle;
const Zap = (Icons as any).Zap;
const Sparkles = (Icons as any).Sparkles;
const Home = (Icons as any).Home;
const Coffee = (Icons as any).Coffee;
const Palette = (Icons as any).Palette;

const categories = [
  { name: 'Ethiopian Culture', slug: 'ethiopian-culture', icon: <Users />, count: 24, color: 'bg-purple-500' },
  { name: 'Travel Tips', slug: 'travel-tips', icon: <Compass />, count: 18, color: 'bg-blue-500' },
  { name: 'Food & Coffee', slug: 'food-coffee', icon: <Coffee />, count: 15, color: 'bg-amber-600' },
  { name: 'Photography', slug: 'photography', icon: <Camera />, count: 12, color: 'bg-pink-500' },
  { name: 'History & Heritage', slug: 'history-heritage', icon: <BookOpen />, count: 21, color: 'bg-emerald-500' },
  { name: 'Nature & Wildlife', slug: 'nature-wildlife', icon: <Mountain />, count: 14, color: 'bg-green-500' },
  { name: 'Festivals & Events', slug: 'festivals-events', icon: <Calendar />, count: 8, color: 'bg-red-500' },
  { name: 'Local Stories', slug: 'local-stories', icon: <MapPin />, count: 16, color: 'bg-orange-500' },
];

export default function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary-500" />
        Explore Categories
      </h3>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
              activeCategory === category.slug
                ? 'bg-primary-50 border border-primary-100'
                : 'hover:bg-gray-50'
            }`}
            onMouseEnter={() => setActiveCategory(category.slug)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                <div className="text-white">
                  {category.icon}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} articles</div>
              </div>
            </div>
            
            <ChevronRight className={`w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors ${
              activeCategory === category.slug ? 'text-primary-500' : ''
            }`} />
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <Link
          href="/blog/categories"
          className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center gap-1"
        >
          View all categories
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}