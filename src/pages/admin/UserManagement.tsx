import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  Tag,
  Typography,
  Card,
  Row,
  Col,
  Select,
  message
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons'

const { Title } = Typography
const { Option } = Select

interface User {
  id: string
  name: string
  email: string
  phone: string
  balance: number
  status: 'ACTIVE' | 'INACTIVE'
  joinDate: string
  totalOrders: number
  role: 'USER' | 'ADMIN'
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [form] = Form.useForm()

  // 模拟用户数据
  const mockUsers: User[] = [
    {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138001',
      balance: 1200.50,
      status: 'ACTIVE',
      joinDate: '2025-01-15',
      totalOrders: 5,
      role: 'USER'
    },
    {
      id: '2',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13800138002',
      balance: 500.00,
      status: 'ACTIVE',
      joinDate: '2025-02-20',
      totalOrders: 3,
      role: 'USER'
    },
    {
      id: '3',
      name: '王五',
      email: 'wangwu@example.com',
      phone: '13800138003',
      balance: 0.00,
      status: 'INACTIVE',
      joinDate: '2025-03-10',
      totalOrders: 0,
      role: 'USER'
    }
  ]

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      // 模拟API调用
      setTimeout(() => {
        setUsers(mockUsers)
        setLoading(false)
      }, 500)
    } catch (error) {
      message.error('加载用户数据失败')
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setModalVisible(true)
  }

  const handleDelete = async (userId: string) => {
    try {
      // 模拟API调用
      setUsers(users.filter(user => user.id !== userId))
      message.success('用户删除成功')
    } catch (error) {
      message.error('删除用户失败')
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      if (editingUser) {
        // 更新用户
        const updatedUsers = users.map(user => 
          user.id === editingUser.id ? { ...user, ...values } : user
        )
        setUsers(updatedUsers)
        message.success('用户更新成功')
      } else {
        // 添加用户
        const newUser: User = {
          id: Date.now().toString(),
          ...values,
          balance: 0,
          totalOrders: 0,
          joinDate: new Date().toISOString().split('T')[0]
        }
        setUsers([...users, newUser])
        message.success('用户添加成功')
      }
      setModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error(editingUser ? '更新用户失败' : '添加用户失败')
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: number) => `¥${balance.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
          {status === 'ACTIVE' ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: '订单数',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
    },
    {
      title: '操作',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除此用户？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button 
              icon={<DeleteOutlined />} 
              size="small"
              danger
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    user.email.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  return (
    <div>
      <Title level={2}>用户管理</Title>
      
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                {users.length}
              </div>
              <div>总用户数</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                {users.filter(u => u.status === 'ACTIVE').length}
              </div>
              <div>活跃用户</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#faad14' }}>
                ¥{users.reduce((sum, u) => sum + u.balance, 0).toFixed(2)}
              </div>
              <div>总余额</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#722ed1' }}>
                {users.reduce((sum, u) => sum + u.totalOrders, 0)}
              </div>
              <div>总订单数</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 操作栏 */}
      <Card style={{ marginBottom: 24 }}>
        <Row justify="space-between">
          <Col>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAdd}
              >
                添加用户
              </Button>
            </Space>
          </Col>
          <Col>
            <Input.Search
              placeholder="搜索用户名或邮箱"
              allowClear
              style={{ width: 300 }}
              onSearch={setSearchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
        </Row>
      </Card>

      {/* 用户表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredUsers.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 添加/编辑用户弹窗 */}
      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="手机号"
                rules={[{ required: true, message: '请输入手机号' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select>
                  <Option value="ACTIVE">正常</Option>
                  <Option value="INACTIVE">禁用</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="角色"
                rules={[{ required: true, message: '请选择角色' }]}
              >
                <Select>
                  <Option value="USER">普通用户</Option>
                  <Option value="ADMIN">管理员</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {!editingUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement
