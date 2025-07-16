import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import { 
  HomePage, 
  SearchPage, 
  SearchResultsPage, 
  BookingsPage, 
  WalletPage, 
  ProfilePage,
  LoginPage,
  RegisterPage
} from '../pages'

const Router = () => {
    const navigate = useNavigate()

    const handleNavigate = (route: string, params?: Record<string, unknown>) => {
        if (params) {
        navigate(route, { state: params })
        } else {
        navigate(route)
        }
    }

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route 
            path="/home" 
            element={<HomePage onNavigate={handleNavigate} />} 
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
    )
}

export default Router
