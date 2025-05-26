
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CourseProvider } from "@/contexts/CourseContext";
import { EnrollmentProvider } from "@/contexts/EnrollmentContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { TeacherApplicationProvider } from "@/contexts/TeacherApplicationContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Categories from "./pages/Categories";
import ForBusiness from "./pages/ForBusiness";
import TeachOnPlatform from "./pages/TeachOnPlatform";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseManagement from "./pages/CourseManagement";
import ContentReview from "./pages/ContentReview";
import ContinueLearning from "./pages/ContinueLearning";
import LearningGoals from "./pages/LearningGoals";
import CourseRequest from "./pages/CourseRequest";
import TeacherManagement from "./pages/TeacherManagement";
import ResourceManagement from "./pages/ResourceManagement";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <EnrollmentProvider>
          <WishlistProvider>
            <TeacherApplicationProvider>
              <CourseProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:id" element={<CourseDetails />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/for-business" element={<ForBusiness />} />
                    <Route path="/teach" element={<TeachOnPlatform />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/continue-learning" element={<ContinueLearning />} />
                    <Route path="/learning-goals" element={<LearningGoals />} />
                    <Route path="/course-request" element={<CourseRequest />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    
                    {/* Protected Routes */}
                    <Route path="/student-dashboard" element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <StudentDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/teacher-dashboard" element={
                      <ProtectedRoute allowedRoles={['teacher']}>
                        <TeacherDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin-dashboard" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/course-management/:id" element={
                      <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                        <CourseManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/content-review/:id" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <ContentReview />
                      </ProtectedRoute>
                    } />
                    <Route path="/teacher-management" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <TeacherManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/resource-management" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <ResourceManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/analytics" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Analytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/security" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Security />
                      </ProtectedRoute>
                    } />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </CourseProvider>
            </TeacherApplicationProvider>
          </WishlistProvider>
        </EnrollmentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
