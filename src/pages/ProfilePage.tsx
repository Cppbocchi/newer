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
import { mockUserProfile, memberLevels } from '../data/userData'
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
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  // 使用真实用户数据或 fallback 到 mock 数据
  const userProfile = user!
  
  const { percent, nextLevel, pointsNeeded } = getNextLevelProgress(
    userProfile.memberLevel, 
    userProfile.memberPoints || 0
  )

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'personal-info':      
        setPersonalInfoOpen(true)         
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

      {/* Personal Information Modal */}
      <Modal
        open={personalInfoOpen}
        title={
          <div className="flex items-center" style={{ fontSize: '18px', fontWeight: 600 }}>
            <UserOutlined className="mr-3" style={{ fontSize: '20px', color: '#1890ff' }} />
            个人信息
          </div>
        }
        footer={null}
        onCancel={() => setPersonalInfoOpen(false)}
        width={650}
        styles={{
          content: { padding: 0 },
          body: { padding: '32px' }
        }}
      >
        <div className="py-6">
          <Row gutter={[28, 32]}>
            {/* 基本信息区域 */}
            <Col span={24}>
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="w-1 h-6 bg-blue-500 mr-4"></div>
                  <Text strong style={{ fontSize: '16px', color: '#262626' }}>基本信息</Text>
                </div>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-400">
                      <Text type="secondary" style={{ fontSize: '13px', fontWeight: 500 }} className="block mb-4">
                        用户名
                      </Text>
                      <Text strong style={{ fontSize: '17px', color: '#1f2937', lineHeight: '1.5' }}>
                        {userProfile.name}
                      </Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-400">
                      <Text type="secondary" style={{ fontSize: '13px', fontWeight: 500 }} className="block mb-4">
                        电子邮箱
                      </Text>
                      <Text strong style={{ fontSize: '15px', color: '#1f2937', wordBreak: 'break-all', lineHeight: '1.5' }}>
                        {userProfile.email}
                      </Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-400">
                      <Text type="secondary" style={{ fontSize: '13px', fontWeight: 500 }} className="block mb-4">
                        手机号码
                      </Text>
                      <Text strong style={{ fontSize: '17px', color: '#1f2937', lineHeight: '1.5' }}>
                        {userProfile.phone || '未设置'}
                      </Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border-l-4 border-yellow-400">
                      <Text type="secondary" style={{ fontSize: '13px', fontWeight: 500 }} className="block mb-4">
                        会员等级
                      </Text>
                      <div className="flex items-center">
                        <TrophyOutlined style={{ color: '#faad14', marginRight: '10px', fontSize: '18px' }} />
                        <Text strong style={{ fontSize: '17px', color: '#1f2937', lineHeight: '1.5' }}>
                          {userProfile.memberLevel}
                        </Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* 账户数据区域 */}
            <Col span={24}>
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-1 h-6 bg-green-500 mr-4"></div>
                  <Text strong style={{ fontSize: '16px', color: '#262626' }}>账户数据</Text>
                </div>
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <div className="bg-white p-7 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                          <Text style={{ fontSize: '24px' }}>📦</Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: '13px', fontWeight: 500 }}>
                          总订单数
                        </Text>
                        <div className="mt-4">
                          <Text strong style={{ fontSize: '26px', color: '#1890ff', lineHeight: '1.2' }}>
                            {userProfile.totalOrders || 0}
                          </Text>
                          <Text style={{ fontSize: '14px', color: '#666', marginLeft: '4px' }}>单</Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="bg-white p-7 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5">
                          <Text style={{ fontSize: '24px' }}>⭐</Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: '13px', fontWeight: 500 }}>
                          积分余额
                        </Text>
                        <div className="mt-4">
                          <Text strong style={{ fontSize: '26px', color: '#fa8c16', lineHeight: '1.2' }}>
                            {userProfile.memberPoints || 0}
                          </Text>
                          <Text style={{ fontSize: '14px', color: '#666', marginLeft: '4px' }}>分</Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="bg-white p-7 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                          <Text style={{ fontSize: '24px' }}>💰</Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: '13px', fontWeight: 500 }}>
                          账户余额
                        </Text>
                        <div className="mt-4">
                          <Text strong style={{ fontSize: '26px', color: '#52c41a', lineHeight: '1.2' }}>
                            ¥{(userProfile.balance || 0).toFixed(2)}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          
          {/* Edit Button */}
          <div className="mt-12 text-center">
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={() => {
                setPersonalInfoOpen(false)
                setOpen(true)
              }}
              size="large"
              style={{ 
                borderRadius: '10px',
                height: '48px',
                paddingLeft: '36px',
                paddingRight: '36px',
                fontSize: '15px',
                fontWeight: 500,
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
              }}
            >
              编辑个人信息
            </Button>
          </div>
        </div>
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
            onClick={() => setOpen(true)}
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
                  <div className="text-2xl mb-1">📦</div>
                  <div className="font-semibold text-lg text-gray-800">
                    {userProfile.totalOrders || 0}
                  </div>
                  <Text type="secondary" className="text-xs">
                    Orders
                  </Text>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center">
                  <div className="text-2xl mb-1">⭐</div>
                  <div className="font-semibold text-lg text-gray-800">
                    {userProfile.memberPoints || 0}
                  </div>
                  <Text type="secondary" className="text-xs">
                    Points
                  </Text>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center">
                  <div className="text-2xl mb-1">💰</div>
                  <div className="font-semibold text-lg text-gray-800">
                    ¥{(userProfile.balance || 0).toFixed(0)}
                  </div>
                  <Text type="secondary" className="text-xs">
                    Balance
                  </Text>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="font-semibold text-lg text-gray-800">
                    {userProfile.memberLevel}
                  </div>
                  <Text type="secondary" className="text-xs">
                    Level
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
                  onClick={() => setOpen(true)}
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
