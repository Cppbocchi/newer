export interface Destination {
  id: string;
  name: string;
  country: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  gradient: string;
  rating: number;
  reviewCount: number;
  popularityRank: number;
  tags: string[];
}

export const popularDestinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    price: 'From $459',
    originalPrice: '$599',
    discount: '23% off',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    rating: 4.8,
    reviewCount: 2847,
    popularityRank: 1,
    tags: ['Romance', 'Culture', 'Fashion']
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    price: 'From $699',
    originalPrice: '$899',
    discount: '22% off',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    rating: 4.9,
    reviewCount: 3251,
    popularityRank: 2,
    tags: ['Technology', 'Culture', 'Food']
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    price: 'From $389',
    originalPrice: '$499',
    discount: '22% off',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    rating: 4.7,
    reviewCount: 1928,
    popularityRank: 3,
    tags: ['History', 'Royal', 'Theater']
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    price: 'From $899',
    originalPrice: '$1199',
    discount: '25% off',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    rating: 4.6,
    reviewCount: 1642,
    popularityRank: 4,
    tags: ['Beach', 'Opera', 'Harbor']
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    price: 'From $329',
    originalPrice: '$429',
    discount: '23% off',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
    rating: 4.5,
    reviewCount: 2156,
    popularityRank: 5,
    tags: ['Tropical', 'Temples', 'Wellness']
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    price: 'From $549',
    originalPrice: '$749',
    discount: '27% off',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=200&fit=crop&crop=center',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    rating: 4.4,
    reviewCount: 1834,
    popularityRank: 6,
    tags: ['Luxury', 'Shopping', 'Desert']
  }
];

export interface RecentSearch {
  id: string;
  type: 'flight' | 'train' | 'hotel' | 'bus';
  from: string;
  to: string;
  date: string;
  passengers: string;
  price: string;
  duration?: string;
  tripType: 'round-trip' | 'one-way';
}

export const recentSearches: RecentSearch[] = [
  {
    id: '1',
    type: 'flight',
    from: 'NYC',
    to: 'LAX',
    date: 'Dec 25',
    passengers: '1 Adult',
    price: '$299',
    duration: '5h 30m',
    tripType: 'round-trip'
  },
  {
    id: '2',
    type: 'train',
    from: 'Boston',
    to: 'NYC',
    date: 'Dec 20',
    passengers: '2 Adults',
    price: '$89',
    duration: '4h 15m',
    tripType: 'one-way'
  },
  {
    id: '3',
    type: 'flight',
    from: 'SFO',
    to: 'LAS',
    date: 'Dec 18',
    passengers: '1 Adult',
    price: '$159',
    duration: '1h 25m',
    tripType: 'round-trip'
  }
];
