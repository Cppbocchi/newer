import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Row, 
  Col, 
  Input, 
  Select, 
  Button, 
  Tag, 
  Typography, 
  Space,
  Spin,
  Empty,
  Pagination,
  Divider
} from 'antd'
import { Search, MapPin, Users, SlidersHorizontal, Clock, Star } from 'lucide-react'
import { spotService } from '../services/spotService'
import type { SpotItem } from '../services/spotService'

const { Title, Text } = Typography
const { Option } = Select

const Destinations: React.FC = () => {
  const navigate = useNavigate()
  const [spots, setSpots] = useState<SpotItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(12)
  const [totalSpots, setTotalSpots] = useState(0)
  const [filterData, setFilterData] = useState<{ cities: string[], provinces: string[] }>({
    cities: [],
    provinces: []
  })

  const loadSpots = useCallback(async () => {
    setLoading(true)
    try {
      const allSpots = await spotService.getAllSpots({
        keyword: searchKeyword,
        cityName: selectedCity,
        proName: selectedProvince,
        page: 1,
        pageSize: 100 // 获取所有数据用于分页
      })
      
      setTotalSpots(allSpots.length)
      
      // 客户端分页
      const startIndex = (currentPage - 1) * pageSize
      const endIndex = startIndex + pageSize
      setSpots(allSpots.slice(startIndex, endIndex))
    } catch (error) {
      console.error('加载景点失败:', error)
    } finally {
      setLoading(false)
    }
  }, [searchKeyword, selectedCity, selectedProvince, currentPage, pageSize])

  const getAllUniqueValues = async () => {
    try {
      const allSpots = await spotService.getAllSpots({ page: 1, pageSize: 100 })
      const cities = [...new Set(allSpots.map(spot => spot.cityName))].filter(Boolean)
      const provinces = [...new Set(allSpots.map(spot => spot.proName))].filter(Boolean)
      return { cities, provinces }
    } catch (error) {
      console.error('获取筛选数据失败:', error)
      return { cities: [], provinces: [] }
    }
  }

  useEffect(() => {
    loadSpots()
  }, [currentPage, searchKeyword, selectedCity, selectedProvince, loadSpots])

  useEffect(() => {
    getAllUniqueValues().then(setFilterData)
  }, [])

  const handleSearch = (value: string) => {
    setSearchKeyword(value)
    setCurrentPage(1)
  }

  const handleCityChange = (value: string) => {
    setSelectedCity(value)
    setCurrentPage(1)
  }

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value)
    setCurrentPage(1)
  }

  const handleSpotClick = (spot: SpotItem) => {
    navigate(`/spot/${spot.id}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleClearFilters = () => {
    setSelectedCity('')
    setSelectedProvince('')
    setSearchKeyword('')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-white shadow-sm p-6">
        <div className="max-w-7xl mx-auto">
          <Title level={2} style={{ margin: 0, color: '#1f2937' }}>
            🌟 热门景点
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            发现中国最美的旅游胜地
          </Text>
        </div>
      </div>

      {/* 搜索和筛选区域 */}
      <div className="bg-white shadow-sm p-6 mb-6">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12} lg={8}>
              <Input.Search
                placeholder="搜索景点名称或关键词..."
                enterButton={<Search size={16} />}
                size="large"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onSearch={handleSearch}
                style={{ borderRadius: '8px' }}
              />
            </Col>
            
            <Col xs={12} md={6} lg={4}>
              <Select
                placeholder="选择省份"
                value={selectedProvince}
                onChange={handleProvinceChange}
                style={{ width: '100%' }}
                size="large"
                allowClear
              >
                {filterData.provinces.map(province => (
                  <Option key={province} value={province}>{province}</Option>
                ))}
              </Select>
            </Col>
            
            <Col xs={12} md={6} lg={4}>
              <Select
                placeholder="选择城市"
                value={selectedCity}
                onChange={handleCityChange}
                style={{ width: '100%' }}
                size="large"
                allowClear
              >
                {filterData.cities.map(city => (
                  <Option key={city} value={city}>{city}</Option>
                ))}
              </Select>
            </Col>
            
            <Col xs={24} md={12} lg={8}>
              <Space>
                <Button 
                  icon={<SlidersHorizontal size={16} />}
                  onClick={handleClearFilters}
                  size="large"
                >
                  清除筛选
                </Button>
                <Divider type="vertical" />
                <Text type="secondary">
                  共找到 {totalSpots} 个景点
                </Text>
              </Space>
            </Col>
          </Row>
        </div>
      </div>

      {/* 景点列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {loading ? (
          <div className="text-center py-16">
            <Spin size="large" />
            <div className="mt-4">
              <Text type="secondary">加载景点数据中...</Text>
            </div>
          </div>
        ) : spots.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  没有找到符合条件的景点
                </Text>
                <br />
                <Text type="secondary">
                  试试调整搜索关键词或筛选条件
                </Text>
              </div>
            }
          >
            <Button type="primary" onClick={handleClearFilters}>
              清除筛选
            </Button>
          </Empty>
        ) : (
          <>
            <Row gutter={[24, 24]}>
              {spots.map((spot) => (
                <Col xs={24} sm={12} md={8} lg={6} key={spot.id}>
                  <Card
                    hoverable
                    cover={
                      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                        <img
                          alt={spot.name}
                          src={spot.picList[0] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                        
                        {/* 评分标签 */}
                        <div style={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          background: 'rgba(0,0,0,0.7)',
                          borderRadius: '20px',
                          padding: '6px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Star size={14} fill="#ffd700" color="#ffd700" />
                          <Text style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                            {spot.rating}
                          </Text>
                        </div>
                        
                        {/* 位置标签 */}
                        <div style={{
                          position: 'absolute',
                          bottom: 12,
                          left: 12,
                          background: 'rgba(0,0,0,0.7)',
                          borderRadius: '20px',
                          padding: '6px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <MapPin size={12} color="white" />
                          <Text style={{ color: 'white', fontSize: '12px' }}>
                            {spot.cityName}, {spot.proName}
                          </Text>
                        </div>
                      </div>
                    }
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #f0f0f0',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}
                    bodyStyle={{ padding: '16px' }}
                    onClick={() => handleSpotClick(spot)}
                  >
                    <div style={{ minHeight: '140px' }}>
                      {/* 景点名称 */}
                      <Title level={5} style={{ margin: '0 0 8px 0', fontSize: '16px' }} ellipsis>
                        {spot.name}
                      </Title>
                      
                      {/* 景点描述 */}
                      <Text type="secondary" style={{ fontSize: '12px', lineHeight: '1.4', display: 'block', marginBottom: '12px' }}>
                        {spot.summary.length > 60 ? spot.summary.substring(0, 60) + '...' : spot.summary}
                      </Text>
                      
                      {/* 标签 */}
                      <div style={{ marginBottom: '12px' }}>
                        <Space wrap size={4}>
                          {spot.tags.slice(0, 3).map((tag, index) => (
                            <Tag 
                              key={index} 
                              color="blue" 
                              style={{ 
                                fontSize: '10px', 
                                padding: '2px 6px',
                                margin: '0 2px 2px 0',
                                borderRadius: '10px'
                              }}
                            >
                              {tag}
                            </Tag>
                          ))}
                        </Space>
                      </div>

                      {/* 开放时间 */}
                      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                        <Clock size={12} style={{ marginRight: '4px', color: '#666' }} />
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {spot.openTime}
                        </Text>
                      </div>

                      {/* 价格和评论 */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <Text strong style={{ color: '#ff4d4f', fontSize: '18px' }}>
                            {spot.tickets.length > 0 ? (
                              spot.tickets.some(t => t.price === 0) ? (
                                '免费'
                              ) : (
                                `¥${Math.min(...spot.tickets.map(t => t.price))}`
                              )
                            ) : (
                              '¥0'
                            )}
                          </Text>
                          {spot.tickets.length > 0 && !spot.tickets.some(t => t.price === 0) && (
                            <Text type="secondary" style={{ fontSize: '12px', marginLeft: 2 }}>
                              起
                            </Text>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Users size={12} style={{ marginRight: '4px', color: '#666' }} />
                          <Text type="secondary" style={{ fontSize: '11px' }}>
                            {spot.reviewCount} 评论
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* 分页 */}
            <div className="text-center mt-12">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalSpots}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) => `第 ${range[0]}-${range[1]} 项，共 ${total} 项`}
                style={{ marginBottom: '24px' }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Destinations
