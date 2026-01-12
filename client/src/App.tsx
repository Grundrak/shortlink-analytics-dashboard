import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { CreateLinkPage } from './pages/links/CreateLinkPage';
import { LinksPage } from './pages/links/LinksPage';
import { UpdateLinkPage } from './pages/links/UpdateLinkPage';
import { LinkAnalyticsPage } from './pages/analytics/LinkAnalyticsPage';
import { LinkDetailsPage } from './pages/analytics/LinkDetailsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RedirectHandler } from './pages/RedirectHandler';
import { useAuthStore } from './stores/authStore';

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, token } = useAuthStore();
  
  if (!user || !token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow bg-gray-50">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/links" 
                element={
                  <ProtectedRoute>
                    <LinksPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/links/create" 
                element={
                  <ProtectedRoute>
                    <CreateLinkPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/links/edit/:shortCode" 
                element={
                  <ProtectedRoute>
                    <UpdateLinkPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics/:id" 
                element={
                  <ProtectedRoute>
                    <LinkDetailsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <LinkAnalyticsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />

              {/* Redirect Handler (Must be before 404) */}
              <Route path="/:shortCode" element={<RedirectHandler />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;