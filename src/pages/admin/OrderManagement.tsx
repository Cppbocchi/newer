import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Tag,
  Typography,
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  message,
  Modal
} from 'antd'
import {
  DeleteOutlined,
  SearchOutlined,
  SendOutlined,
  EyeOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

const { Title } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

interface Order {
  id: string
  userId: string
  userName: string
  attractionName: string
  quantity: number
  unitPrice: number
  totalAmount: number
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'
  visitDate: string
  createTime: string
  paymentTime?: string
  deliveryTime?: string
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // 模拟订单数据
  const mockOrders: Order[] = [
    {
      id: 'ORDER_20250719_001',
      userId: '1',
      userName: '张三',
      attractionName: '故宫博物院',
      quantity: 2,
      unitPrice: 120,
      totalAmount: 240,
      status: 'PAID',
      visitDate: '2025-08-01',
      createTime: '2025-07-19 10:30:00',
      paymentTime: '2025-07-19 10:35:00'
    },
    {
      id: 'ORDER_20250719_002',
      userId: '2',
      userName: '李四',
      attractionName: '天坛公园',
      quantity: 1,
      unitPrice: 80,
      totalAmount: 80,
      status: 'PENDING',
      visitDate: '2025-08-02',
      createTime: '2025-07-19 09:15:00'
    },
    {
      id: 'ORDER_20250719_003',
      userId: '3',
      userName: '王五',
      attractionName: '颐和园',
      quantity: 3,
      unitPrice: 100,
      totalAmount: 300,
      status: 'SHIPPED',
      visitDate: '2025-08-03',
      createTime: '2025-07-19 08:45:00',
      paymentTime: '2025-07-19 08:50:00',
      deliveryTime: '2025-07-19 15:00:00'
    }
  ]

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      // 模拟API调用
      setTimeout(() => {
        setOrders(mockOrders)
        setLoading(false)
      }, 500)
    } catch (error) {
      message.error('加载订单数据失败')
      setLoading(false)
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    try {
      setOrders(orders.filter(order => order.id !== orderId))
      message.success('订单删除成功')
    } catch (error) {
      message.error('删除订单失败')
    }
  }

  const handleShipOrder = async (orderId: string) => {
    try {
      const updatedOrders = orders.map(order =>
        order.id === orderId
          ? { ...order, status: 'SHIPPED' as const, deliveryTime: new Date().toLocaleString() }
          : order
      )
      setOrders(updatedOrders)
      message.success('发货成功')
    } catch (error) {
      message.error('发货失败')
    }
  }

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order)
    setDetailModalVisible(true)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'PENDING': 'orange',
      'PAID': 'green',
      'SHIPPED': 'blue',
      'COMPLETED': 'success',
      'CANCELLED': 'red'
    }
    return colors[status as keyof typeof colors] || 'default'
  }

  const getStatusText = (status: string) => {
    const texts = {
      'PENDING': '待付款',
      'PAID': '已付款',
      'SHIPPED': '已发货',
      'COMPLETED': '已完成',
      'CANCELLED': '已取消'
    }
    return texts[status as keyof typeof texts] || status
  }

  const columns = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
      width: 180,
    },
    {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '景点',
      dataIndex: 'attractionName',
      key: 'attractionName',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 80,
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number) => `¥${price}`,
      width: 100,
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `¥${amount}`,
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
      width: 100,
    },
    {
      title: '游览日期',
      dataIndex: 'visitDate',
      key: 'visitDate',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'actions',
      width: 200,
      render: (_: any, record: Order) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
          {record.status === 'PENDING' && (
            <Popconfirm
              title="确定删除此订单？"
              onConfirm={() => handleDeleteOrder(record.id)}
            >
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
              >
                删除
              </Button>
            </Popconfirm>
          )}
          {record.status === 'PAID' && (
            <Button
              icon={<SendOutlined />}
              size="small"
              type="primary"
              onClick={() => handleShipOrder(record.id)}
            >
              发货
            </Button>
          )}
        </Space>
      ),
    },
  ]

  // 过滤订单
  const filteredOrders = orders.filter(order => {
    // 状态过滤
    if (statusFilter !== 'ALL' && order.status !== statusFilter) {
      return false
    }
    
    // 关键词搜索
    if (searchKeyword && !(
      order.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      order.attractionName.toLowerCase().includes(searchKeyword.toLowerCase())
    )) {
      return false
    }
    
    // 日期范围过滤
    if (dateRange && dateRange[0] && dateRange[1]) {
      const orderDate = dayjs(order.createTime)
      if (!(orderDate.isAfter(dateRange[0], 'day') || orderDate.isSame(dateRange[0], 'day')) ||
          !(orderDate.isBefore(dateRange[1], 'day') || orderDate.isSame(dateRange[1], 'day'))) {
        return false
      }
    }
    
    return true
  })

  // 统计数据
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    paid: orders.filter(o => o.status === 'PAID').length,
    shipped: orders.filter(o => o.status === 'SHIPPED').length,
    totalRevenue: orders.filter(o => o.status !== 'CANCELLED').reduce((sum, o) => sum + o.totalAmount, 0)
  }

  return (
    <div>
      <Title level={2}>订单管理</Title>
      
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                {stats.total}
              </div>
              <div>总订单数</div>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#faad14' }}>
                {stats.pending}
              </div>
              <div>待付款</div>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                {stats.paid}
              </div>
              <div>已付款</div>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                {stats.shipped}
              </div>
              <div>已发货</div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#722ed1' }}>
                ¥{stats.totalRevenue.toFixed(2)}
              </div>
              <div>总收入</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 过滤器 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="订单状态"
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="ALL">全部状态</Option>
              <Option value="PENDING">待付款</Option>
              <Option value="PAID">已付款</Option>
              <Option value="SHIPPED">已发货</Option>
              <Option value="COMPLETED">已完成</Option>
              <Option value="CANCELLED">已取消</Option>
            </Select>
          </Col>
          <Col span={8}>
            <RangePicker
              style={{ width: '100%' }}
              placeholder={['开始日期', '结束日期']}
              value={dateRange}
              onChange={setDateRange}
            />
          </Col>
          <Col span={6}>
            <Input.Search
              placeholder="搜索订单号/用户/景点"
              allowClear
              onSearch={setSearchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={4}>
            <Button onClick={loadOrders}>刷新</Button>
          </Col>
        </Row>
      </Card>

      {/* 订单表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{
            total: filteredOrders.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 订单详情弹窗 */}
      <Modal
        title="订单详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedOrder && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <strong>订单号：</strong>{selectedOrder.id}
              </Col>
              <Col span={12}>
                <strong>状态：</strong>
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {getStatusText(selectedOrder.status)}
                </Tag>
              </Col>
              <Col span={12}>
                <strong>用户：</strong>{selectedOrder.userName}
              </Col>
              <Col span={12}>
                <strong>景点：</strong>{selectedOrder.attractionName}
              </Col>
              <Col span={12}>
                <strong>数量：</strong>{selectedOrder.quantity}张
              </Col>
              <Col span={12}>
                <strong>单价：</strong>¥{selectedOrder.unitPrice}
              </Col>
              <Col span={12}>
                <strong>总金额：</strong>¥{selectedOrder.totalAmount}
              </Col>
              <Col span={12}>
                <strong>游览日期：</strong>{selectedOrder.visitDate}
              </Col>
              <Col span={12}>
                <strong>创建时间：</strong>{selectedOrder.createTime}
              </Col>
              {selectedOrder.paymentTime && (
                <Col span={12}>
                  <strong>付款时间：</strong>{selectedOrder.paymentTime}
                </Col>
              )}
              {selectedOrder.deliveryTime && (
                <Col span={12}>
                  <strong>发货时间：</strong>{selectedOrder.deliveryTime}
                </Col>
              )}
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OrderManagement
