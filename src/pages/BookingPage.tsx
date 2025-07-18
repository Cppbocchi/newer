import {
  Card,
  Button,
  Typography,
  Space,
  Rate,
  Input,
  DatePicker,
  Select,
  Form,
  Divider,
  Image,
  Steps,
  Radio,
  Row,
  Col
} from 'antd'
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import type { Destination } from '../data/destinations'

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { Option } = Select
const { Step } = Steps

interface BookingPageProps {
  onNavigate: (route: string, params?: Record<string, unknown>) => void
}

function BookingPage({ onNavigate }: BookingPageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()

  // Mock destination data (in real app, this would come from route params or state)
  const destination: Destination = {
    id: '1',
    name: 'Monument of Berlin',
    country: 'Berlin, Germany',
    price: 'From €99',
    image: 'https://images.unsplash.com/photo-1587330979470-3016b6702d89?w=800&q=80',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    rating: 4.8,
    reviewCount: 245,
    popularityRank: 1,
    tags: ['Historical', 'Culture', 'Architecture']
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onNavigate('/home')
    }
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const steps = [
    {
      title: 'Trip Details',
      icon: <CalendarOutlined />
    },
    {
      title: 'Payment',
      icon: <CreditCardOutlined />
    },
    {
      title: 'Confirmation',
      icon: <CheckCircleOutlined />
    }
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form form={form} layout="vertical">
            <Card title="Trip Information" style={{ marginBottom: 20, borderRadius: 16 }}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Number of Travelers" name="travelers" rules={[{ required: true }]}>
                    <Select defaultValue="2" size="large">
                      <Option value="1">1 Person</Option>
                      <Option value="2">2 Persons</Option>
                      <Option value="3">3 Persons</Option>
                      <Option value="4">4 Persons</Option>
                      <Option value="5+">5+ Persons</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Travel Dates" name="dates" rules={[{ required: true }]}>
                    <RangePicker size="large" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Special Requests" name="requests">
                    <Input.TextArea
                      placeholder="Any special requirements or requests..."
                      rows={4}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Contact Information" style={{ marginBottom: 20, borderRadius: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Form>
        )

      case 1:
        return (
          <div>
            <Card title="Booking Summary" style={{ marginBottom: 20, borderRadius: 16 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <Image
                  src={destination.image}
                  alt={destination.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                  preview={false}
                />
                <div style={{ flex: 1 }}>
                  <Title level={5} style={{ margin: 0 }}>{destination.name}</Title>
                  <Space style={{ marginTop: 4 }}>
                    <EnvironmentOutlined style={{ fontSize: 12, color: '#bfbfbf' }} />
                    <Text type="secondary">{destination.country}</Text>
                  </Space>
                  <div style={{ marginTop: 8 }}>
                    <Rate disabled value={destination.rating} style={{ fontSize: 12 }} />
                    <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                      ({destination.reviewCount} reviews)
                    </Text>
                  </div>
                </div>
              </div>
              
              <Divider />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>2 Travelers × 5 Days</Text>
                <Text>€495.00</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>Service Fee</Text>
                <Text>€25.00</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>Taxes</Text>
                <Text>€52.00</Text>
              </div>
              
              <Divider />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong style={{ fontSize: 16 }}>Total</Text>
                <Text strong style={{ fontSize: 16, color: '#FF7757' }}>€572.00</Text>
              </div>
            </Card>

            <Card title="Payment Method" style={{ marginBottom: 20, borderRadius: 16 }}>
              <Form.Item name="paymentMethod">
                <Radio.Group style={{ width: '100%' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Radio value="card" style={{ width: '100%', padding: '12px', border: '1px solid #f0f0f0', borderRadius: 8 }}>
                      <CreditCardOutlined style={{ marginRight: 8 }} />
                      Credit/Debit Card
                    </Radio>
                    <Radio value="paypal" style={{ width: '100%', padding: '12px', border: '1px solid #f0f0f0', borderRadius: 8 }}>
                      PayPal
                    </Radio>
                    <Radio value="bank" style={{ width: '100%', padding: '12px', border: '1px solid #f0f0f0', borderRadius: 8 }}>
                      Bank Transfer
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form layout="vertical" style={{ marginTop: 20 }}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Card Number">
                      <Input placeholder="1234 5678 9012 3456" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Expiry Date">
                      <Input placeholder="MM/YY" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="CVV">
                      <Input placeholder="123" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Cardholder Name">
                      <Input placeholder="John Doe" size="large" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        )

      case 2:
        return (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 24 }} />
            <Title level={3} style={{ color: '#52c41a', marginBottom: 16 }}>
              Booking Confirmed!
            </Title>
            <Text style={{ fontSize: 16, color: '#666', display: 'block', marginBottom: 24 }}>
              Your trip to {destination.name} has been successfully booked.
              You will receive a confirmation email shortly.
            </Text>
            
            <Card style={{ marginBottom: 24, borderRadius: 16, textAlign: 'left' }}>
              <Title level={5}>Booking Details</Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Booking ID:</Text>
                  <Text strong>#TRV-2024-001</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Destination:</Text>
                  <Text>{destination.name}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Travelers:</Text>
                  <Text>2 Persons</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Total Amount:</Text>
                  <Text strong style={{ color: '#FF7757' }}>€572.00</Text>
                </div>
              </Space>
            </Card>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                type="primary"
                size="large"
                onClick={() => onNavigate('/bookings')}
                style={{
                  width: '100%',
                  background: '#FF7757',
                  borderColor: '#FF7757',
                  borderRadius: 12,
                  height: 48
                }}
              >
                View My Bookings
              </Button>
              <Button
                size="large"
                onClick={() => onNavigate('/home')}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  height: 48
                }}
              >
                Back to Home
              </Button>
            </Space>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            style={{ fontSize: '18px' }}
          />
          <Title level={4} style={{ margin: 0 }}>
            {currentStep === 0 ? 'Book Your Trip' : 
             currentStep === 1 ? 'Payment' : 'Confirmation'}
          </Title>
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '20px', background: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <Steps current={currentStep} size="small">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon} />
          ))}
        </Steps>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {renderStepContent()}

        {/* Navigation Buttons */}
        {currentStep < 2 && (
          <div style={{ marginTop: 24 }}>
            <Button
              type="primary"
              size="large"
              onClick={handleNext}
              style={{
                width: '100%',
                background: '#FF7757',
                borderColor: '#FF7757',
                borderRadius: 12,
                height: 48
              }}
            >
              {currentStep === 0 ? 'Continue to Payment' : 'Complete Booking'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingPage
