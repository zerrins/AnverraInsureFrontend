import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { NotFoundPage } from './pages/error/NotFoundPage';
import { ServerErrorPage } from './pages/error/ServerErrorPage';
import { ForbiddenPage } from './pages/error/ForbiddenPage';
import { LoadingPage } from './pages/loading/LoadingPage';
import { ThemeProvider } from './providers/ThemeProvider';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { ToastProvider } from './providers/ToastProvider';
import { DialogProvider } from './providers/DialogProvider';
import { DrawerProvider } from './providers/DrawerProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';
import SessionExpiredPage from './pages/auth/SessionExpiredPage';
import MyProfilePage from './pages/profile/MyProfilePage';

const DashboardPlaceholder = () => <div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1><p>Welcome to AnverraGlobal Platform.</p></div>;

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <ToastProvider>
          <DialogProvider>
            <DrawerProvider>
              <NotificationProvider>
                <BrowserRouter>
                  <Suspense fallback={<LoadingPage />}>
                    <Routes>
                      {/* Public Auth Routes */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/session-expired" element={<SessionExpiredPage />} />

                      {/* Protected Routes inside AppLayout */}
                      <Route element={<ProtectedRoute />}>
                        <Route element={<AppLayout />}>
                          <Route path="/" element={<DashboardPlaceholder />} />
                          <Route path="/profile" element={<MyProfilePage />} />
                        </Route>
                      </Route>
                      
                      {/* Error Routes */}
                      <Route path="/500" element={<ServerErrorPage />} />
                      <Route path="/403" element={<ForbiddenPage />} />
                      <Route path="/unauthorized" element={<UnauthorizedPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </NotificationProvider>

            </DrawerProvider>
          </DialogProvider>
        </ToastProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default App;
