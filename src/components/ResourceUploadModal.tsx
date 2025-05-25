
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResourceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (resource: any) => void;
}

const ResourceUploadModal = ({ isOpen, onClose, onUpload }: ResourceUploadModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    description: '',
    type: 'document'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newResource = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      size: '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Admin',
      course: formData.course,
      downloads: 0,
      url: '#'
    };
    
    onUpload(newResource);
    toast({
      title: "Resource Uploaded",
      description: `${formData.name} has been uploaded successfully.`,
    });
    onClose();
    setFormData({ name: '', course: '', description: '', type: 'document' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Resource</DialogTitle>
          <DialogDescription>
            Add a new resource to the platform
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Resource Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., React Tutorial Video"
              required
            />
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={formData.course}
              onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
              placeholder="e.g., Advanced React"
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Resource Type</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="document">Document</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
            </select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the resource"
            />
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <input type="file" className="hidden" />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Upload</Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceUploadModal;
