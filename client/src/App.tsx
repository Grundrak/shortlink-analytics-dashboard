import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { CreateLinkPage } from './pages/links/CreateLinkPage';
import { LinksPage } from './pages/links/LinksPage';
import { LinkAnalyticsPage } from './pages/analytics/LinkAnalyticsPage';
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
                path="/analytics/:id" 
                element={
                  <ProtectedRoute>
                    <LinkAnalyticsPage />
                  </ProtectedRoute>
                } 
              />
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