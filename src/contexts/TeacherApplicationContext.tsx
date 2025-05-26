
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TeacherApplication {
  id: number;
  fullName: string;
  email: string;
  expertise: string;
  experience: string;
  courseIdeas: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

interface TeacherApplicationContextType {
  applications: TeacherApplication[];
  addApplication: (application: Omit<TeacherApplication, 'id' | 'status' | 'appliedDate'>) => void;
  updateApplicationStatus: (id: number, status: 'approved' | 'rejected') => void;
}

const TeacherApplicationContext = createContext<TeacherApplicationContextType | undefined>(undefined);

export const TeacherApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<TeacherApplication[]>([
    {
      id: 1,
      fullName: "John Smith",
      email: "john.smith@example.com",
      expertise: "Machine Learning",
      experience: "5 years of experience in ML and AI, worked at Google and Microsoft",
      courseIdeas: "Introduction to Machine Learning, Deep Learning Fundamentals, AI Ethics",
      status: "pending",
      appliedDate: "2024-01-20"
    },
    {
      id: 2,
      fullName: "Emily Chen",
      email: "emily.chen@example.com", 
      expertise: "UX Design",
      experience: "8 years in UX design, previously at Apple and Airbnb",
      courseIdeas: "UX Design Principles, User Research Methods, Design Systems",
      status: "pending",
      appliedDate: "2024-01-18"
    }
  ]);

  const addApplication = (applicationData: Omit<TeacherApplication, 'id' | 'status' | 'appliedDate'>) => {
    const newApplication: TeacherApplication = {
      ...applicationData,
      id: Date.now(),
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [...prev, newApplication]);
  };

  const updateApplicationStatus = (id: number, status: 'approved' | 'rejected') => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  return (
    <TeacherApplicationContext.Provider value={{ applications, addApplication, updateApplicationStatus }}>
      {children}
    </TeacherApplicationContext.Provider>
  );
};

export const useTeacherApplications = () => {
  const context = useContext(TeacherApplicationContext);
  if (context === undefined) {
    throw new Error('useTeacherApplications must be used within a TeacherApplicationProvider');
  }
  return context;
};
