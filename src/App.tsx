
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EnrollmentProvider } from "@/contexts/EnrollmentContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { TeacherApplicationProvider } from "@/contexts/TeacherApplicationContext";
import { CourseProvider } from "@/contexts/CourseContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import ContinueLearning from "./pages/ContinueLearning";
import Wishlist from "./pages/Wishlist";
import Categories from "./pages/Categories";
import ForBusiness from "./pages/ForBusiness";
import TeachOnPlatform from "./pages/TeachOnPlatform";
import Analytics from "./pages/Analytics";
import TeacherManagement from "./pages/TeacherManagement";
import ContentReview from "./pages/ContentReview";
import CourseManagement from "./pages/CourseManagement";
import ResourceManagement from "./pages/ResourceManagement";
import Security from "./pages/Security";
import LearningGoals from "./pages/LearningGoals";
import CourseRequest from "./pages/CourseRequest";
import NotFound from "./pages/NotFound";
import FreeTrial from "./pages/FreeTrial";
import ScheduleDemo from "./pages/ScheduleDemo";
import ContactSales from "./pages/ContactSales";
import HowItWorks from "./pages/HowItWorks";
import InstructorApplication from "./pages/InstructorApplication";
import Pricing from "./pages/Pricing";
import StudentManagement from "./components/StudentManagement";
import StudentDetails from "./pages/StudentDetails";
import StudentAnalytics from "./pages/StudentAnalytics";
import StudentPerformance from "./pages/StudentPerformance";
import ActivityManagement from "./pages/ActivityManagement";
import AIAssistant from "./pages/AIAssistant";
import QuizManagement from "./pages/QuizManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <EnrollmentProvider>
            <WishlistProvider>
              <TeacherApplicationProvider>
                <CourseProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:id" element={<CourseDetails />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/for-business" element={<ForBusiness />} />
                    <Route path="/free-trial" element={<FreeTrial />} />
                    <Route path="/schedule-demo" element={<ScheduleDemo />} />
                    <Route path="/contact-sales" element={<ContactSales />} />
                    <Route path="/teach" element={<TeachOnPlatform />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/instructor-application" element={<InstructorApplication />} />
                    <Route path="/pricing" element={<Pricing />} />
                    
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
                    <Route path="/course-management/new" element={
                      <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                        <CourseManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/course-management" element={
                      <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                        <CourseManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/payment" element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <Payment />
                      </ProtectedRoute>
                    } />
                    <Route path="/payment-success" element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <PaymentSuccess />
                      </ProtectedRoute>
                    } />
                    <Route path="/continue-learning" element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <ContinueLearning />
                      </ProtectedRoute>
                    } />
                    <Route path="/wishlist" element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <Wishlist />
                      </ProtectedRoute>
                    } />
                    <Route path="/analytics" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Analytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/teacher-management" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <TeacherManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/student-management" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <StudentManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/content-review" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <ContentReview />
                      </ProtectedRoute>
                    } />
                    <Route path="/resource-management" element={
                      <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                        <ResourceManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/security" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Security />
                      </ProtectedRoute>
                    } />
                    <Route path="/learning-goals" element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <LearningGoals />
                      </ProtectedRoute>
                    } />
                    <Route path="/course-request" element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <CourseRequest />
                      </ProtectedRoute>
                    } />
                    <Route path="/activity-management" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <ActivityManagement />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/student-details/:id" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <StudentDetails />
                      </ProtectedRoute>
                    } />
                    <Route path="/student-analytics" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <StudentAnalytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/student-performance" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <StudentPerformance />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </CourseProvider>
              </TeacherApplicationProvider>
            </WishlistProvider>
          </EnrollmentProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
