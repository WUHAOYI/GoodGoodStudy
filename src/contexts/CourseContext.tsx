
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  level: string;
  category: string;
  duration: string;
  language: string;
  status: 'Draft' | 'Published' | 'Under Review' | 'Pending Deletion';
  students: number;
  revenue: number;
  rating: number;
  lastUpdated: string;
  deletionRequested?: boolean;
  deletionRequestedBy?: string;
}

interface DeletionRequest {
  id: number;
  courseId: number;
  courseTitle: string;
  requestedBy: string;
  requestedAt: string;
  reason?: string;
}

interface ReviewItem {
  id: number;
  title: string;
  instructor: string;
  submittedDate: string;
  type: string;
  priority: string;
}

interface RecentAction {
  id: number;
  action: string;
  user: string;
  time: string;
  type: string;
}

interface CourseContextType {
  courses: Course[];
  deletionRequests: DeletionRequest[];
  pendingReviews: ReviewItem[];
  recentActions: RecentAction[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: number, updates: Partial<Course>) => void;
  requestDeletion: (courseId: number, requestedBy: string, reason?: string) => void;
  approveDeletion: (requestId: number) => void;
  rejectDeletion: (requestId: number) => void;
  directDelete: (courseId: number) => void;
  addRecentAction: (action: RecentAction) => void;
  updateReviewStatus: (courseId: number, status: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Full Stack Web Development Bootcamp",
      description: "Master full-stack web development with our comprehensive bootcamp.",
      price: 299,
      level: "Beginner",
      category: "programming",
      duration: "40 hours",
      language: "English",
      status: "Published",
      students: 1245,
      revenue: 29900,
      rating: 4.8,
      lastUpdated: "2024-05-20"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      description: "Learn advanced React patterns and best practices.",
      price: 199,
      level: "Intermediate",
      category: "programming",
      duration: "20 hours",
      language: "English",
      status: "Under Review",
      students: 890,
      revenue: 17800,
      rating: 4.7,
      lastUpdated: "2024-05-18"
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      description: "Build a solid foundation in JavaScript programming.",
      price: 0,
      level: "Beginner",
      category: "programming",
      duration: "15 hours",
      language: "English",
      status: "Published",
      students: 2340,
      revenue: 0,
      rating: 4.6,
      lastUpdated: "2024-05-15"
    }
  ]);

  const [deletionRequests, setDeletionRequests] = useState<DeletionRequest[]>([]);
  
  const [pendingReviews, setPendingReviews] = useState<ReviewItem[]>([
    {
      id: 1,
      title: "Advanced Python Programming",
      instructor: "Code Master Academy",
      submittedDate: "2024-05-22",
      type: "Course",
      priority: "High"
    },
    {
      id: 2,
      title: "Digital Marketing Strategy",
      instructor: "Marketing Experts",
      submittedDate: "2024-05-21",
      type: "Course",
      priority: "Medium"
    }
  ]);

  const [recentActions, setRecentActions] = useState<RecentAction[]>([
    {
      id: 1,
      action: "Approved course: Full Stack Development",
      user: "Tech Academy",
      time: "2 hours ago",
      type: "approved"
    },
    {
      id: 2,
      action: "Rejected course: Basic HTML",
      user: "Web Basics",
      time: "4 hours ago",
      type: "rejected"
    }
  ]);

  const addCourse = (newCourse: Omit<Course, 'id'>) => {
    const course: Course = {
      ...newCourse,
      id: Math.max(...courses.map(c => c.id), 0) + 1,
      students: 0,
      revenue: 0,
      rating: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setCourses(prev => [...prev, course]);
    
    addRecentAction({
      id: Date.now(),
      action: `Created new course: ${course.title}`,
      user: "Current User",
      time: "Just now",
      type: "created"
    });
  };

  const updateCourse = (id: number, updates: Partial<Course>) => {
    setCourses(prev => prev.map(course => 
      course.id === id 
        ? { ...course, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
        : course
    ));
  };

  const requestDeletion = (courseId: number, requestedBy: string, reason?: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const request: DeletionRequest = {
      id: Date.now(),
      courseId,
      courseTitle: course.title,
      requestedBy,
      requestedAt: new Date().toISOString().split('T')[0],
      reason
    };

    setDeletionRequests(prev => [...prev, request]);
    updateCourse(courseId, { status: 'Pending Deletion', deletionRequested: true, deletionRequestedBy: requestedBy });
    
    addRecentAction({
      id: Date.now(),
      action: `Requested deletion for course: ${course.title}`,
      user: requestedBy,
      time: "Just now",
      type: "deletion_request"
    });
  };

  const approveDeletion = (requestId: number) => {
    const request = deletionRequests.find(r => r.id === requestId);
    if (!request) return;

    setCourses(prev => prev.filter(course => course.id !== request.courseId));
    setDeletionRequests(prev => prev.filter(r => r.id !== requestId));
    
    addRecentAction({
      id: Date.now(),
      action: `Approved deletion for course: ${request.courseTitle}`,
      user: "Admin",
      time: "Just now",
      type: "approved"
    });
  };

  const rejectDeletion = (requestId: number) => {
    const request = deletionRequests.find(r => r.id === requestId);
    if (!request) return;

    updateCourse(request.courseId, { 
      status: 'Published', 
      deletionRequested: false, 
      deletionRequestedBy: undefined 
    });
    setDeletionRequests(prev => prev.filter(r => r.id !== requestId));
    
    addRecentAction({
      id: Date.now(),
      action: `Rejected deletion for course: ${request.courseTitle}`,
      user: "Admin",
      time: "Just now",
      type: "rejected"
    });
  };

  const directDelete = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setCourses(prev => prev.filter(c => c.id !== courseId));
    
    addRecentAction({
      id: Date.now(),
      action: `Directly deleted course: ${course.title}`,
      user: "Admin",
      time: "Just now",
      type: "deleted"
    });
  };

  const addRecentAction = (action: RecentAction) => {
    setRecentActions(prev => [action, ...prev.slice(0, 9)]); // Keep only last 10 actions
  };

  const updateReviewStatus = (courseId: number, status: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Remove from pending reviews
    setPendingReviews(prev => prev.filter(review => 
      review.title !== course.title
    ));

    // Update course status
    updateCourse(courseId, { status: status as Course['status'] });
    
    addRecentAction({
      id: Date.now(),
      action: `${status} course: ${course.title}`,
      user: "Admin",
      time: "Just now",
      type: status.toLowerCase()
    });
  };

  return (
    <CourseContext.Provider value={{
      courses,
      deletionRequests,
      pendingReviews,
      recentActions,
      addCourse,
      updateCourse,
      requestDeletion,
      approveDeletion,
      rejectDeletion,
      directDelete,
      addRecentAction,
      updateReviewStatus
    }}>
      {children}
    </CourseContext.Provider>
  );
};
