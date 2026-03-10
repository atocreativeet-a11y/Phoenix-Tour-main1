import { 
  Mountain, Castle, Sun, Compass, Trees, Church,
  Camera, Utensils, Bed, Map, Flag, Users, Star,
  Filter, MapPin, Calendar, TrendingUp
} from 'lucide-react';

export const iconMap: Record<string, React.ComponentType<any>> = {
  Mountain,
  Castle,
  Sun,
  Compass,
  Trees,
  Church,
  Camera,
  Utensils,
  Bed,
  Map,
  Flag,
  Users,
  Star,
  Filter,
  MapPin,
  Calendar,
  TrendingUp
};

export const getIconComponent = (iconName: string): React.ComponentType<any> => {
  return iconMap[iconName] || Compass; // Default icon
};

export const difficultyColors: Record<string, string> = {
  'Easy': 'bg-green-100 text-green-800',
  'Moderate': 'bg-yellow-100 text-yellow-800',
  'Challenging': 'bg-red-100 text-red-800'
};

export const categories = [
  'Mountain Trekking',
  'Cultural Heritage',
  'Adventure',
  'Wildlife',
  'Historical',
  'Spiritual',
  'Photography',
  'Luxury'
];

export const regions = [
  'Northern Ethiopia',
  'Southern Ethiopia',
  'Eastern Ethiopia',
  'Western Ethiopia',
  'Central Ethiopia',
  'Southeastern Ethiopia'
];

export const difficulties = ['Easy', 'Moderate', 'Challenging'];