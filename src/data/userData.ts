export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  memberLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  joinDate: string
  totalTrips: number
  memberPoints: number
  verified: boolean
  preferences: {
    language: string
    currency: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }
}

export interface UserStats {
  totalTrips: number
  countriesVisited: number
  totalPoints: number
  reviewsWritten: number
  favoriteDestination: string
  totalSaved: number
}

export interface PaymentMethod {
  id: string
  type: 'credit' | 'debit' | 'paypal'
  last4: string
  brand: string
  expiryDate: string
  isDefault: boolean
}

export interface RecentActivity {
  id: string
  type: 'booking' | 'points' | 'review' | 'payment'
  title: string
  description: string
  date: string
  amount?: number
  status: 'completed' | 'pending' | 'cancelled' | 'credited'
}

export const mockUserProfile: UserProfile = {
  id: 'user_001',
  name: 'Cameron Williamson',
  email: 'cameron.williamson@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  memberLevel: 'Gold',
  joinDate: '2022-03-15',
  totalTrips: 24,
  memberPoints: 12840,
  verified: true,
  preferences: {
    language: 'English (US)',
    currency: 'USD',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  }
}

export const mockUserStats: UserStats = {
  totalTrips: 24,
  countriesVisited: 8,
  totalPoints: 12840,
  reviewsWritten: 18,
  favoriteDestination: 'Bali, Indonesia',
  totalSaved: 2450
}

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_001',
    type: 'credit',
    last4: '4242',
    brand: 'Visa',
    expiryDate: '12/25',
    isDefault: true
  },
  {
    id: 'pm_002',
    type: 'credit',
    last4: '0005',
    brand: 'Mastercard',
    expiryDate: '08/26',
    isDefault: false
  }
]

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'activity_001',
    type: 'booking',
    title: 'Flight to Bali',
    description: 'Jakarta (CGK) → Bali (DPS)',
    date: '2024-01-15',
    amount: 450,
    status: 'completed'
  },
  {
    id: 'activity_002',
    type: 'points',
    title: 'Points Earned',
    description: 'Flight booking reward',
    date: '2024-01-15',
    amount: 450,
    status: 'credited'
  },
  {
    id: 'activity_003',
    type: 'booking',
    title: 'Hotel in Yogyakarta',
    description: '3 nights stay',
    date: '2024-01-10',
    amount: 120,
    status: 'completed'
  },
  {
    id: 'activity_004',
    type: 'review',
    title: 'Review Posted',
    description: 'The Langham London',
    date: '2024-01-08',
    status: 'completed'
  }
]

// 会员等级配置
export const memberLevels = {
  Bronze: { min: 0, max: 5000, color: '#cd7f32', benefits: ['Basic support', 'Standard booking'] },
  Silver: { min: 5000, max: 15000, color: '#c0c0c0', benefits: ['Priority support', 'Free cancellation', '5% discount'] },
  Gold: { min: 15000, max: 30000, color: '#ffd700', benefits: ['Premium support', 'Free upgrades', '10% discount', 'Lounge access'] },
  Platinum: { min: 30000, max: 50000, color: '#e5e4e2', benefits: ['VIP support', 'Guaranteed upgrades', '15% discount', 'Concierge service'] }
}
