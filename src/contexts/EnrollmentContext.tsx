
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnrollmentContextType {
  enrolledCourses: number[];
  enrollInCourse: (courseId: number) => void;
  unenrollFromCourse: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

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
