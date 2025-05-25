
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Image, 
  Video, 
  Upload,
  Search,
  Trash2,
  ArrowLeft,
  Download,
  Eye,
  Filter
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ResourceManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Mock data for resources
  const [resources, setResources] = useState([
    {
      id: 1,
      name: "course-intro-video.mp4",
      type: "video",
      size: "45.2 MB",
      uploadDate: "2024-05-15",
      uploadedBy: "Dr. Sarah Johnson",
      course: "Full Stack Bootcamp",
      downloads: 234,
      url: "#"
    },
    {
      id: 2,
      name: "react-patterns-slides.pdf",
      type: "document",
      size: "2.1 MB",
      uploadDate: "2024-05-14",
      uploadedBy: "Prof. Michael Chen",
      course: "Advanced React",
      downloads: 156,
      url: "#"
    },
    {
      id: 3,
      name: "javascript-cheatsheet.png",
      type: "image",
      size: "850 KB",
      uploadDate: "2024-05-13",
      uploadedBy: "Jane Smith",
      course: "JavaScript Fundamentals",
      downloads: 89,
      url: "#"
    },
    {
      id: 4,
      name: "database-design-tutorial.mp4",
      type: "video",
      size: "67.8 MB",
      uploadDate: "2024-05-12",
      uploadedBy: "Dr. Sarah Johnson",
      course: "Database Management",
      downloads: 312,
      url: "#"
    },
    {
      id: 5,
      name: "ui-wireframes-template.fig",
      type: "document",
      size: "1.5 MB",
      uploadDate: "2024-05-11",
      uploadedBy: "Design Team",
      course: "UI/UX Design",
      downloads: 78,
      url: "#"
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-5 w-5 text-blue-500" />;
      case "image": return <Image className="h-5 w-5 text-green-500" />;
      case "document": return <FileText className="h-5 w-5 text-orange-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-blue-100 text-blue-800";
      case "image": return "bg-green-100 text-green-800";
      case "document": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDeleteResource = (resourceId: number, resourceName: string) => {
    if (confirm(`Are you sure you want to delete ${resourceName}?`)) {
      setResources(resources.filter(r => r.id !== resourceId));
      toast({
        title: "Resource Deleted",
        description: `${resourceName} has been deleted successfully.`,
      });
    }
  };

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const resourceTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'video', label: 'Videos' },
    { value: 'image', label: 'Images' },
    { value: 'document', label: 'Documents' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin Dashboard
        </Button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Management</h1>
            <p className="text-gray-600">Manage files, images, and videos across all courses</p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Resource
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search resources by name, course, or uploader..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {resourceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Resources Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Resources ({filteredResources.length})</CardTitle>
            <CardDescription>Manage platform resources and downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getTypeIcon(resource.type)}
                    <div>
                      <h4 className="font-medium text-gray-900">{resource.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge className={getTypeBadgeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        <span>•</span>
                        <span>{resource.size}</span>
                        <span>•</span>
                        <span>Course: {resource.course}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Uploaded by {resource.uploadedBy} on {new Date(resource.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600 mr-4">
                      {resource.downloads} downloads
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteResource(resource.id, resource.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600 mb-6">No resources match your search criteria.</p>
                <Button onClick={() => { setSearchTerm(''); setSelectedType('all'); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{resources.filter(r => r.type === 'video').length}</div>
              <div className="text-sm text-gray-600">Videos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{resources.filter(r => r.type === 'image').length}</div>
              <div className="text-sm text-gray-600">Images</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{resources.filter(r => r.type === 'document').length}</div>
              <div className="text-sm text-gray-600">Documents</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{resources.reduce((sum, r) => sum + r.downloads, 0)}</div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagement;
