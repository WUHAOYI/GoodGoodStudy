import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  MessageSquare, 
  Users, 
  Calendar, 
  FileText,
  Heart,
  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ResourceUploadModal from '@/components/ResourceUploadModal';

interface CommunityHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommunityHub = ({ isOpen, onClose }: CommunityHubProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('discussions');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'discussion',
    category: ''
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community!",
    });
    setNewPost({ title: '', content: '', type: 'discussion', category: '' });
  };

  const handleJoinEvent = (eventTitle: string) => {
    toast({
      title: "Event Joined",
      description: `You have successfully joined "${eventTitle}". Check your email for details.`,
    });
  };

  const handleDownloadResource = (resourceTitle: string) => {
    toast({
      title: "Download Started",
      description: `Downloading "${resourceTitle}"...`,
    });
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `"${resourceTitle}" has been downloaded successfully.`,
      });
    }, 2000);
  };

  const handleResourceUpload = (resource: any) => {
    toast({
      title: "Resource Uploaded",
      description: `"${resource.name}" has been uploaded successfully.`,
    });
  };

  const mockDiscussions = [
    {
      id: 1,
      title: "Best practices for React Hooks",
      content: "I'm looking for some advanced tips on using React Hooks effectively...",
      author: "John Doe",
      likes: 15,
      replies: 8,
      category: "Web Development",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Study group for Data Science course",
      content: "Anyone interested in forming a study group for the Data Science fundamentals course?",
      author: "Sarah Smith",
      likes: 23,
      replies: 12,
      category: "Data Science",
      timeAgo: "4 hours ago"
    }
  ];

  const mockEvents = [
    {
      id: 1,
      title: "Web Development Bootcamp Graduation",
      date: "Dec 15, 2024",
      time: "2:00 PM EST",
      attendees: 45,
      type: "Virtual Event"
    },
    {
      id: 2,
      title: "AI/ML Workshop Series",
      date: "Dec 20, 2024",
      time: "10:00 AM EST",
      attendees: 32,
      type: "Workshop"
    }
  ];

  const mockResources = [
    {
      id: 1,
      title: "React Cheat Sheet",
      type: "PDF",
      downloads: 234,
      uploadedBy: "Mike Johnson",
      timeAgo: "1 day ago"
    },
    {
      id: 2,
      title: "Python Interview Questions",
      type: "Document",
      downloads: 156,
      uploadedBy: "Anna Wilson",
      timeAgo: "3 days ago"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Community Hub</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="create">Create</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Discussions</h3>
                <Button onClick={() => setActiveTab('create')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </div>

              <div className="space-y-4">
                {mockDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{discussion.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{discussion.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>by {discussion.author}</span>
                            <span>{discussion.timeAgo}</span>
                            <Badge variant="outline">{discussion.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <Button onClick={() => setActiveTab('create')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>

              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <span>{event.time}</span>
                            <Badge variant="secondary">{event.type}</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        <Button onClick={() => handleJoinEvent(event.title)}>Join Event</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Shared Resources</h3>
                <Button onClick={() => setIsUploadModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Resource
                </Button>
              </div>

              <div className="space-y-4">
                {mockResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>by {resource.uploadedBy}</span>
                              <span>{resource.timeAgo}</span>
                              <span>{resource.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" onClick={() => handleDownloadResource(resource.title)}>
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <h3 className="text-lg font-semibold">Create New Post</h3>
              
              <Card>
                <CardHeader>
                  <CardTitle>Share with the Community</CardTitle>
                  <CardDescription>
                    Start a discussion, share resources, or create an event
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <div>
                      <Label htmlFor="postType">Post Type</Label>
                      <Select onValueChange={(value) => setNewPost(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select post type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="discussion">Discussion</SelectItem>
                          <SelectItem value="resource">Resource Share</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="question">Question</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="mobile-development">Mobile Development</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter a descriptive title..."
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Share your thoughts, ask a question, or describe your resource..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Post to Community
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setActiveTab('discussions')}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ResourceUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleResourceUpload}
      />
    </div>
  );
};

export default CommunityHub;
