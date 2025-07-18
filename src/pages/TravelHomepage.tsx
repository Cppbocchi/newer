import {
  Card,
  Button,
  Typography,
  Space,
  Rate,
  Row,
  Col,
  Image,
  Input,
  DatePicker,
  Select,
  Badge,
  Tag
} from 'antd'
import {
  SearchOutlined,
  EnvironmentOutlined,
  StarOutlined,
  HeartOutlined,
  CalendarOutlined,
  UserOutlined
} from '@ant-design/icons'
import { popularDestinations, type Destination } from '../data/destinations'

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

interface TravelHomepageProps {
  onNavigate: (route: string, params?: Record<string, unknown>) => void
}

function TravelHomepage({ onNavigate }: TravelHomepageProps) {
  const handleDestinationClick = (destination: Destination) => {
    onNavigate(`/destination/${destination.id}`, { destination })
  }

  const handleSearch = () => {
    onNavigate('/search-results')
  }

  const handleBookNow = (destination: Destination) => {
    onNavigate('/booking', { destination })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero Section */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px 20px',
          color: 'white',
          borderRadius: '0 0 24px 24px'
        }}
      >
        <Title level={2} style={{ color: 'white', textAlign: 'center', marginBottom: 8 }}>
          Travellian
        </Title>
        <Text style={{ color: 'rgba(255,255,255,0.9)', display: 'block', textAlign: 'center', marginBottom: 32 }}>
          Discover Your Next Adventure
        </Text>

        {/* Search Form */}
        <Card style={{ borderRadius: 16, marginTop: 20 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong style={{ marginBottom: 8, display: 'block' }}>Destination</Text>
              <Input
                placeholder="Where would you like to go?"
                prefix={<EnvironmentOutlined style={{ color: '#bfbfbf' }} />}
                style={{ borderRadius: 8 }}
              />
            </div>
            
            <Row gutter={16}>
              <Col span={12}>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>Person</Text>
                <Select defaultValue="2" style={{ width: '100%', borderRadius: 8 }}>
                  <Option value="1">1 Person</Option>
                  <Option value="2">2 Persons</Option>
                  <Option value="3">3 Persons</Option>
                  <Option value="4">4+ Persons</Option>
                </Select>
              </Col>
              <Col span={12}>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>Date</Text>
                <RangePicker style={{ width: '100%', borderRadius: 8 }} />
              </Col>
            </Row>

            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              style={{
                width: '100%',
                background: '#FF7757',
                borderColor: '#FF7757',
                borderRadius: 12,
                height: 48
              }}
            >
              Search
            </Button>
          </Space>
        </Card>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Popular Destinations Section */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={4} style={{ margin: 0 }}>Popular Destinations</Title>
            <Button type="link" style={{ color: '#FF7757', padding: 0 }}>
              View All
            </Button>
          </div>
          
          <Row gutter={[16, 16]}>
            {popularDestinations.slice(0, 4).map((destination) => (
              <Col span={12} key={destination.id}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, overflow: 'hidden', border: 'none' }}
                  bodyStyle={{ padding: 0 }}
                  onClick={() => handleDestinationClick(destination)}
                >
                  <div style={{ position: 'relative' }}>
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      style={{ width: '100%', height: 120, objectFit: 'cover' }}
                      preview={false}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <HeartOutlined style={{ color: '#ff4757' }} />
                    </div>
                    {destination.discount && (
                      <Badge.Ribbon text={destination.discount} color="#FF7757">
                        <div />
                      </Badge.Ribbon>
                    )}
                  </div>
                  
                  <div style={{ padding: 12 }}>
                    <Title level={5} style={{ margin: 0, marginBottom: 4 }}>
                      {destination.name}
                    </Title>
                    <Space style={{ marginBottom: 8 }}>
                      <EnvironmentOutlined style={{ color: '#bfbfbf', fontSize: 12 }} />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {destination.country}
                      </Text>
                    </Space>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text style={{ color: '#FF7757', fontWeight: 'bold' }}>
                          {destination.price}
                        </Text>
                        {destination.originalPrice && (
                          <Text delete type="secondary" style={{ marginLeft: 4, fontSize: 12 }}>
                            {destination.originalPrice}
                          </Text>
                        )}
                      </div>
                      <Space>
                        <StarOutlined style={{ color: '#ffa940', fontSize: 12 }} />
                        <Text style={{ fontSize: 12 }}>{destination.rating}</Text>
                      </Space>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Featured Tours Section */}
        <div style={{ marginBottom: 32 }}>
          <Title level={4} style={{ marginBottom: 16 }}>Featured Tours</Title>
          <Row gutter={[16, 16]}>
            {popularDestinations.slice(0, 3).map((destination) => (
              <Col span={24} key={`tour-${destination.id}`}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, border: '1px solid #f0f0f0' }}
                  onClick={() => handleDestinationClick(destination)}
                >
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                      preview={false}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <Tag color="blue" style={{ marginBottom: 4 }}>Guided Tour</Tag>
                          <Title level={5} style={{ margin: 0, marginBottom: 4 }}>
                            {destination.name} City Tour
                          </Title>
                          <Space style={{ marginBottom: 4 }}>
                            <Rate disabled value={destination.rating} style={{ fontSize: 12 }} />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              ({destination.reviewCount} reviews)
                            </Text>
                          </Space>
                          <Space>
                            <CalendarOutlined style={{ fontSize: 12, color: '#bfbfbf' }} />
                            <Text type="secondary" style={{ fontSize: 12 }}>5 Days tour</Text>
                            <UserOutlined style={{ fontSize: 12, color: '#bfbfbf' }} />
                            <Text type="secondary" style={{ fontSize: 12 }}>Max 12 people</Text>
                          </Space>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <Text style={{ color: '#FF7757', fontSize: 16, fontWeight: 'bold' }}>
                            {destination.price}
                          </Text>
                          <Button 
                            type="primary"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleBookNow(destination)
                            }}
                            style={{
                              background: '#FF7757',
                              borderColor: '#FF7757',
                              borderRadius: 6,
                              marginTop: 4,
                              display: 'block'
                            }}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Special Offers */}
        <div style={{ marginBottom: 32 }}>
          <Title level={4} style={{ marginBottom: 16 }}>Special Offers</Title>
          <Card
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #FF7757 0%, #FF6B47 100%)',
              color: 'white',
              border: 'none'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: 'white', margin: 0, marginBottom: 8 }}>
                Book Your Next Trip
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)', display: 'block', marginBottom: 16 }}>
                And get exclusive deals for your next adventure
              </Text>
              <Button
                type="default"
                size="large"
                style={{
                  borderRadius: 12,
                  background: 'white',
                  color: '#FF7757',
                  border: 'none',
                  fontWeight: 'bold'
                }}
              >
                Explore Deals
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TravelHomepage
