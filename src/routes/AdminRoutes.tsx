import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { AdminDashboard, UserManagement, OrderManagement } from '../pages/admin'

const AdminRoutes: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/refunds" element={<div>退票管理功能开发中...</div>} />
        <Route path="/admin/spots" element={<div>景点管理功能开发中...</div>} />
        <Route path="/admin/reports" element={<div>报表统计功能开发中...</div>} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminRoutes
