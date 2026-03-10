// src/components/admin/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Map, 
  MapPin,
  Settings, 
  LogOut,
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
  Shield,
  PlusCircle,
  List,
  Tag,
  ImageIcon,
  DollarSign,
  Star,
  Globe,
  Compass,
  Mountain,
  Castle,
  Sun,
  Trees,
  Church,
  Camera,
  Utensils,
  Bed,
  Flag,
  Package,
  Layers,
  CalendarDays,
  UserCheck,
  MessageSquare,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Download,
  Upload,
  Building,
  Search,
  BookOpen,
  Navigation,
  ShieldCheck,
  Award,
  Target,
  PieChart,
  FileBarChart,
  Globe2,
  Mail,
  Users2,
  CheckCircle,
  AlertCircle,
  Zap,
  Sparkles,
  Home,
  Coffee,
  Palette
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-green-500'
  },
  
  // Destinations Section
  {
    title: 'Destinations',
    icon: MapPin,
    href: '/dashboard/destinations',
    color: 'text-blue-500',
    children: [
      { title: 'All Destinations', href: '/dashboard/destinations', icon: List },
      { title: 'Create Destination', href: '/dashboard/destinations/create', icon: PlusCircle },
      { title: 'Featured', href: '/dashboard/destinations/featured', icon: Star },
      { title: 'Regions', href: '/dashboard/destinations/regions', icon: Globe },
      { title: 'Quick Facts', href: '/dashboard/destinations/quick-facts', icon: Target },
      { title: 'SEO Settings', href: '/dashboard/destinations/seo', icon: Search }
    ]
  },
  
  // Tours Section
  {
    title: 'Tours',
    icon: Map,
    href: '/dashboard/tours',
    color: 'text-yellow-500',
    children: [
      { title: 'All Tours', href: '/dashboard/tours', icon: List },
      { title: 'Create Tour', href: '/dashboard/tours/create', icon: PlusCircle },
      { title: 'Categories', href: '/dashboard/tours/categories', icon: Tag },
      { title: 'Featured Tours', href: '/dashboard/tours/featured', icon: Award },
      { title: 'Itineraries', href: '/dashboard/tours/itineraries', icon: BookOpen },
      { title: 'Seasonal', href: '/dashboard/tours/seasonal', icon: Sun }
    ]
  },
  
  // Content Management
  {
    title: 'Content',
    icon: FileText,
    href: '/dashboard/content',
    color: 'text-purple-500',
    children: [
      { title: 'Attractions', href: '/dashboard/content/attractions', icon: Castle },
      { title: 'Activities', href: '/dashboard/content/activities', icon: Zap },
      { title: 'Cultural Insights', href: '/dashboard/content/cultural', icon: Church },
      { title: 'Travel Tips', href: '/dashboard/content/tips', icon: ShieldCheck },
      { title: 'Media Library', href: '/dashboard/content/media', icon: ImageIcon },
      { title: 'Blog', href: '/dashboard/content/blog', icon: BookOpen }
    ]
  },
  
  // Bookings & Customers
  {
    title: 'Bookings',
    icon: Calendar,
    href: '/dashboard/bookings',
    color: 'text-pink-500',
    children: [
      { title: 'All Bookings', href: '/dashboard/bookings', icon: List },
      { title: 'Pending', href: '/dashboard/bookings/pending', icon: AlertCircle },
      { title: 'Confirmed', href: '/dashboard/bookings/confirmed', icon: CheckCircle },
      { title: 'Calendar View', href: '/dashboard/bookings/calendar', icon: CalendarDays },
      { title: 'Groups', href: '/dashboard/bookings/groups', icon: Users2 }
    ]
  },
  {
    title: 'Customers',
    icon: Users,
    href: '/dashboard/customers',
    color: 'text-indigo-500',
    children: [
      { title: 'All Customers', href: '/dashboard/customers', icon: List },
      { title: 'VIP Members', href: '/dashboard/customers/vip', icon: Award },
      { title: 'Lead Management', href: '/dashboard/customers/leads', icon: Target },
      { title: 'Reviews & Feedback', href: '/dashboard/customers/reviews', icon: Star }
    ]
  },
  
  // Financial
  {
    title: 'Payments',
    icon: CreditCard,
    href: '/dashboard/payments',
    color: 'text-emerald-500',
    children: [
      { title: 'All Payments', href: '/dashboard/payments', icon: List },
      { title: 'Pending Payments', href: '/dashboard/payments/pending', icon: AlertCircle },
      { title: 'Refunds', href: '/dashboard/payments/refunds', icon: RefreshCw },
      { title: 'Invoice Templates', href: '/dashboard/payments/invoices', icon: FileText }
    ]
  },
  {
    title: 'Pricing',
    icon: DollarSign,
    href: '/dashboard/pricing',
    color: 'text-green-600',
    children: [
      { title: 'Price Management', href: '/dashboard/pricing', icon: DollarSign },
      { title: 'Discounts & Offers', href: '/dashboard/pricing/discounts', icon: Tag },
      { title: 'Seasonal Rates', href: '/dashboard/pricing/seasonal', icon: Sun },
      { title: 'Special Packages', href: '/dashboard/pricing/packages', icon: Package }
    ]
  },
  
  // Operations
  {
    title: 'Guides',
    icon: UserCheck,
    href: '/dashboard/guides',
    color: 'text-orange-500',
    children: [
      { title: 'All Guides', href: '/dashboard/guides', icon: List },
      { title: 'Guide Schedule', href: '/dashboard/guides/schedule', icon: CalendarDays },
      { title: 'Certifications', href: '/dashboard/guides/certifications', icon: Shield },
      { title: 'Performance', href: '/dashboard/guides/performance', icon: BarChart3 }
    ]
  },
  {
    title: 'Availability',
    icon: CalendarDays,
    href: '/dashboard/availability',
    color: 'text-cyan-500',
    children: [
      { title: 'Calendar View', href: '/dashboard/availability/calendar', icon: Calendar },
      { title: 'Date Management', href: '/dashboard/availability/dates', icon: CalendarDays },
      { title: 'Capacity Control', href: '/dashboard/availability/capacity', icon: Users2 },
      { title: 'Blackout Dates', href: '/dashboard/availability/blackout', icon: Shield }
    ]
  },
  
  // Marketing & Analytics
  {
    title: 'Marketing',
    icon: TrendingUp,
    href: '/dashboard/marketing',
    color: 'text-fuchsia-500',
    children: [
      { title: 'Promotions', href: '/dashboard/marketing/promotions', icon: Zap },
      { title: 'Email Campaigns', href: '/dashboard/marketing/email', icon: Mail },
      { title: 'Social Media', href: '/dashboard/marketing/social', icon: Users2 },
      { title: 'SEO Optimization', href: '/dashboard/marketing/seo', icon: Search }
    ]
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
    color: 'text-red-500',
    children: [
      { title: 'Overview', href: '/dashboard/analytics', icon: PieChart },
      { title: 'Tour Performance', href: '/dashboard/analytics/tours', icon: Map },
      { title: 'Destination Insights', href: '/dashboard/analytics/destinations', icon: MapPin },
      { title: 'Customer Analytics', href: '/dashboard/analytics/customers', icon: Users },
      { title: 'Revenue Reports', href: '/dashboard/analytics/revenue', icon: DollarSign },
      { title: 'Export Data', href: '/dashboard/analytics/export', icon: Download }
    ]
  },
  
  // Communications
  {
    title: 'Messages',
    icon: MessageSquare,
    href: '/dashboard/messages',
    color: 'text-blue-400',
    badge: 5
  },
  
  // Settings
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'text-gray-500',
    children: [
      { title: 'General Settings', href: '/dashboard/settings/general', icon: Settings },
      { title: 'User Management', href: '/dashboard/settings/users', icon: Users },
      { title: 'Theme & Branding', href: '/dashboard/settings/theme', icon: Palette },
      { title: 'Email Templates', href: '/dashboard/settings/email', icon: Mail },
      { title: 'API Integration', href: '/dashboard/settings/api', icon: Shield },
      { title: 'Backup & Restore', href: '/dashboard/settings/backup', icon: ShieldCheck }
    ]
  },
  
  // Import/Export
  {
    title: 'Data Management',
    icon: RefreshCw,
    href: '/dashboard/data',
    color: 'text-teal-500',
    children: [
      { title: 'Import Data', href: '/dashboard/data/import', icon: Upload },
      { title: 'Export Data', href: '/dashboard/data/export', icon: Download },
      { title: 'Data Templates', href: '/dashboard/data/templates', icon: FileText },
      { title: 'Bulk Operations', href: '/dashboard/data/bulk', icon: Layers }
    ]
  }
];

const quickActions = [
  {
    title: 'Add Destination',
    icon: MapPin,
    href: '/dashboard/destinations/create',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    description: 'Create new destination'
  },
  {
    title: 'New Tour',
    icon: PlusCircle,
    href: '/dashboard/tours/create',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    description: 'Create tour package'
  },
  {
    title: 'View Bookings',
    icon: Calendar,
    href: '/dashboard/bookings',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    description: 'See recent bookings'
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
    color: 'bg-gradient-to-r from-red-500 to-rose-500',
    description: 'View reports'
  }
];

const regionIcons = {
  'Capital Region': Building,
  'Historical Route': Mountain,
  'Cultural Heartland': Compass,
  'Islamic Heritage': Sun,
  'Wild Frontier': Trees,
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Destinations']);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const toggleExpand = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isParentActive = (item: any) => {
    if (isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child.href));
    }
    return false;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-900/50 z-40 ${
          collapsed ? 'hidden' : 'block'
        }`}
        onClick={() => setCollapsed(true)}
      />

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-50 to-white shadow-2xl border-r border-gray-200 transform transition-all duration-300 ease-in-out flex flex-col
        ${collapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0 lg:static lg:inset-auto
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-lg">
                Ethiopia Tours
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <div className="flex">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mx-0.5"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span>Destination Management</span>
              </div>
            </div>
          </Link>
          <button
            onClick={() => setCollapsed(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50/50 to-green-50/50">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <Zap className="w-3 h-3 text-yellow-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`${action.color} text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center gap-1 relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="text-xs font-medium text-center relative z-10">{action.title}</span>
                  <span className="text-[10px] opacity-80 mt-1 relative z-10">{action.description}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.title);
            const parentActive = isParentActive(item);
            const active = isActive(item.href);

            return (
              <div key={item.href} className="space-y-1">
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={`
                        w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group
                        ${parentActive 
                          ? 'bg-gradient-to-r from-blue-50/80 to-green-50/80 border border-blue-200 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${parentActive ? 'bg-blue-500/10' : 'bg-gray-100 group-hover:bg-blue-50'} transition-colors`}>
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* {item.badge && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {item.badge}
                          </span>
                        )} */}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        } ${parentActive ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                    </button>
                    
                    {/* Children */}
                    {isExpanded && (
                      <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-1">
                        {item.children!.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group/child
                                ${isActive(child.href)
                                  ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }
                              `}
                            >
                              <div className={`p-1.5 rounded-md ${
                                isActive(child.href) 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-gray-200 group-hover/child:bg-blue-100'
                              }`}>
                                <ChildIcon className="w-3 h-3" />
                              </div>
                              <span className="text-sm">{child.title}</span>
                              {isActive(child.href) && (
                                <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                      ${active 
                        ? 'bg-gradient-to-r from-blue-50/80 to-green-50/80 border border-blue-200 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className={`p-2 rounded-lg ${active ? 'bg-blue-500/10' : 'bg-gray-100 group-hover:bg-blue-50'} transition-colors`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="font-medium">{item.title}</span>
                    {active && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile & Bottom Section */}
        <div className="border-t border-gray-200 p-4 bg-white/80 backdrop-blur-sm">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-md">
              <span className="font-bold text-white">A</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="flex gap-1">
              <Link
                href="/dashboard/settings/profile"
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
              </Link>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Help */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/dashboard/help"
              className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Help Center</span>
            </Link>
            <Link
              href="/dashboard/feedback"
              className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Feedback</span>
            </Link>
          </div>

          {/* Version & Status */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600">All systems operational</span>
              </div>
              <span className="text-xs text-gray-500">v2.1.0</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="w-8 h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 rounded-full"></div>
              <span className="text-[10px] text-gray-400">© 2024 Ethiopia Tours</span>
            </div>
          </div>
        </div>

        {/* Collapse button (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border-2 border-white"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setCollapsed(false)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
}