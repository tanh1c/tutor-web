import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './components/ui/Toast';
import { isAuthenticated } from './utils/helpers';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserProfile from './pages/UserProfile';
import TutorSearchPage from './pages/TutorSearchPage';
import TutorProfilePage from './pages/TutorProfilePage';
import SchedulingPage from './pages/SchedulingPage';
import SchedulePage from './pages/SchedulePage';
import SessionManagementPage from './pages/SessionManagementPage';
import FeedbackPage from './components/feedback/FeedbackPage';
import AIFeatures from './pages/AIFeatures';
import Community from './pages/Community';
import Notifications from './pages/Notifications';
import ManageTutorsPage from './pages/ManageTutorsPage';
import UsersManagementPage from './pages/UsersManagementPage';
import SystemManagementPage from './pages/SystemManagementPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  console.log('App component rendering...');
  
  try {
    return (
      <UserProvider>
        <ToastProvider>
          <Router>
            <div className="App">
              <Routes>
              {/* Public routes */}
              <Route 
                path="/login" 
                element={<LoginPage />} 
              />
              
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
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/profile/:userId" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />

            <Route 
              path="/ai-features" 
              element={
                <ProtectedRoute>
                  <AIFeatures />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/community" 
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } 
            />

            {/* Role-specific routes will be added later */}
            <Route 
              path="/tutors" 
              element={
                <ProtectedRoute>
                  <TutorSearchPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/tutors/:id" 
              element={
                <ProtectedRoute>
                  <TutorProfilePage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/find-tutors" 
              element={
                <ProtectedRoute requiredRole="student">
                  <TutorSearchPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/sessions" 
              element={
                <ProtectedRoute>
                  <SessionManagementPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/session-management" 
              element={
                <ProtectedRoute>
                  <SessionManagementPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/schedule" 
              element={
                <ProtectedRoute>
                  <SchedulePage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/my-sessions" 
              element={
                <ProtectedRoute requiredRole="student">
                  <SchedulingPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/teaching-schedule" 
              element={
                <ProtectedRoute requiredRole="tutor">
                  <SchedulingPage />
                </ProtectedRoute>
              } 
            />

            {/* Feedback & Evaluation Routes */}
            <Route 
              path="/feedback" 
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/evaluations" 
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/progress-reports" 
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/tutor-ratings" 
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/ai-suggestions" 
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/manage-tutors" 
              element={
                <ProtectedRoute requiredRole="coordinator">
                  <ManageTutorsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <UsersManagementPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/system-management" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <SystemManagementPage />
                </ProtectedRoute>
              } 
            />

            {/* Default redirect */}
            <Route 
              path="/" 
              element={
                <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />
              } 
            />
            
            {/* Catch all route */}
            <Route 
              path="*" 
              element={
                <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />
              } 
            />
          </Routes>
        </div>
      </Router>
      </ToastProvider>
    </UserProvider>
  );
  } catch (error) {
    console.error('App rendering error:', error);
    return <div>Error loading application. Check console for details.</div>;
  }
}

export default App;
