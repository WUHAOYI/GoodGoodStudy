
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
      experience: "5 years of experience in ML and AI, worked at Google and Microsoft. Led several AI projects and have published research papers in the field.",
      courseIdeas: "Introduction to Machine Learning, Deep Learning Fundamentals, AI Ethics and Responsible AI Development",
      status: "pending",
      appliedDate: "2024-01-20"
    },
    {
      id: 2,
      fullName: "Emily Chen",
      email: "emily.chen@example.com", 
      expertise: "UX Design",
      experience: "8 years in UX design, previously at Apple and Airbnb. Expert in user research, prototyping, and design systems.",
      courseIdeas: "UX Design Principles, User Research Methods, Design Systems and Component Libraries",
      status: "pending",
      appliedDate: "2024-01-18"
    },
    {
      id: 3,
      fullName: "Michael Rodriguez",
      email: "michael.rodriguez@example.com",
      expertise: "Cybersecurity",
      experience: "10 years in cybersecurity, certified ethical hacker, worked with Fortune 500 companies on security audits.",
      courseIdeas: "Ethical Hacking Fundamentals, Network Security, Incident Response and Digital Forensics",
      status: "pending",
      appliedDate: "2024-01-15"
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
    
    // Show notification to admin (in a real app, this would be a backend notification)
    console.log('New teacher application submitted:', newApplication);
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
