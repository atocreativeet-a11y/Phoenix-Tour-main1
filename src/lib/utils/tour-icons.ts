import * as Icons from "lucide-react";

const Mountain = (Icons as any).Mountain;
const Castle = (Icons as any).Castle;
const Sun = (Icons as any).Sun;
const Compass = (Icons as any).Compass;
const Trees = (Icons as any).Trees;
const Church = (Icons as any).Church;
const Camera = (Icons as any).Camera;
const Utensils = (Icons as any).Utensils;
const Bed = (Icons as any).Bed;
const Map = (Icons as any).Map;
const Flag = (Icons as any).Flag;
const Users = (Icons as any).Users;
const Star = (Icons as any).Star;
const Filter = (Icons as any).Filter;
const MapPin = (Icons as any).MapPin;
const Calendar = (Icons as any).Calendar;
const TrendingUp = (Icons as any).TrendingUp;

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