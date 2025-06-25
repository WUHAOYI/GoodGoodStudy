
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
    title: "Full Stack Web Development Bootcamp",
    description: "Master both frontend and backend development with hands-on projects and real-world applications. Learn React, Node.js, and modern web technologies.",
    instructor: "Tech Academy",
    duration: "40 hours",
    level: "Beginner",
    category: "programming",
    price: 299,
    rating: 4.8,
    students: 12450,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    features: ["Lifetime access", "Certificate of completion", "30-day money-back guarantee"],
    curriculum: [
      { id: 1, title: "Introduction to Web Development", duration: "15 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 2, title: "Setting Up Development Environment", duration: "20 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: 3, title: "Building Your First Web Page", duration: "25 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    title: "Digital Marketing Fundamentals",
    description: "Learn the essentials of digital marketing including SEO, social media marketing, content strategy, and analytics to grow your business online.",
    instructor: "Marketing Pro Institute",
    duration: "25 hours",
    level: "Intermediate",
    category: "marketing",
    price: 0,
    rating: 4.6,
    students: 8930,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    features: ["Free course", "Industry insights", "Practical examples"],
    curriculum: [
      { id: 1, title: "Introduction to Digital Marketing", duration: "12 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 2, title: "Understanding Your Audience", duration: "18 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: 3, title: "SEO Fundamentals", duration: "25 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-20"
  },
  {
    id: 3,
    title: "Project Management Professional (PMP)",
    description: "Comprehensive preparation for PMP certification covering project lifecycle, risk management, and leadership skills for successful project delivery.",
    instructor: "Business Excellence Academy",
    duration: "60 hours",
    level: "Advanced",
    category: "business",
    price: 199,
    rating: 4.9,
    students: 5670,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    features: ["PMP certification prep", "Expert instructor", "Comprehensive materials"],
    curriculum: [
      { id: 1, title: "Introduction to Project Management", duration: "20 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 2, title: "Project Lifecycle", duration: "35 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: 3, title: "Risk Management", duration: "30 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-10"
  },
  {
    id: 4,
    title: "UI/UX Design Masterclass",
    description: "Create stunning user interfaces and experiences with industry-standard design principles, prototyping tools, and user research methodologies.",
    instructor: "Design Studio Pro",
    duration: "35 hours",
    level: "Beginner",
    category: "design",
    price: 0,
    rating: 4.7,
    students: 15230,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    features: ["Free course", "Design tools", "Portfolio projects"],
    curriculum: [
      { id: 1, title: "Design Principles", duration: "20 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 2, title: "User Research", duration: "25 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: 3, title: "Prototyping", duration: "30 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-25"
  },
  {
    id: 5,
    title: "Advanced JavaScript Programming",
    description: "Deep dive into advanced JavaScript concepts, ES6+, and modern development patterns for professional web development.",
    instructor: "Code Masters",
    duration: "30 hours",
    level: "Advanced",
    category: "programming",
    price: 149,
    rating: 4.9,
    students: 8700,
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
    features: ["Advanced techniques", "Real-world projects", "Expert instructor"],
    curriculum: [
      { id: 1, title: "ES6+ Features", duration: "25 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 2, title: "Async Programming", duration: "30 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: 3, title: "Design Patterns", duration: "35 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-18"
  },
  {
    id: 6,
    title: "Photography Basics",
    description: "Learn the fundamentals of photography including composition, lighting, and post-processing techniques for stunning images.",
    instructor: "Visual Arts Academy",
    duration: "20 hours",
    level: "Beginner",
    category: "photography",
    price: 89,
    rating: 4.5,
    students: 3200,
    thumbnail: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop",
    features: ["Camera techniques", "Photo editing", "Practical exercises"],
    curriculum: [
      { id: 1, title: "Camera Basics", duration: "15 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 2, title: "Composition Rules", duration: "20 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: 3, title: "Lighting Techniques", duration: "25 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-12"
  },
  {
    id: 7,
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning using Python, pandas, and scikit-learn.",
    instructor: "Data Analytics Institute",
    duration: "50 hours",
    level: "Intermediate",
    category: "data-science",
    price: 249,
    rating: 4.8,
    students: 6800,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    features: ["Python programming", "Machine learning", "Real datasets"],
    curriculum: [
      { id: 1, title: "Python for Data Science", duration: "30 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 2, title: "Data Visualization", duration: "25 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: 3, title: "Machine Learning Basics", duration: "40 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-22"
  },
  {
    id: 8,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications using React Native for iOS and Android platforms.",
    instructor: "Mobile Dev Academy",
    duration: "45 hours",
    level: "Intermediate",
    category: "mobile-development",
    price: 199,
    rating: 4.7,
    students: 4500,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    features: ["Cross-platform development", "Native features", "App store deployment"],
    curriculum: [
      { id: 1, title: "React Native Setup", duration: "20 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: 2, title: "Navigation and Routing", duration: "25 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: 3, title: "Native Modules", duration: "30 min", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    status: "Published",
    language: "English",
    lastUpdated: "2024-01-16"
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
