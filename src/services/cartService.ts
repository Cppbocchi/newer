// 购物车服务
import type { SpotItem, SpotTicket } from './spotService'

export interface CartItem {
  id: string
  spotId: string
  spotName: string
  spotImage: string
  ticketId: string
  ticketType: string
  ticketName: string
  price: number
  originalPrice?: number
  quantity: number
  validDays: number
  addedAt: Date
}

export interface CartSummary {
  totalItems: number
  totalPrice: number
  totalSavings: number
}

class CartService {
  private readonly storageKey = 'cart_items'

  // 获取购物车中的所有商品
  getCartItems(): CartItem[] {
    try {
      const items = localStorage.getItem(this.storageKey)
      if (!items) return []
      
      return JSON.parse(items).map((item: CartItem & { addedAt: string }) => ({
        ...item,
        addedAt: new Date(item.addedAt)
      }))
    } catch (error) {
      console.error('获取购物车数据失败:', error)
      return []
    }
  }

  // 添加商品到购物车
  addToCart(spot: SpotItem, ticket: SpotTicket, quantity: number = 1): boolean {
    try {
      const cartItems = this.getCartItems()
      const existingItemIndex = cartItems.findIndex(
        item => item.spotId === spot.id && item.ticketId === ticket.id
      )

      if (existingItemIndex >= 0) {
        // 如果商品已存在，更新数量
        cartItems[existingItemIndex].quantity += quantity
      } else {
        // 添加新商品
        const newItem: CartItem = {
          id: `${spot.id}_${ticket.id}_${Date.now()}`,
          spotId: spot.id,
          spotName: spot.name,
          spotImage: spot.picList[0] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop',
          ticketId: ticket.id,
          ticketType: ticket.type,
          ticketName: ticket.name,
          price: ticket.price,
          originalPrice: ticket.originalPrice,
          quantity,
          validDays: ticket.validDays,
          addedAt: new Date()
        }
        cartItems.push(newItem)
      }

      this.saveCartItems(cartItems)
      return true
    } catch (error) {
      console.error('添加到购物车失败:', error)
      return false
    }
  }

  // 更新购物车商品数量
  updateCartItem(itemId: string, quantity: number): boolean {
    try {
      const cartItems = this.getCartItems()
      const itemIndex = cartItems.findIndex(item => item.id === itemId)
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // 如果数量为0或负数，删除商品
          cartItems.splice(itemIndex, 1)
        } else {
          cartItems[itemIndex].quantity = quantity
        }
        
        this.saveCartItems(cartItems)
        return true
      }
      return false
    } catch (error) {
      console.error('更新购物车失败:', error)
      return false
    }
  }

  // 从购物车中删除商品
  removeFromCart(itemId: string): boolean {
    try {
      const cartItems = this.getCartItems()
      const filteredItems = cartItems.filter(item => item.id !== itemId)
      
      this.saveCartItems(filteredItems)
      return true
    } catch (error) {
      console.error('从购物车删除失败:', error)
      return false
    }
  }

  // 清空购物车
  clearCart(): boolean {
    try {
      localStorage.removeItem(this.storageKey)
      return true
    } catch (error) {
      console.error('清空购物车失败:', error)
      return false
    }
  }

  // 获取购物车汇总信息
  getCartSummary(): CartSummary {
    const items = this.getCartItems()
    
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const totalSavings = items.reduce((sum, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return sum + ((item.originalPrice - item.price) * item.quantity)
      }
      return sum
    }, 0)

    return {
      totalItems,
      totalPrice,
      totalSavings
    }
  }

  // 获取购物车中的商品数量
  getCartItemCount(): number {
    return this.getCartSummary().totalItems
  }

  // 检查商品是否在购物车中
  isInCart(spotId: string, ticketId: string): boolean {
    const items = this.getCartItems()
    return items.some(item => item.spotId === spotId && item.ticketId === ticketId)
  }

  // 获取特定商品在购物车中的数量
  getItemQuantity(spotId: string, ticketId: string): number {
    const items = this.getCartItems()
    const item = items.find(item => item.spotId === spotId && item.ticketId === ticketId)
    return item ? item.quantity : 0
  }

  // 保存购物车数据到localStorage
  private saveCartItems(items: CartItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items))
    } catch (error) {
      console.error('保存购物车数据失败:', error)
    }
  }

  // 根据景点ID获取购物车中的相关商品
  getCartItemsBySpot(spotId: string): CartItem[] {
    const items = this.getCartItems()
    return items.filter(item => item.spotId === spotId)
  }

  // 批量删除购物车商品
  removeBatch(itemIds: string[]): boolean {
    try {
      const cartItems = this.getCartItems()
      const filteredItems = cartItems.filter(item => !itemIds.includes(item.id))
      
      this.saveCartItems(filteredItems)
      return true
    } catch (error) {
      console.error('批量删除购物车商品失败:', error)
      return false
    }
  }
}

export const cartService = new CartService()
export default CartService
