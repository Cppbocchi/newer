import { 
  Card, 
  Avatar, 
  Button, 
  Typography, 
  Space, 
  List, 
  Switch,
  Divider,
  Badge,
  Row,
  Col,
  Tag,
  Progress,
  Form,
  Modal,
  Input,
  message
} from 'antd'
import { 
  ArrowLeftOutlined,
  UserOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  BellOutlined,
  SecurityScanOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  EditOutlined,
  RightOutlined,
  StarFilled,
  GiftOutlined,
  GlobalOutlined,
  TrophyOutlined,
  ExclamationCircleOutlined,
  ShareAltOutlined,
  CrownOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import { mockUserProfile, mockUserStats, memberLevels } from '../data/userData'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../services/authService'

const { Title, Text } = Typography
const { confirm } = Modal

interface ProfilePageProps {
  onNavigate: (route: string) => void
}

interface UpdateValues {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

// Mock 菜单项
const mockMenuItems = [
  {
    key: 'personal-info',
    title: 'Personal Information',
    icon: <UserOutlined />,
    description: 'Manage your personal details',
    showArrow: true
  },
  {
    key: 'payment',
    title: 'Payment Methods',
    icon: <CreditCardOutlined />,
    description: '2 cards saved',
    showArrow: true
  },
  {
    key: 'booking-history',
    title: 'Booking History',
    icon: <HistoryOutlined />,
    description: 'View past bookings',
    showArrow: true,
    badge: '3'
  },
  {
    key: 'notifications',
    title: 'Notifications',
    icon: <BellOutlined />,
    description: 'Manage your notifications',
    action: <Switch defaultChecked={mockUserProfile.preferences.notifications.push} size="small" />
  },
  {
    key: 'security',
    title: 'Security & Privacy',
    icon: <SecurityScanOutlined />,
    description: 'Password and privacy settings',
    showArrow: true
  },
  {
    key: 'language',
    title: 'Language & Region',
    icon: <GlobalOutlined />,
    description: mockUserProfile.preferences.language,
    showArrow: true
  },
  {
    key: 'rewards',
    title: 'Rewards & Offers',
    icon: <GiftOutlined />,
    description: 'Special deals and rewards',
    showArrow: true,
    badge: '2'
  },
  {
    key: 'help',
    title: 'Help & Support',
    icon: <QuestionCircleOutlined />,
    description: '24/7 customer support',
    showArrow: true
  }
]

// 计算下一等级所需积分
const getNextLevelProgress = (currentLevel: string, points: number) => {
  const levels = memberLevels as Record<string, { min: number; max: number; color: string; benefits: string[] }>
  const current = levels[currentLevel]
  if (!current) return { percent: 100, nextLevel: 'Max Level', pointsNeeded: 0 }
  
  const percent = Math.min(((points - current.min) / (current.max - current.min)) * 100, 100)
  const pointsNeeded = Math.max(current.max - points, 0)
  const nextLevelKey = Object.keys(levels).find(level => levels[level].min > current.min)
  const nextLevel = nextLevelKey || 'Max Level'
  
  return { percent, nextLevel, pointsNeeded }
}

function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  // 使用真实用户数据或 fallback 到 mock 数据
  const userProfile = user!
  
  const { percent, nextLevel, pointsNeeded } = getNextLevelProgress(
    userProfile.memberLevel, 
    userProfile.memberPoints || 0
  )

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'personal-info':      
        setOpen(true)         
        break
      case 'payment':
        onNavigate('/wallet')
        break
      case 'booking-history':
        onNavigate('/bookings')
        break
      default:
        console.log(`Navigate to ${key}`)
    }
  }

  const handleLogout = () => {
    confirm({
      title: 'Are you sure you want to logout?',
      icon: <ExclamationCircleOutlined />,
      content: 'You will need to login again to access your account.',
      okText: 'Yes, Logout',
      cancelText: 'Cancel',
      onOk() {
        logout()
        if (onNavigate) {
          onNavigate('/home')
        } else {
          navigate('/home')
        }
      }
    })
  }

  const handleShareProfile = () => {
    console.log('Share profile')
    // 这里可以添加分享逻辑
  }

  const onFinishUpdate = async (values: UpdateValues) => {
    try {
      const response = await AuthService.update(values)
      if (response.status === 0) {
        setOpen(false);
        message.success('Profile updated successfully');
      } else {
        message.error(response.message || 'Failed to update profile');
      }
    } catch(error) {
      console.error('An error occurred while updating profile:', error);
      message.error('An error occurred while updating profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Modal
        open={open}
        title="Edit Profile"
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        destroyOnHidden
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="user_profile_update_form"
            initialValues={userProfile}
            clearOnDestroy
            onFinish={(values) => onFinishUpdate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <span style={{paddingLeft: '12px', fontWeight: 'bold' }}>Name</span>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: 'Please enter your full name' },
            { min: 2, message: 'Name must be at least 2 characters' }
          ]}
        >
          <Input
            defaultValue={userProfile.name}
            prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Full Name"
            style={{ borderRadius: '12px', height: '48px' }}
          />
        </Form.Item>

        <span style={{paddingLeft: '12px', fontWeight: 'bold' }}>Email</span>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input
            defaultValue={userProfile.email}
            prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Email Address"
            style={{ borderRadius: '12px', height: '48px' }}
          />
        </Form.Item>

        <span style={{paddingLeft: '12px', fontWeight: 'bold' }}>Phone</span>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: 'Please enter your phone number' },
            { 
              pattern: /^(\+\d{1,8}[- ]?)?\d{11}$/,
              message: 'Please enter a valid phone number'
            }
          ]}
        >
          <Input
            defaultValue={userProfile.phone}
            prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Phone Number"
            style={{ borderRadius: '12px', height: '48px' }}
          />
        </Form.Item>

        <span style={{paddingLeft: '12px', fontWeight: 'bold' }}>Password</span>
        <Form.Item
          name="password"
          rules={[
            { required: false, message: '请输入密码' },
            { min: 6, message: '密码至少需要6位' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="New Password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            style={{ borderRadius: '12px', height: '50px' }}
          />
        </Form.Item>

        <span style={{paddingLeft: '12px', fontWeight: 'bold' }}>Confirm Password</span>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: false, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Passwords do not match'))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Confirm New Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            style={{ borderRadius: '12px', height: '48px' }}
          />
        </Form.Item>
      </Modal>

      {/* Header */}
      <Card 
        className="rounded-none shadow-sm sticky top-0 z-10" 
        style={{ 
          padding: '12px 16px',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <div className="flex items-center justify-between">
          <Space>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => onNavigate('/home')}
              size="large"
            />
            <Title level={4} style={{ margin: 0, color: '#1f2937' }}>
              Profile
            </Title>
          </Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleMenuClick('personal-info')}
          />
        </div>
      </Card>

      {/* User Info Card */}
      <div className="px-4 pt-6 pb-4">
        <Card className="rounded-2xl shadow-sm border-0">
          <div className="text-center">
            <Badge 
              dot 
              status="success" 
              offset={[-8, 8]}
            >
              <Avatar 
                size={80} 
                src={userProfile.avatar}
                icon={<UserOutlined />}
                className="mb-4"
              />
            </Badge>
            
            <div className="mb-2">
              <Space align="center">
                <Title level={3} style={{ margin: 0 }}>
                  {userProfile.name}
                </Title>
                <Badge 
                  count={<StarFilled style={{ color: '#faad14' }} />} 
                  showZero={false}
                />
              </Space>
            </div>
            
            <Tag 
              color="gold" 
              className="mb-3"
              style={{ 
                backgroundColor:'#d4af37',
                color: '#000',
                fontWeight: 'bold'
              }}
            >
              <TrophyOutlined className="mr-1" />
              {userProfile.memberLevel} Member
            </Tag>
            
            <Text type="secondary" className="block mb-4">
              Member since {new Date(userProfile.createdAt || Date.now()).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </Text>

            {/* Member Progress */}
            {nextLevel !== 'Max Level' && (
              <div className="mb-4 px-4">
                <div className="flex justify-between items-center mb-2">
                  <Text className="text-sm font-medium">
                    Progress to {nextLevel}
                  </Text>
                  <Text className="text-sm text-blue-600 font-medium">
                    {pointsNeeded.toLocaleString()} points needed
                  </Text>
                </div>
                <Progress 
                  percent={percent} 
                  strokeColor="#1890ff"
                  size="small"
                />
              </div>
            )}

            {/* Stats */}
            <Row gutter={16} className="mt-4">
              <Col span={6}>
                <div className="text-center">
                  <div className="text-2xl mb-1">✈️</div>
                  <div className="font-semibold text-lg text-gray-800">
                    {mockUserStats.totalTrips}
                  </div>
                  <Text type="secondary" className="text-xs">
                    Trips
                  </Text>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center">
                  <div className="text-2xl mb-1">🌍</div>
                  <div className="font-semibold text-lg text-gray-800">
                    {mockUserStats.countriesVisited}
                  </div>
                  <Text type="secondary" className="text-xs">
                    Countries
                  </Text>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center">
                  <div className="text-2xl mb-1">⭐</div>
                  <div className="font-semibold text-lg text-gray-800">
                    {(mockUserStats.totalPoints / 1000).toFixed(1)}K
                  </div>
                  <Text type="secondary" className="text-xs">
                    Points
                  </Text>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center">
                  <div className="text-2xl mb-1">📝</div>
                  <div className="font-semibold text-lg text-gray-800">
                    {mockUserStats.reviewsWritten}
                  </div>
                  <Text type="secondary" className="text-xs">
                    Reviews
                  </Text>
                </div>
              </Col>
            </Row>

            {/* Quick Actions */}
            <Row gutter={8} className="mt-6">
              <Col span={12}>
                <Button 
                  type="primary" 
                  block 
                  icon={<EditOutlined />}
                  style={{ borderRadius: '12px', height: '40px' }}
                  onClick={() => handleMenuClick('personal-info')}
                >
                  Edit Profile
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  block 
                  icon={<ShareAltOutlined />}
                  style={{ borderRadius: '12px', height: '40px' }}
                  onClick={handleShareProfile}
                >
                  Share
                </Button>
              </Col>
            </Row>
          </div>
        </Card>
      </div>

      {/* Member Benefits Card */}
      <div className="px-4 pb-4">
        <Card className="rounded-2xl shadow-sm border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CrownOutlined style={{ color: memberLevels[mockUserProfile.memberLevel].color, fontSize: '20px' }} />
              <Title level={5} style={{ margin: 0 }}>
                {mockUserProfile.memberLevel} Benefits
              </Title>
            </div>
            <Button type="text" size="small" style={{ color: '#1890ff' }}>
              View All
            </Button>
          </div>
          
          <Row gutter={[12, 12]}>
            {memberLevels[mockUserProfile.memberLevel].benefits.slice(0, 4).map((benefit, index) => (
              <Col span={12} key={index}>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <Text className="text-sm font-medium text-blue-700">
                    {benefit}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-4 pb-6">
        <Card className="rounded-2xl shadow-sm border-0">
          <List
            dataSource={mockMenuItems}
            renderItem={(item, index) => (
              <>
                <List.Item
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-200 px-0 py-4"
                  onClick={() => handleMenuClick(item.key)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {item.title}
                        </div>
                        <Text type="secondary" className="text-sm">
                          {item.description}
                        </Text>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <Badge 
                          count={item.badge} 
                          size="small"
                          style={{ backgroundColor: '#ff4d4f' }}
                        />
                      )}
                      {item.action || (item.showArrow && (
                        <RightOutlined className="text-gray-400 text-xs" />
                      ))}
                    </div>
                  </div>
                </List.Item>
                {index < mockMenuItems.length - 1 && (
                  <Divider style={{ margin: 0 }} />
                )}
              </>
            )}
          />
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-4 pb-4">
        <Card className="rounded-2xl shadow-sm border-0">
          <div className="flex items-center justify-between mb-4">
            <Title level={5} style={{ margin: 0 }}>Recent Activity</Title>
            <Button type="text" size="small" style={{ color: '#1890ff' }}>
              View All
            </Button>
          </div>
          
          <Space direction="vertical" size="middle" className="w-full">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Text style={{ fontSize: '14px' }}>✈️</Text>
                </div>
                <div>
                  <Text strong className="text-sm">Flight to Bali</Text>
                  <br />
                  <Text type="secondary" className="text-xs">Jan 15, 2024</Text>
                </div>
              </div>
              <Text strong style={{ color: '#52c41a' }}>+450 pts</Text>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Text style={{ fontSize: '14px' }}>🏨</Text>
                </div>
                <div>
                  <Text strong className="text-sm">Hotel Booking</Text>
                  <br />
                  <Text type="secondary" className="text-xs">Jan 10, 2024</Text>
                </div>
              </div>
              <Text strong style={{ color: '#52c41a' }}>+120 pts</Text>
            </div>
          </Space>
        </Card>
      </div>

      {/* Logout Button */}
      <div className="px-4 pb-8">
        <Button 
          type="text" 
          danger
          icon={<LogoutOutlined />}
          size="large"
          className="w-full h-12 rounded-2xl font-medium"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default ProfilePage
