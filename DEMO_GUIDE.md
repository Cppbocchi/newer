# 购票管理系统演示

## 系统功能演示

### 1. 景点浏览
**访问路径**: `/destinations`
- 展示20个热门景点
- 支持搜索和筛选（按城市、省份）
- 显示景点评分、价格、标签等信息

### 2. 景点详情页
**访问路径**: `/spot/{id}`
- 详细的景点信息展示
- 多种门票类型选择
- 购票数量选择
- 加入购物车和立即购买功能

### 3. 购物车管理
**访问路径**: `/cart`
- 查看所有已添加的门票
- 修改购买数量
- 删除不需要的商品
- 全选/取消全选功能
- 批量删除功能
- 实时价格计算

### 4. 用户购票流程

#### 步骤1: 浏览景点
1. 访问首页 `/home`，查看热门景点推荐
2. 点击"查看全部"或底部导航的"Spots"进入景点列表
3. 浏览景点列表，使用搜索和筛选功能找到感兴趣的景点

#### 步骤2: 查看景点详情
1. 点击任意景点卡片进入详情页
2. 查看景点的详细信息：
   - 基本信息：地址、开放时间、联系方式
   - 景点评分和评论数
   - 景点描述和标签
   - 门票信息列表

#### 步骤3: 选择门票
1. 在景点详情页选择门票类型：
   - 成人票
   - 学生票
   - 儿童票
   - 套票（如门票+索道）
2. 选择购买数量
3. 查看总价

#### 步骤4: 加入购物车
1. 点击"加入购物车"按钮
2. 系统显示"已添加到购物车"提示
3. 顶部导航栏购物车图标显示商品数量

#### 步骤5: 购物车管理
1. 点击顶部导航栏的购物车图标
2. 在购物车页面可以：
   - 查看所有已添加的商品
   - 使用复选框选择要购买的商品
   - 修改每个商品的数量
   - 删除不需要的商品
   - 查看总价和优惠信息

#### 步骤6: 结算购买
1. 选择要购买的商品
2. 查看订单详情和总价
3. 点击"结算"按钮
4. 系统模拟处理订单并显示成功提示

## 系统特色功能

### 1. 智能购物车
- **数量徽章**: 顶部导航栏购物车图标显示实时商品数量
- **状态同步**: 跨页面购物车状态实时同步
- **本地存储**: 购物车数据保存在本地，刷新页面不丢失

### 2. 多样化门票类型
- **成人票**: 标准门票价格
- **学生票**: 学生优惠价格
- **儿童票**: 儿童优惠价格
- **套票**: 门票+其他服务的组合优惠
- **免费门票**: 支持免费景点

### 3. 价格优惠显示
- **原价显示**: 显示门票原价
- **优惠价格**: 突出显示优惠后的价格
- **节省金额**: 计算并显示节省的金额

### 4. 响应式设计
- **移动端适配**: 针对手机屏幕优化的界面
- **桌面端布局**: 多列网格布局充分利用屏幕空间
- **触摸友好**: 按钮和交互元素适合触摸操作

## 测试数据说明

### 景点数据
系统包含20个热门景点的模拟数据：
- 故宫博物院、西湖、泰山、黄山等知名景点
- 每个景点包含详细信息和2-3种门票类型
- 价格范围从免费到几百元不等

### 门票类型示例
- **故宫博物院**: 成人票¥60、学生票¥30、儿童票¥20
- **西湖**: 游船票¥55、景区通票¥120
- **泰山**: 门票¥115、索道¥200、套票¥280
- **天安门广场**: 免费参观

### 购物车功能测试
1. 添加多个不同景点的门票到购物车
2. 测试数量修改功能
3. 测试选择/取消选择功能
4. 测试批量删除功能
5. 测试价格计算的准确性

## 开发技术说明

### 前端架构
- **React 18**: 使用最新的React版本和特性
- **TypeScript**: 类型安全的JavaScript
- **Vite**: 快速的开发构建工具

### 状态管理
- **React Context**: 用户认证状态管理
- **localStorage**: 购物车数据持久化
- **useState/useEffect**: 组件状态管理

### 样式设计
- **Tailwind CSS**: 实用优先的CSS框架
- **Ant Design**: 企业级UI组件库
- **Lucide React**: 现代化的图标库

### 数据服务
- **Mock数据**: 模拟真实API响应
- **Service层**: 封装数据访问逻辑
- **类型定义**: TypeScript接口定义

## 部署说明

### 开发环境
```bash
npm install
npm run dev
```

### 生产构建
```bash
npm run build
npm run preview
```

### 环境要求
- Node.js 18+
- npm 8+
- 现代浏览器（支持ES6+）

## 未来扩展

### 1. 后端集成
- 真实的API接口
- 数据库存储
- 用户认证系统

### 2. 支付功能
- 支付宝/微信支付
- 银行卡支付
- 订单状态跟踪

### 3. 增强功能
- 景点收藏
- 评论系统
- 优惠券系统
- 会员积分

### 4. 移动端优化
- PWA支持
- 离线功能
- 推送通知

这个购票管理系统提供了完整的用户购票体验，从景点浏览到购物车管理，再到最终结算，所有功能都经过精心设计和实现。
