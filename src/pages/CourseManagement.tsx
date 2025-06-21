import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Plus, Trash, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCourses } from '@/contexts/CourseContext';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';

const CourseManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { courses, addCourse, updateCourse, publishCourse } = useCourses();
  const isEditing = id !== 'new';

  // Find existing course if editing
  const existingCourse = isEditing ? courses.find(c => c.id === parseInt(id || '0')) : null;

  const [course, setCourse] = useState({
    title: existingCourse?.title || "",
    description: existingCourse?.description || "",
    price: existingCourse?.price || 0,
    level: existingCourse?.level || "",
    category: existingCourse?.category || "",
    duration: existingCourse?.duration || "",
    language: existingCourse?.language || "English",
    status: existingCourse?.status || "Draft"
  });

  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction to Web Development", duration: "2 hours" },
    { id: 2, title: "HTML & CSS Fundamentals", duration: "6 hours" }
  ]);

  const [courseFiles, setCourseFiles] = useState<any[]>([]);

  const handleSave = () => {
    if (isEditing && existingCourse) {
      updateCourse(existingCourse.id, course);
      toast({
        title: "Course updated!",
        description: `Course "${course.title}" has been updated successfully.`,
      });
    } else {
      // Add missing properties for new course creation
      const newCourse = {
        id: Date.now(), // Generate a unique ID
        ...course,
        instructor: "Course Creator",
        thumbnail: "/placeholder.svg",
        features: ["Lifetime access", "Certificate of completion"],
        curriculum: lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration,
          videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        })),
        students: 0,
        rating: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      addCourse(newCourse);
      toast({
        title: "Course created!",
        description: `Course "${course.title}" has been created successfully.`,
      });
    }
    navigate('/teacher-dashboard');
  };

  const handlePublish = () => {
    if (isEditing && existingCourse) {
      publishCourse(existingCourse.id);
      toast({
        title: "Course submitted for review!",
        description: `Course "${course.title}" has been submitted for admin review.`,
      });
      navigate('/teacher-dashboard');
    } else {
      // Save first, then publish for new courses
      const newCourse = {
        id: Date.now(), // Generate a unique ID
        ...course,
        instructor: "Course Creator",
        thumbnail: "/placeholder.svg",
        features: ["Lifetime access", "Certificate of completion"],
        curriculum: lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration,
          videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        })),
        students: 0,
        rating: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      addCourse(newCourse);
      publishCourse(newCourse.id);
      toast({
        title: "Course submitted for review!",
        description: `Course "${course.title}" has been submitted for admin review.`,
      });
      navigate('/teacher-dashboard');
    }
  };

  const handleAddLesson = () => {
    const newLesson = {
      id: lessons.length + 1,
      title: "New Lesson",
      duration: "1 hour"
    };
    setLessons([...lessons, newLesson]);
  };

  const handleRemoveLesson = (id: number) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/teacher-dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Course' : 'Create New Course'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Update your course details and content' : 'Build your new course from scratch'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Preview</Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
              <Upload className="h-4 w-4 mr-2" />
              Publish & Submit for Review
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Set up the fundamental details of your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={course.title}
                    onChange={(e) => setCourse({...course, title: e.target.value})}
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={course.description}
                    onChange={(e) => setCourse({...course, description: e.target.value})}
                    placeholder="Describe what students will learn"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={course.category} onValueChange={(value) => setCourse({...course, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Select value={course.level} onValueChange={(value) => setCourse({...course, level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>Organize your lessons and materials</CardDescription>
                  </div>
                  <Button onClick={handleAddLesson}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                      <Input 
                        value={lesson.title}
                        onChange={(e) => {
                          const updated = lessons.map(l => 
                            l.id === lesson.id ? {...l, title: e.target.value} : l
                          );
                          setLessons(updated);
                        }}
                        className="flex-1"
                      />
                      <Input 
                        value={lesson.duration}
                        onChange={(e) => {
                          const updated = lessons.map(l => 
                            l.id === lesson.id ? {...l, duration: e.target.value} : l
                          );
                          setLessons(updated);
                        }}
                        className="w-24"
                        placeholder="Duration"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveLesson(lesson.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>Upload videos, documents, and other resources</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesChange={setCourseFiles}
                  acceptedTypes={['image/*', 'video/*', '.pdf', '.doc', '.docx', '.ppt', '.pptx']}
                  maxFiles={20}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={course.price}
                    onChange={(e) => setCourse({...course, price: parseInt(e.target.value) || 0})}
                    placeholder="0 for free"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Total Duration</Label>
                  <Input
                    id="duration"
                    value={course.duration}
                    onChange={(e) => setCourse({...course, duration: e.target.value})}
                    placeholder="e.g., 40 hours"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-2">
                    <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Thumbnail */}
            <Card>
              <CardHeader>
                <CardTitle>Course Thumbnail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload thumbnail</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
