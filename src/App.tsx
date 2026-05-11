import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth'
import LandingPage from './pages/LandingPage'
import ToastContainer from './components/notifications/ToastContainer'
import ConfirmModal from './components/notifications/ConfirmModal'
import AuthorLayout from './layouts/AuthorLayout'
import Dashboard from './pages/author/Dashboard'
import MyArticles from './pages/author/MyArticles'
import SubmitArticle from './pages/author/SubmitArticle'
import Notifications from './pages/author/Notifications'
import Drafts from './pages/author/Drafts'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAuthors from './pages/admin/AdminAuthors'
import AdminArticles from './pages/admin/AdminArticles'
import ReviewerLayout from './layouts/ReviewerLayout'
import ReviewerDashboard from './pages/reviewer/ReviewerDashboard'
import ReviewerArticles from './pages/reviewer/ReviewerArticles'
import ReviewerNotifications from './pages/reviewer/ReviewerNotifications'
import DeveloperLayout from './layouts/DeveloperLayout'
import DeveloperDashboard from './pages/developer/DeveloperDashboard'
import DeveloperIssues from './pages/developer/DeveloperIssues'
import ReaderLayout from './layouts/ReaderLayout'
import ReaderDashboard from './pages/reader/ReaderDashboard'
import ReaderPayments from './pages/reader/ReaderPayments'
import ReaderNotifications from './pages/reader/ReaderNotifications'
import ReaderSavedArticles from './pages/reader/ReaderSavedArticles'
import ReaderProfile from './pages/reader/ReaderProfile'
import GetSubscription from './pages/reader/GetSubscription'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import { SubscriptionProvider } from './utils/SubscriptionContext'

function App() {
  return (
    <div className="w-full min-h-screen">
      <ToastContainer />
      <ConfirmModal />
      <SubscriptionProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* ... existing routes ... */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Author Portal Routes */}
          <Route path="/author" element={
            <ProtectedRoute allowedRole="author">
              <AuthorLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/author/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="articles" element={<MyArticles />} />
            <Route path="submit" element={<SubmitArticle />} />
            <Route path="drafts" element={<Drafts />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Portal Routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="authors" element={<AdminAuthors />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Reviewer Portal Routes */}
          <Route path="/reviewer-dashboard" element={
            <ProtectedRoute allowedRole="reviewer">
              <ReviewerLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ReviewerDashboard />} />
            <Route path="articles" element={<ReviewerArticles />} />
            <Route path="notifications" element={<ReviewerNotifications />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Developer Portal Routes */}
          <Route path="/developer-dashboard" element={
            <ProtectedRoute allowedRole="developer">
              <DeveloperLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DeveloperDashboard />} />
            <Route path="issues" element={<DeveloperIssues />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Reader Portal Routes */}
          <Route path="/reader-dashboard" element={
            <ProtectedRoute allowedRole="reader">
              <ReaderLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ReaderDashboard />} />
            <Route path="payments" element={<ReaderPayments />} />
            <Route path="notifications" element={<ReaderNotifications />} />
            <Route path="saved" element={<ReaderSavedArticles />} />
            <Route path="get-subscription" element={<GetSubscription />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </SubscriptionProvider>
    </div>
  )
}

export default App
