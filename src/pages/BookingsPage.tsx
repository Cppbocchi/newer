import { Card, Button, Typography, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface BookingsPageProps {
  onNavigate: (route: string) => void
}

function BookingsPage({ onNavigate }: BookingsPageProps) {
  return (
    <div>
      {/* Header */}
      <Card className="rounded-none shadow-sm" bodyStyle={{ padding: '16px' }}>
        <div className="flex items-center justify-between">
          <Space>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => onNavigate('/home')}
            />
            <Title level={4} style={{ margin: 0, color: '#1f2937' }}>My Bookings</Title>
          </Space>
        </div>
      </Card>

      {/* Content */}
      <div className="px-4 py-6 text-center">
        <Title level={3}>Your Bookings</Title>
        <Text type="secondary">Your booking history will appear here</Text>
      </div>
    </div>
  )
}

export default BookingsPage
