
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  category: string;
  price: number;
  rating: number;
  students: number;
  thumbnail: string;
  features: string[];
  curriculum: Array<{
    id: number;
    title: string;
    duration: string;
    videoUrl?: string;
    completed?: boolean;
  }>;
  status?: string;
  language?: string;
  lastUpdated?: string;
}

interface CourseContextType {
  courses: Course[];
  getCourseById: (id: number) => Course | undefined;
  addCourse: (course: Course) => void;
  updateCourse: (id: number, updates: Partial<Course>) => void;
  deleteCourse: (id: number) => void;
  updateReviewStatus: (id: number, status: string, reason?: string) => void;
  publishCourse: (id: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const sampleCourses: Course[] = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the basics of React development with hands-on projects and real-world examples.",
    instructor: "John Doe",
    duration: "4 hours",
    level: "Beginner",
    category: "Web Development",
    price: 99,
    rating: 4.8,
    students: 1250,
    thumbnail: "/placeholder.svg",
    features: ["Lifetime access", "Certificate of completion", "30-day money-back guarantee"],
    curriculum: [
      { id: 1, title: "Introduction to React", duration: "15 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
      { id: 2, title: "Components and Props", duration: "20 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" },
      { id: 3, title: "State and Lifecycle", duration: "25 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    title: "JavaScript Advanced",
    description: "Master advanced JavaScript concepts including closures, prototypes, and async programming.",
    instructor: "Jane Smith",
    duration: "6 hours",
    level: "Advanced",
    category: "Programming",
    price: 149,
    rating: 4.9,
    students: 890,
    thumbnail: "/placeholder.svg",
    features: ["Advanced techniques", "Real-world projects", "Expert instructor"],
    curriculum: [
      { id: 1, title: "Closures and Scope", duration: "30 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
      { id: 2, title: "Prototypes and Inheritance", duration: "35 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" },
      { id: 3, title: "Async Programming", duration: "40 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-20"
  },
  {
    id: 3,
    title: "Node.js Basics",
    description: "Build server-side applications with Node.js and Express framework.",
    instructor: "Mike Johnson",
    duration: "5 hours",
    level: "Intermediate",
    category: "Backend",
    price: 129,
    rating: 4.7,
    students: 654,
    thumbnail: "/placeholder.svg",
    features: ["Server-side development", "API creation", "Database integration"],
    curriculum: [
      { id: 1, title: "Getting Started with Node.js", duration: "20 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
      { id: 2, title: "Express Framework", duration: "25 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" },
      { id: 3, title: "Working with Databases", duration: "30 min", videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-10"
  }
];

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);

  const getCourseById = (id: number): Course | undefined => {
    return courses.find(course => course.id === id);
  };

  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  const updateCourse = (id: number, updates: Partial<Course>) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === id ? { ...course, ...updates } : course
      )
    );
  };

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const updateReviewStatus = (id: number, status: string, reason?: string) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === id ? { 
          ...course, 
          status, 
          lastUpdated: new Date().toISOString().split('T')[0]
        } : course
      )
    );
  };

  const publishCourse = (id: number) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === id ? { 
          ...course, 
          status: 'Under Review',
          lastUpdated: new Date().toISOString().split('T')[0]
        } : course
      )
    );
  };

  return (
    <CourseContext.Provider value={{
      courses,
      getCourseById,
      addCourse,
      updateCourse,
      deleteCourse,
      updateReviewStatus,
      publishCourse
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
