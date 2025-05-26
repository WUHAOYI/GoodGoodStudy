
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EnrollmentContextType {
  enrolledCourses: number[];
  enrollInCourse: (courseId: number) => void;
  unenrollFromCourse: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  // Load enrolled courses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEnrolledCourses(parsed);
      } catch (error) {
        console.error('Error loading enrolled courses:', error);
      }
    }
  }, []);

  // Save to localStorage whenever enrolledCourses changes
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const enrollInCourse = (courseId: number) => {
    setEnrolledCourses(prev => {
      if (!prev.includes(courseId)) {
        return [...prev, courseId];
      }
      return prev;
    });
  };

  const unenrollFromCourse = (courseId: number) => {
    setEnrolledCourses(prev => prev.filter(id => id !== courseId));
  };

  const isEnrolled = (courseId: number) => {
    return enrolledCourses.includes(courseId);
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
