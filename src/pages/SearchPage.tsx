import { useState, useEffect } from 'react'
import { 
  Card,
  Button,
  Avatar,
  Typography,
  Row,
  Col,
  Space
} from 'antd'
import {
  ArrowLeftOutlined,
  FilterOutlined
} from '@ant-design/icons'
import { 
  Plane, 
  Train, 
  Hotel, 
  Bus
} from 'lucide-react'
import SearchForm from '../components/SearchForm'
import type { Dayjs } from 'dayjs'

const { Title, Text } = Typography

interface SearchPageProps {
  onNavigate: (route: string, params?: Record<string, unknown>) => void
  searchParams?: {
    serviceType?: string
  }
}

function SearchPage({ onNavigate, searchParams }: SearchPageProps) {
  const [selectedService, setSelectedService] = useState<string>(
    searchParams?.serviceType || 'flight'
  )

  useEffect(() => {
    if (searchParams?.serviceType) {
      setSelectedService(searchParams.serviceType)
    }
  }, [searchParams])

  // 处理搜索
  const handleSearch = (searchData: {
    from: string;
    to: string;
    departureDate: Dayjs | null;
    returnDate?: Dayjs | null;
    passengers: number;
    tripType: string;
  }) => {
    console.log('Search data:', searchData);
    // 导航到搜索结果页
    onNavigate('/search-results', { ...searchData, serviceType: selectedService });
  };

  // 获取服务类型图标
  const getServiceIcon = (type: string, size = 24) => {
    const iconProps = { size, style: { color: selectedService === type ? '#fff' : '#666' } }
    switch (type) {
      case 'flight': return <Plane {...iconProps} />
      case 'train': return <Train {...iconProps} />
      case 'hotel': return <Hotel {...iconProps} />
      case 'bus': return <Bus {...iconProps} />
      default: return <Plane {...iconProps} />
    }
  }

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

  const services = [
    { key: 'flight', label: 'Flights', icon: 'flight' },
    { key: 'train', label: 'Trains', icon: 'train' },
    { key: 'hotel', label: 'Hotels', icon: 'hotel' },
    { key: 'bus', label: 'Buses', icon: 'bus' }
  ]

  return (
    <div>
      {/* Header */}
      <Card className="rounded-none shadow-sm">
        <div className="flex items-center justify-between">
          <Space>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => onNavigate('/home')}
            />
            <Title level={4} style={{ margin: 0, color: '#1f2937' }}>Search</Title>
          </Space>
          <Button 
            type="text" 
            icon={<FilterOutlined />} 
            shape="circle"
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </div>
      </Card>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Service Type Selector */}
        <Card className="mb-6" style={{ borderRadius: '16px' }}>
          <Row gutter={[8, 8]}>
            {services.map((service) => (
              <Col span={6} key={service.key}>
                <Button
                  type={selectedService === service.key ? 'primary' : 'default'}
                  style={{
                    width: '100%',
                    height: '80px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selectedService === service.key 
                      ? getServiceColor(service.key) 
                      : '#f8fafc',
                    borderColor: selectedService === service.key 
                      ? getServiceColor(service.key) 
                      : '#e2e8f0'
                  }}
                  onClick={() => setSelectedService(service.key)}
                >
                  <div style={{ marginBottom: '4px' }}>
                    {getServiceIcon(service.icon)}
                  </div>
                  <Text 
                    style={{ 
                      fontSize: '12px', 
                      color: selectedService === service.key ? '#fff' : '#666',
                      fontWeight: 500
                    }}
                  >
                    {service.label}
                  </Text>
                </Button>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />

        {/* Quick Search Suggestions */}
        <Card style={{ borderRadius: '16px' }}>
          <Title level={5} style={{ marginBottom: 16 }}>Popular Routes</Title>
          <Space direction="vertical" size="middle" className="w-full">
            {getPopularRoutes(selectedService).map((route, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  // 自动填充搜索表单
                  const searchData = {
                    from: route.from,
                    to: route.to,
                    departureDate: null,
                    passengers: 1,
                    tripType: 'one-way'
                  };
                  onNavigate('/search-results', { ...searchData, serviceType: selectedService });
                }}
              >
                <Space>
                  <Avatar 
                    size={32}
                    style={{ backgroundColor: getServiceColor(selectedService) }}
                    icon={getServiceIcon(selectedService, 16)}
                  />
                  <div>
                    <Text strong>{route.from} → {route.to}</Text>
                    <br />
                    <Text type="secondary" className="text-sm">{route.description}</Text>
                  </div>
                </Space>
                <Text strong style={{ color: getServiceColor(selectedService) }}>
                  {route.price}
                </Text>
              </div>
            ))}
          </Space>
        </Card>
      </div>
    </div>
  )
}

// 根据服务类型获取热门路线
function getPopularRoutes(serviceType: string) {
  const routes = {
    flight: [
      { from: 'New York', to: 'London', price: 'From $459', description: 'Direct flights available' },
      { from: 'Los Angeles', to: 'Tokyo', price: 'From $689', description: '12h flight time' },
      { from: 'Paris', to: 'Rome', price: 'From $89', description: 'Budget friendly' }
    ],
    train: [
      { from: 'Paris', to: 'London', price: 'From $89', description: 'Eurostar 2h 30m' },
      { from: 'Tokyo', to: 'Osaka', price: 'From $45', description: 'Shinkansen 2h 30m' },
      { from: 'Berlin', to: 'Munich', price: 'From $29', description: 'ICE 4h journey' }
    ],
    hotel: [
      { from: 'Downtown', to: 'Beach Resort', price: 'From $129/night', description: '5-star luxury' },
      { from: 'City Center', to: 'Business Hotel', price: 'From $89/night', description: 'Perfect for business' },
      { from: 'Airport', to: 'Transit Hotel', price: 'From $59/night', description: 'Convenient location' }
    ],
    bus: [
      { from: 'New York', to: 'Washington', price: 'From $25', description: '4h journey' },
      { from: 'Los Angeles', to: 'San Francisco', price: 'From $35', description: '8h scenic route' },
      { from: 'London', to: 'Edinburgh', price: 'From $28', description: 'Overnight service' }
    ]
  }
  
  return routes[serviceType as keyof typeof routes] || routes.flight
}

export default SearchPage
