import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const DashboardPlaceholder = () => <div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1><p>Welcome to AnverraGlobal Platform.</p></div>;

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
                      <Route element={<AppLayout />}>
                        <Route path="/" element={<DashboardPlaceholder />} />
                        <Route path="/500" element={<ServerErrorPage />} />
                        <Route path="/403" element={<ForbiddenPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Route>
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
