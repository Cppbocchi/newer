import { useState, useEffect } from 'react'
import { WalletOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { WalletService } from '../services/walletService'

interface WalletBalanceButtonProps {
  onClick?: () => void
  showLabel?: boolean
  size?: 'small' | 'middle' | 'large'
}

function WalletBalanceButton({ onClick, showLabel = true, size = 'middle' }: WalletBalanceButtonProps) {
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  // 获取钱包余额
  const fetchBalance = async () => {
    try {
      const response = await WalletService.getBalance()
      
      if (response.status === 200 && response.data) {
        setBalance(response.data.balance)
      }
    } catch (error) {
      console.error('Get balance error:', error)
    } finally {
      setLoading(false)
    }
  }

  // 页面加载时获取余额
  useEffect(() => {
    fetchBalance()
    
    // 定期更新余额（每30秒）
    const interval = setInterval(fetchBalance, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // 监听钱包更新事件
  useEffect(() => {
    const handleWalletUpdate = () => {
      fetchBalance()
    }

    window.addEventListener('walletUpdated', handleWalletUpdate)
    
    return () => {
      window.removeEventListener('walletUpdated', handleWalletUpdate)
    }
  }, [])

  const balanceDisplay = loading ? '...' : `¥${balance.toFixed(2)}`

  if (showLabel) {
    return (
      <Button 
        type="text" 
        icon={<WalletOutlined />}
        onClick={onClick}
        size={size}
        loading={loading}
      >
        {balanceDisplay}
      </Button>
    )
  }

  return (
    <Tooltip title={`余额：${balanceDisplay}`}>
      <Button 
        type="text" 
        icon={<WalletOutlined />}
        onClick={onClick}
        size={size}
        loading={loading}
        style={{ padding: '4px 8px' }}
      >
        {balanceDisplay}
      </Button>
    </Tooltip>
  )
}

export default WalletBalanceButton
