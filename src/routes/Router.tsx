import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import SpotDetail from '../components/SpotDetail'
import Cart from '../components/Cart'
import Destinations from '../components/Destinations'
import Layout from '../components/Layout'
import AdminRoutes from './AdminRoutes'
import { 
  HomePage, 
  SearchPage, 
  SearchResultsPage, 
  BookingsPage, 
  WalletPage, 
  ProfilePage,
  LoginPage,
  RegisterPage,
  DestinationDetailPage,
  TravelHomepage,
  BookingPage
} from '../pages'

const Router = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleNavigate = (route: string, params?: Record<string, unknown>) => {
        if (params) {
        navigate(route, { state: params })
        } else {
        navigate(route)
        }
    }

    // 检查是否是管理员路由
    const isAdminRoute = location.pathname.startsWith('/admin')

    // 如果是管理员路由，直接返回管理员路由，不使用Layout
    if (isAdminRoute) {
        return <AdminRoutes />
    }

    // 普通用户路由使用Layout包裹
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route 
                path="/home" 
                element={<HomePage onNavigate={handleNavigate} />} 
                />
                <Route 
                path="/travel" 
                element={<TravelHomepage onNavigate={handleNavigate} />} 
                />
                <Route 
                path="/search" 
                element={<SearchPage onNavigate={handleNavigate} />} 
                />
                <Route 
                path="/search-results" 
                element={<SearchResultsPage onNavigate={handleNavigate} />} 
                />
                <Route 
                path="/destinations" 
                element={<Destinations />} 
                />
                <Route 
                path="/destination/:id" 
                element={<DestinationDetailPage onNavigate={handleNavigate} />} 
                />
                <Route 
                path="/spot/:id" 
                element={<SpotDetail />} 
                />
                <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
                />
                <Route 
                path="/booking" 
                element={<BookingPage onNavigate={handleNavigate} />} 
                />
                <Route 
                path="/bookings" 
                element={
                  <ProtectedRoute>
                    <BookingsPage onNavigate={handleNavigate} />
                  </ProtectedRoute>
                } 
                />
                <Route 
                path="/wallet" 
                element={
                  <ProtectedRoute>
                    <WalletPage onNavigate={handleNavigate} />
                  </ProtectedRoute>
                } 
                />
                <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage onNavigate={handleNavigate} />
                  </ProtectedRoute>
                } 
                />
                <Route 
                path="/login" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <LoginPage onNavigate={handleNavigate} />
                  </ProtectedRoute>
                } 
                />
                <Route 
                path="/register" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <RegisterPage onNavigate={handleNavigate} />
                  </ProtectedRoute>
                } 
                />
            </Routes>
        </Layout>
    )
}

export default Router
