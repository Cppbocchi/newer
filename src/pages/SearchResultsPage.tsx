import { useState } from 'react'
import { 
  Card,
  Button,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
  Tag,
  Divider,
  Rate
} from 'antd'
import {
  ArrowLeftOutlined,
  FilterOutlined,
  SwapOutlined,
  WifiOutlined
} from '@ant-design/icons'
import { 
  Plane, 
  Train, 
  Bus
} from 'lucide-react'

const { Title, Text } = Typography

interface SearchResultsPageProps {
  onNavigate: (route: string, params?: Record<string, unknown>) => void
  searchParams?: {
    from?: string
    to?: string
    serviceType?: string
    departureDate?: string
    passengers?: number
    tripType?: string
  }
}

function SearchResultsPage({ onNavigate, searchParams }: SearchResultsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('price')

  const serviceType = searchParams?.serviceType || 'flight'
  const from = searchParams?.from || 'New York'
  const to = searchParams?.to || 'London'

  // 获取服务类型颜色
  const getServiceColor = (type: string) => {
    switch (type) {
      case 'flight': return '#1890ff'
      case 'train': return '#52c41a'
      case 'hotel': return '#722ed1'
      case 'bus': return '#fa8c16'
      default: return '#1890ff'
    }
  }

  // 处理预订
  const handleBooking = (item: Record<string, unknown>) => {
    if (serviceType === 'flight') {
      onNavigate('/flight-booking', { flight: item, searchParams })
    } else if (serviceType === 'train') {
      onNavigate('/train-booking', { train: item, searchParams })
    } else {
      onNavigate('/booking-detail', { item, serviceType, searchParams })
    }
  }

  const results = getSearchResults(serviceType)

  return (
    <div>
      {/* Header */}
      <Card className="rounded-none shadow-sm" bodyStyle={{ padding: '16px' }}>
        <div className="flex items-center justify-between">
          <Space>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => onNavigate('/search')}
            />
            <div>
              <Title level={5} style={{ margin: 0, color: '#1f2937' }}>
                {from} → {to}
              </Title>
              <Text type="secondary" className="text-sm">
                {searchParams?.passengers || 1} passenger{(searchParams?.passengers || 1) > 1 ? 's' : ''}
                {searchParams?.departureDate && ` • ${searchParams.departureDate}`}
              </Text>
            </div>
          </Space>
          <Space>
            <Button 
              type="text" 
              icon={<SwapOutlined />} 
              shape="circle"
              style={{ backgroundColor: '#f5f5f5' }}
            />
            <Button 
              type="text" 
              icon={<FilterOutlined />} 
              shape="circle"
              style={{ backgroundColor: '#f5f5f5' }}
            />
          </Space>
        </div>
      </Card>

      {/* Filter Tabs */}
      <Card className="rounded-none border-b" bodyStyle={{ padding: '12px 16px' }}>
        <Row gutter={8}>
          {getFilterOptions(serviceType).map((filter) => (
            <Col key={filter.key}>
              <Button
                type={selectedFilter === filter.key ? 'primary' : 'default'}
                size="small"
                style={{
                  borderRadius: '20px',
                  backgroundColor: selectedFilter === filter.key 
                    ? getServiceColor(serviceType) 
                    : '#f8fafc'
                }}
                onClick={() => setSelectedFilter(filter.key)}
              >
                {filter.label}
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Results */}
      <div className="px-4 py-4">
        <div className="mb-4 flex items-center justify-between">
          <Text type="secondary">{results.length} results found</Text>
          <Button 
            type="text" 
            size="small"
            onClick={() => setSortBy(sortBy === 'price' ? 'time' : 'price')}
          >
            Sort by {sortBy === 'price' ? 'Price' : 'Time'}
          </Button>
        </div>

        <Space direction="vertical" size="middle" className="w-full">
          {results.map((item, index) => (
            <Card 
              key={index}
              hoverable
              style={{ borderRadius: '16px' }}
              bodyStyle={{ padding: '16px' }}
              onClick={() => handleBooking(item)}
            >
              {serviceType === 'flight' && (
                <FlightResultCard flight={item as flight} />
              )}
              {serviceType === 'train' && (
                <TrainResultCard train={item as train} />
              )}
              {serviceType === 'hotel' && (
                <HotelResultCard hotel={item as hotel} />
              )}
              {serviceType === 'bus' && (
                <BusResultCard bus={item as bus} />
              )}
            </Card>
          ))}
        </Space>
      </div>
    </div>
  )
}

// 航班结果卡片
function FlightResultCard({ flight }: { flight: flight }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Space>
          <Avatar 
            size={40}
            src={flight.airlineLogo}
            style={{ backgroundColor: '#1890ff' }}
          >
            {flight.airline.charAt(0)}
          </Avatar>
          <div>
            <Text strong>{flight.airline}</Text>
            <br />
            <Text type="secondary" className="text-sm">{flight.flightNumber}</Text>
          </div>
        </Space>
        <div className="text-right">
          <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>{flight.price}</Text>
          <br />
          <Text type="secondary" className="text-xs">per person</Text>
        </div>
      </div>

      <Row>
        <Col span={6}>
          <Text strong style={{ fontSize: '20px' }}>{flight.departureTime}</Text>
          <br />
          <Text type="secondary">{flight.departureAirport}</Text>
        </Col>
        <Col span={12} className="text-center">
          <div className="flex items-center justify-center mb-1">
            <div className="flex-1 border-t border-gray-300"></div>
            <Plane size={16} className="mx-2 text-gray-400" />
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <Text type="secondary" className="text-sm">{flight.duration}</Text>
          <br />
          <Text type="secondary" className="text-xs">{flight.stops}</Text>
        </Col>
        <Col span={6} className="text-right">
          <Text strong style={{ fontSize: '20px' }}>{flight.arrivalTime}</Text>
          <br />
          <Text type="secondary">{flight.arrivalAirport}</Text>
        </Col>
      </Row>

      <Divider style={{ margin: '12px 0' }} />

      <div className="flex items-center justify-between">
        <Space size="small">
          {flight.amenities.map((amenity: string, index: number) => (
            <Tag key={index} style={{ fontSize: '10px', padding: '0 6px' }}>
              {amenity}
            </Tag>
          ))}
        </Space>
        <Text type="secondary" className="text-xs">{flight.baggage}</Text>
      </div>
    </div>
  )
}

// 火车结果卡片
function TrainResultCard({ train }: { train: train }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Space>
          <Avatar 
            size={40}
            style={{ backgroundColor: '#52c41a' }}
            icon={<Train size={20} />}
          />
          <div>
            <Text strong>{train.operator}</Text>
            <br />
            <Text type="secondary" className="text-sm">{train.trainNumber}</Text>
          </div>
        </Space>
        <div className="text-right">
          <Text strong style={{ fontSize: '18px', color: '#52c41a' }}>{train.price}</Text>
          <br />
          <Text type="secondary" className="text-xs">per person</Text>
        </div>
      </div>

      <Row>
        <Col span={6}>
          <Text strong style={{ fontSize: '20px' }}>{train.departureTime}</Text>
          <br />
          <Text type="secondary">{train.departureStation}</Text>
        </Col>
        <Col span={12} className="text-center">
          <div className="flex items-center justify-center mb-1">
            <div className="flex-1 border-t border-gray-300"></div>
            <Train size={16} className="mx-2 text-gray-400" />
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <Text type="secondary" className="text-sm">{train.duration}</Text>
          <br />
          <Text type="secondary" className="text-xs">{train.type}</Text>
        </Col>
        <Col span={6} className="text-right">
          <Text strong style={{ fontSize: '20px' }}>{train.arrivalTime}</Text>
          <br />
          <Text type="secondary">{train.arrivalStation}</Text>
        </Col>
      </Row>

      <Divider style={{ margin: '12px 0' }} />

      <div className="flex items-center justify-between">
        <Space size="small">
          <Tag style={{ fontSize: '10px', padding: '0 6px' }}>{train.class}</Tag>
          {train.wifi && <WifiOutlined style={{ color: '#52c41a' }} />}
        </Space>
        <Text type="secondary" className="text-xs">{train.seats} seats available</Text>
      </div>
    </div>
  )
}

// 酒店结果卡片
function HotelResultCard({ hotel }: { hotel: hotel }) {
  return (
    <div>
      <div className="flex items-start justify-between mb-3">
        <Space align="start">
          <div 
            style={{
              width: 60,
              height: 60,
              backgroundImage: `url(${hotel.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px'
            }}
          />
          <div>
            <Text strong style={{ fontSize: '16px' }}>{hotel.name}</Text>
            <br />
            <Rate disabled value={hotel.rating} style={{ fontSize: '12px' }} />
            <Text type="secondary" className="text-sm ml-2">({hotel.reviews} reviews)</Text>
            <br />
            <Text type="secondary" className="text-sm">{hotel.location}</Text>
          </div>
        </Space>
        <div className="text-right">
          <Text strong style={{ fontSize: '18px', color: '#722ed1' }}>{hotel.price}</Text>
          <br />
          <Text type="secondary" className="text-xs">per night</Text>
        </div>
      </div>

      <Divider style={{ margin: '12px 0' }} />

      <div className="flex items-center justify-between">
        <Space size="small">
          {hotel.amenities.slice(0, 3).map((amenity: string, index: number) => (
            <Tag key={index} style={{ fontSize: '10px', padding: '0 6px' }}>
              {amenity}
            </Tag>
          ))}
        </Space>
        <Text type="secondary" className="text-xs">{hotel.availability}</Text>
      </div>
    </div>
  )
}

// 巴士结果卡片
function BusResultCard({ bus }: { bus: bus }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Space>
          <Avatar 
            size={40}
            style={{ backgroundColor: '#fa8c16' }}
            icon={<Bus size={20} />}
          />
          <div>
            <Text strong>{bus.operator}</Text>
            <br />
            <Text type="secondary" className="text-sm">{bus.busNumber}</Text>
          </div>
        </Space>
        <div className="text-right">
          <Text strong style={{ fontSize: '18px', color: '#fa8c16' }}>{bus.price}</Text>
          <br />
          <Text type="secondary" className="text-xs">per person</Text>
        </div>
      </div>

      <Row>
        <Col span={6}>
          <Text strong style={{ fontSize: '20px' }}>{bus.departureTime}</Text>
          <br />
          <Text type="secondary">{bus.departureStation}</Text>
        </Col>
        <Col span={12} className="text-center">
          <div className="flex items-center justify-center mb-1">
            <div className="flex-1 border-t border-gray-300"></div>
            <Bus size={16} className="mx-2 text-gray-400" />
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <Text type="secondary" className="text-sm">{bus.duration}</Text>
          <br />
          <Text type="secondary" className="text-xs">{bus.stops} stops</Text>
        </Col>
        <Col span={6} className="text-right">
          <Text strong style={{ fontSize: '20px' }}>{bus.arrivalTime}</Text>
          <br />
          <Text type="secondary">{bus.arrivalStation}</Text>
        </Col>
      </Row>

      <Divider style={{ margin: '12px 0' }} />

      <div className="flex items-center justify-between">
        <Space size="small">
          {bus.wifi && <WifiOutlined style={{ color: '#fa8c16' }} />}
          {bus.ac && <Tag style={{ fontSize: '10px', padding: '0 6px' }}>AC</Tag>}
        </Space>
        <Text type="secondary" className="text-xs">{bus.seats} seats available</Text>
      </div>
    </div>
  )
}

// 获取筛选选项
function getFilterOptions(serviceType: string) {
  const options = {
    flight: [
      { key: 'all', label: 'All Flights' },
      { key: 'direct', label: 'Direct' },
      { key: 'morning', label: 'Morning' },
      { key: 'evening', label: 'Evening' }
    ],
    train: [
      { key: 'all', label: 'All Trains' },
      { key: 'express', label: 'Express' },
      { key: 'local', label: 'Local' },
      { key: 'sleeper', label: 'Sleeper' }
    ],
    hotel: [
      { key: 'all', label: 'All Hotels' },
      { key: '3star', label: '3 Star' },
      { key: '4star', label: '4 Star' },
      { key: '5star', label: '5 Star' }
    ],
    bus: [
      { key: 'all', label: 'All Buses' },
      { key: 'ac', label: 'AC' },
      { key: 'sleeper', label: 'Sleeper' },
      { key: 'seater', label: 'Seater' }
    ]
  }
  
  return options[serviceType as keyof typeof options] || options.flight
}

type flight ={
  airline: string,
  airlineLogo?: string,
  flightNumber: string,
  departureTime: string,
  arrivalTime: string,
  departureAirport: string,
  arrivalAirport: string,
  duration: string,
  stops: string,
  price: string,
  amenities: string[],
  baggage: string
}

type train = {
    operator: string,
    trainNumber: string,
    departureTime: string,
    arrivalTime: string,
    departureStation: string,
    arrivalStation: string,
    duration: string,
    type: string,
    price: string,
    class: string,
    wifi: boolean,
    seats: number
}

type hotel ={
  name: string,
  image: string,
  rating: number,
  reviews: number,
  location: string,
  price: string,
  amenities: string[],
  availability: string
}

type bus = {
  operator: string,
  busNumber: string,
  departureTime: string,
  arrivalTime: string,
  departureStation: string,
  arrivalStation: string,
  duration: string,
  stops: string,
  price: string,
  wifi: boolean,
  ac: boolean,
  seats: number
}

// 获取搜索结果
function getSearchResults(serviceType: string) {
  const results = {
    flight: [
      {
        airline: 'British Airways',
        flightNumber: 'BA 117',
        departureTime: '08:30',
        arrivalTime: '13:45',
        departureAirport: 'JFK',
        arrivalAirport: 'LHR',
        duration: '7h 15m',
        stops: 'Direct',
        price: '$459',
        amenities: ['WiFi', 'Meal', 'Entertainment'],
        baggage: '1 checked bag included'
      },
      {
        airline: 'Virgin Atlantic',
        flightNumber: 'VS 003',
        departureTime: '14:20',
        arrivalTime: '19:35',
        departureAirport: 'JFK',
        arrivalAirport: 'LHR',
        duration: '7h 15m',
        stops: 'Direct',
        price: '$489',
        amenities: ['WiFi', 'Meal', 'Entertainment'],
        baggage: '1 checked bag included'
      }
    ],
    train: [
      {
        operator: 'Eurostar',
        trainNumber: 'ES 9004',
        departureTime: '09:31',
        arrivalTime: '12:47',
        departureStation: 'Paris Nord',
        arrivalStation: 'London St Pancras',
        duration: '2h 16m',
        type: 'High Speed',
        price: '$89',
        class: 'Standard',
        wifi: true,
        seats: 15
      }
    ],
    hotel: [
      {
        name: 'The Langham London',
        rating: 5,
        reviews: 1254,
        location: 'Central London',
        price: '$245',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop',
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
        availability: '3 rooms left'
      }
    ],
    bus: [
      {
        operator: 'Greyhound',
        busNumber: 'GH 101',
        departureTime: '08:00',
        arrivalTime: '12:30',
        departureStation: 'Port Authority',
        arrivalStation: 'Union Station',
        duration: '4h 30m',
        stops: '2',
        price: '$25',
        wifi: true,
        ac: true,
        seats: 8
      }
    ]
  }
  
  return results[serviceType as keyof typeof results] || results.flight
}

export default SearchResultsPage
