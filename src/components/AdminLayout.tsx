import React, { useState } from 'react'
import { Layout, Menu, Button, Avatar, Dropdown, Space, Typography } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RetweetOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthService } from '../services/authService'

const { Header, Sider, Content } = Layout
const { Title } = Typography

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/admin/orders',
      icon: <ShoppingCartOutlined />,
      label: '订单管理',
    },
    {
      key: '/admin/refunds',
      icon: <RetweetOutlined />,
      label: '退票管理',
    },
    {
      key: '/admin/spots',
      icon: <EnvironmentOutlined />,
      label: '景点管理',
    },
    {
      key: '/admin/reports',
      icon: <BarChartOutlined />,
      label: '报表统计',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const handleLogout = () => {
    AuthService.clearAuthToken()
    navigate('/login')
  }

  const userMenuItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="dark"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div style={{ 
          height: 40, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          {collapsed ? '管理' : '旅游管理系统'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ 
            background: 'transparent',
            border: 'none',
            fontSize: '16px'
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: '72px'
        }}>
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '18px',
                width: 72,
                height: 72,
              }}
            />
            <Title level={3} style={{ margin: 0, color: '#1890ff', fontSize: '24px' }}>
              管理员控制台
            </Title>
          </Space>
          
          <Dropdown
            menu={{ 
              items: userMenuItems,
              onClick: ({ key }) => {
                const item = userMenuItems.find(item => item.key === key)
                if (item?.onClick) item.onClick()
              }
            }}
            placement="bottomRight"
          >
            <Space style={{ cursor: 'pointer', fontSize: '16px' }}>
              <Avatar size={40} icon={<UserOutlined />} />
              <span style={{ fontSize: '16px', fontWeight: '500' }}>系统管理员</span>
            </Space>
          </Dropdown>
        </Header>
        <Content style={{ 
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          borderRadius: 8,
          minHeight: 280,
          overflow: 'auto',
          fontSize: '16px'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
