
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  category: string;
  instructor?: string;
  duration?: string;
  level?: string;
}

interface EnrollmentContextType {
  enrolledCourses: Course[];
  enrollInCourse: (course: Course) => void;
  unenrollFromCourse: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  // Load enrolled courses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEnrolledCourses(parsed);
      } catch (error) {
        console.error('Error loading enrolled courses:', error);
        // Initialize with sample data if loading fails
        setEnrolledCourses([
          {
            id: 1,
            title: "React Fundamentals",
            description: "Learn the basics of React development",
            progress: 75,
            category: "Web Development",
            instructor: "John Doe",
            duration: "4 hours",
            level: "Beginner"
          },
          {
            id: 2,
            title: "JavaScript Advanced",
            description: "Master advanced JavaScript concepts",
            progress: 60,
            category: "Programming",
            instructor: "Jane Smith",
            duration: "6 hours",
            level: "Advanced"
          },
          {
            id: 3,
            title: "Node.js Basics",
            description: "Server-side development with Node.js",
            progress: 30,
            category: "Backend",
            instructor: "Mike Johnson",
            duration: "5 hours",
            level: "Intermediate"
          }
        ]);
      }
    } else {
      // Initialize with sample data for new users
      setEnrolledCourses([
        {
          id: 1,
          title: "React Fundamentals",
          description: "Learn the basics of React development",
          progress: 75,
          category: "Web Development",
          instructor: "John Doe",
          duration: "4 hours",
          level: "Beginner"
        },
        {
          id: 2,
          title: "JavaScript Advanced",
          description: "Master advanced JavaScript concepts",
          progress: 60,
          category: "Programming",
          instructor: "Jane Smith",
          duration: "6 hours",
          level: "Advanced"
        },
        {
          id: 3,
          title: "Node.js Basics",
          description: "Server-side development with Node.js",
          progress: 30,
          category: "Backend",
          instructor: "Mike Johnson",
          duration: "5 hours",
          level: "Intermediate"
        }
      ]);
    }
  }, []);

  // Save to localStorage whenever enrolledCourses changes
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const enrollInCourse = (course: Course) => {
    setEnrolledCourses(prev => {
      const isAlreadyEnrolled = prev.some(c => c.id === course.id);
      if (!isAlreadyEnrolled) {
        return [...prev, { ...course, progress: 0 }];
      }
      return prev;
    });
  };

  const unenrollFromCourse = (courseId: number) => {
    setEnrolledCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const isEnrolled = (courseId: number) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  return (
    <EnrollmentContext.Provider value={{ enrolledCourses, enrollInCourse, unenrollFromCourse, isEnrolled }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
};
