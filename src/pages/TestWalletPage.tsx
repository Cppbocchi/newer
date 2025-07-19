import { useState } from 'react'
import { Card, Button, Space, Typography, message } from 'antd'

const { Title, Paragraph, Text } = Typography

function TestWalletPage() {
  const [testResults, setTestResults] = useState<string[]>([])
  
  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  // 测试无认证的API
  const testUnauthenticatedAPI = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/test/balance/1')
      const data = await response.json()
      addResult(`无认证API测试成功: 余额 ${data.data.balance}`)
    } catch (error) {
      addResult(`无认证API测试失败: ${error}`)
    }
  }

  // 测试有认证的API
  const testAuthenticatedAPI = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        addResult('未找到认证token，请先登录')
        return
      }

      const response = await fetch('http://localhost:8080/api/user/wallet/balance', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        addResult(`认证API测试成功: 余额 ${data.data.balance}`)
      } else {
        const errorData = await response.text()
        addResult(`认证API测试失败: ${response.status} - ${errorData}`)
      }
    } catch (error) {
      addResult(`认证API测试失败: ${error}`)
    }
  }

  // 检查token状态
  const checkToken = () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      addResult(`Token存在: ${token.substring(0, 20)}...`)
      
      // 尝试解析token（简单方式）
      try {
        const parts = token.split('.')
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]))
          addResult(`Token解析: 用户ID ${payload.userId || payload.sub}, 过期时间 ${new Date(payload.exp * 1000).toLocaleString()}`)
        }
      } catch (error) {
        addResult(`Token解析失败: ${error}`)
      }
    } else {
      addResult('未找到认证token')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>钱包API测试页面</Title>
      
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Button onClick={checkToken}>检查Token状态</Button>
          <Button onClick={testUnauthenticatedAPI}>测试无认证API</Button>
          <Button onClick={testAuthenticatedAPI}>测试认证API</Button>
          <Button onClick={() => setTestResults([])}>清除结果</Button>
        </Space>
      </Card>

      <Card title="测试结果" style={{ marginTop: '20px' }}>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {testResults.length === 0 ? (
            <Text type="secondary">暂无测试结果</Text>
          ) : (
            testResults.map((result, index) => (
              <Paragraph key={index} code style={{ margin: '5px 0' }}>
                {result}
              </Paragraph>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}

export default TestWalletPage
