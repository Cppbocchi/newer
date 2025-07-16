# Ticketing App - React Router 实现

这个项目已经成功将原本的单页面应用拆分为多个页面组件，并配置了 React Router 来实现页面跳转。

## 项目结构

```
src/
├── components/           # 可复用组件
│   ├── BottomNavigation.tsx  # 底部导航栏组件
│   ├── Layout.tsx           # 主布局组件
│   └── SearchForm.tsx       # 搜索表单组件
├── pages/               # 页面组件
│   ├── HomePage.tsx         # 首页
│   ├── SearchPage.tsx       # 搜索页面
│   ├── SearchResultsPage.tsx # 搜索结果页面
│   ├── BookingsPage.tsx     # 预订页面
│   ├── WalletPage.tsx       # 钱包页面
│   ├── ProfilePage.tsx      # 个人资料页面
│   └── index.ts            # 页面导出索引
├── data/                # 数据文件
│   └── destinations.ts      # 目的地数据
├── App.tsx              # 主应用组件（路由配置）
└── main.tsx            # 应用入口点
```

## 路由配置

### 主要路由

- `/` 或 `/home` - 首页
- `/search` - 搜索页面
- `/search-results` - 搜索结果页面
- `/bookings` - 我的预订
- `/wallet` - 钱包
- `/profile` - 个人资料

### 路由参数传递

页面之间可以通过以下方式传递参数：

```typescript
// 导航并传递参数
onNavigate('/search-results', {
  from: 'New York',
  to: 'London',
  serviceType: 'flight',
  departureDate: '2024-01-15'
})

// 在目标页面接收参数
function SearchResultsPage({ searchParams }) {
  const from = searchParams?.from || 'Default From'
  const to = searchParams?.to || 'Default To'
  // ...
}
```

## 主要功能

### 1. 首页 (HomePage)
- 搜索表单
- 服务类型选择（航班、火车、酒店、巴士）
- 最近搜索记录
- 热门目的地
- 点击服务类型可跳转到搜索页面
- 点击最近搜索可跳转到搜索结果页面

### 2. 搜索页面 (SearchPage)
- 服务类型选择器
- 搜索表单
- 热门路线推荐
- 支持接收来自首页的服务类型参数

### 3. 搜索结果页面 (SearchResultsPage)
- 显示搜索条件
- 筛选选项
- 结果列表（根据服务类型显示不同的卡片）
- 支持航班、火车、酒店、巴士的不同展示格式

### 4. 底部导航 (BottomNavigation)
- 五个主要页面的快速导航
- 当前页面高亮显示
- 自动与路由状态同步

### 5. 布局组件 (Layout)
- 统一的页面布局
- 固定的底部导航
- 响应式设计

## 技术栈

- **React 18** - 用户界面库
- **React Router DOM** - 客户端路由
- **Ant Design** - UI 组件库
- **Lucide React** - 图标库
- **TypeScript** - 类型安全
- **Vite** - 构建工具

## 启动项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 主要改进

### 1. 模块化结构
- 将单个大组件拆分为多个小页面
- 每个页面职责明确，易于维护
- 组件复用性更好

### 2. 路由管理
- 使用 React Router 实现客户端路由
- 支持浏览器前进/后退按钮
- URL 状态管理

### 3. 参数传递
- 页面间可以传递复杂参数
- 搜索条件可以在页面间保持
- 支持深链接

### 4. 用户体验
- 底部导航与路由联动
- 页面切换流畅
- 保持应用状态

## 未来扩展

这个结构为以后的功能扩展提供了良好的基础：

1. **添加新页面** - 在 `pages/` 目录下创建新组件，在 `App.tsx` 中添加路由
2. **页面级状态管理** - 可以轻松集成 Redux 或 Context API
3. **懒加载** - 可以实现页面级别的代码分割
4. **嵌套路由** - 支持更复杂的页面结构
5. **路由守卫** - 可以添加身份验证和权限控制

这个重构显著提高了应用的可维护性和可扩展性，为构建更大型的票务应用奠定了坚实的基础。
