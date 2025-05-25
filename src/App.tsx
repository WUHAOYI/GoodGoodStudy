
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/course-management/:id" element={<CourseManagement />} />
          <Route path="/content-review/:id" element={<ContentReview />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/for-business" element={<ForBusiness />} />
          <Route path="/teach" element={<TeachOnPlatform />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
