
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
  reviewReason?: string;
  publishedAt?: string;
  submittedForReview?: boolean;
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
  courseId: number;
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
  courseId?: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  type: string;
}

interface CourseContextType {
  courses: Course[];
  deletionRequests: DeletionRequest[];
  pendingReviews: ReviewItem[];
  recentActions: RecentAction[];
  achievements: Achievement[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: number, updates: Partial<Course>) => void;
  publishCourse: (courseId: number) => void;
  requestDeletion: (courseId: number, requestedBy: string, reason?: string) => void;
  approveDeletion: (requestId: number) => void;
  rejectDeletion: (requestId: number) => void;
  directDelete: (courseId: number) => void;
  addRecentAction: (action: RecentAction) => void;
  updateReviewStatus: (courseId: number, status: string, reason?: string) => void;
  enrollStudentInCourse: (courseId: number) => void;
  completeStudentCourse: (courseId: number) => void;
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
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
      lastUpdated: "2024-05-20",
      publishedAt: "2024-05-15"
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
      lastUpdated: "2024-05-18",
      submittedForReview: true
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
      lastUpdated: "2024-05-15",
      publishedAt: "2024-05-10"
    }
  ]);

  const [deletionRequests, setDeletionRequests] = useState<DeletionRequest[]>([]);
  
  const [pendingReviews, setPendingReviews] = useState<ReviewItem[]>([
    {
      id: 2,
      courseId: 2,
      title: "Advanced React Patterns",
      instructor: "Code Master Academy",
      submittedDate: "2024-05-18",
      type: "Course",
      priority: "High"
    }
  ]);

  const [recentActions, setRecentActions] = useState<RecentAction[]>([
    {
      id: 1,
      action: "Approved course: Full Stack Development",
      user: "Admin",
      time: "2 hours ago",
      type: "approved",
      courseId: 1
    },
    {
      id: 2,
      action: "Submitted course for review: Advanced React Patterns",
      user: "Code Master Academy",
      time: "4 hours ago",
      type: "submitted",
      courseId: 2
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "First Course Completed",
      description: "Congratulations on completing your first course! This is just the beginning of your learning journey.",
      icon: "trophy",
      earnedDate: "2024-05-20",
      type: "completion"
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "You completed a course in record time! Your dedication to learning is impressive.",
      icon: "zap",
      earnedDate: "2024-05-18",
      type: "speed"
    },
    {
      id: 3,
      title: "Knowledge Seeker",
      description: "You've enrolled in 5 courses! Your thirst for knowledge knows no bounds.",
      icon: "book-open",
      earnedDate: "2024-05-15",
      type: "enrollment"
    }
  ]);

  // Mock enrolled and completed courses for student
  const [enrolledCourses] = useState([1, 2]);
  const [completedCourses] = useState([3]);

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
      type: "created",
      courseId: course.id
    });
  };

  const updateCourse = (id: number, updates: Partial<Course>) => {
    setCourses(prev => prev.map(course => 
      course.id === id 
        ? { ...course, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
        : course
    ));
  };

  const publishCourse = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    updateCourse(courseId, { 
      status: 'Under Review', 
      submittedForReview: true,
      publishedAt: new Date().toISOString().split('T')[0]
    });

    // Add to pending reviews
    const reviewItem: ReviewItem = {
      id: Date.now(),
      courseId,
      title: course.title,
      instructor: "Current User",
      submittedDate: new Date().toISOString().split('T')[0],
      type: "Course",
      priority: "Medium"
    };
    setPendingReviews(prev => [...prev, reviewItem]);
    
    addRecentAction({
      id: Date.now(),
      action: `Submitted course for review: ${course.title}`,
      user: "Current User",
      time: "Just now",
      type: "submitted",
      courseId
    });
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
      type: "deletion_request",
      courseId
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
      type: "approved",
      courseId: request.courseId
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
      type: "rejected",
      courseId: request.courseId
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
      type: "deleted",
      courseId
    });
  };

  const addRecentAction = (action: RecentAction) => {
    setRecentActions(prev => [action, ...prev.slice(0, 9)]); // Keep only last 10 actions
  };

  const updateReviewStatus = (courseId: number, status: string, reason?: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Remove from pending reviews
    setPendingReviews(prev => prev.filter(review => 
      review.courseId !== courseId
    ));

    // Update course status
    updateCourse(courseId, { 
      status: status as Course['status'],
      reviewReason: reason,
      submittedForReview: false
    });
    
    addRecentAction({
      id: Date.now(),
      action: `${status} course: ${course.title}${reason ? ` - ${reason}` : ''}`,
      user: "Admin",
      time: "Just now",
      type: status.toLowerCase().replace(' ', '_'),
      courseId
    });
  };

  const enrollStudentInCourse = (courseId: number) => {
    updateCourse(courseId, {
      students: courses.find(c => c.id === courseId)?.students + 1 || 1
    });
  };

  const completeStudentCourse = (courseId: number) => {
    // Add completion achievement
    addAchievement({
      title: "Course Completed",
      description: "You've successfully completed another course! Keep up the great work.",
      icon: "check-circle",
      earnedDate: new Date().toISOString().split('T')[0],
      type: "completion"
    });
  };

  const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
    const newAchievement: Achievement = {
      ...achievement,
      id: Math.max(...achievements.map(a => a.id), 0) + 1
    };
    setAchievements(prev => [newAchievement, ...prev]);
  };

  return (
    <CourseContext.Provider value={{
      courses,
      deletionRequests,
      pendingReviews,
      recentActions,
      achievements,
      addCourse,
      updateCourse,
      publishCourse,
      requestDeletion,
      approveDeletion,
      rejectDeletion,
      directDelete,
      addRecentAction,
      updateReviewStatus,
      enrollStudentInCourse,
      completeStudentCourse,
      addAchievement
    }}>
      {children}
    </CourseContext.Provider>
  );
};
