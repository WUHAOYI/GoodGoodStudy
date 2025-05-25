
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResourceViewerProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: number;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    uploadedBy: string;
    course: string;
    downloads: number;
    url: string;
  } | null;
}

const ResourceViewer = ({ isOpen, onClose, resource }: ResourceViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  if (!resource) return null;

  const handleDownload = () => {
    try {
      // Create a download link
      const link = document.createElement('a');
      link.href = resource.url;
      link.download = resource.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `${resource.name} is being downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download the resource.",
        variant: "destructive"
      });
    }
  };

  const handleOpenExternal = () => {
    try {
      window.open(resource.url, '_blank');
      toast({
        title: "Opening External",
        description: `${resource.name} opened in a new tab.`,
      });
    } catch (error) {
      toast({
        title: "Open Failed",
        description: "Unable to open the resource externally.",
        variant: "destructive"
      });
    }
  };

  const renderContent = () => {
    // Mock content based on resource type
    switch (resource.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <video 
                controls 
                className="w-full h-full rounded-lg"
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>File:</strong> {resource.name}</p>
              <p><strong>Size:</strong> {resource.size}</p>
              <p><strong>Course:</strong> {resource.course}</p>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
                alt={resource.name}
                className="max-w-full max-h-96 object-contain rounded-lg"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>File:</strong> {resource.name}</p>
              <p><strong>Size:</strong> {resource.size}</p>
              <p><strong>Course:</strong> {resource.course}</p>
            </div>
          </div>
        );
      
      case 'document':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center space-y-4">
                <div className="text-4xl">📄</div>
                <h3 className="font-semibold text-lg">{resource.name}</h3>
                <p className="text-gray-600">
                  This is a preview of the document. The actual content would be displayed here
                  in a real application with proper document viewer integration.
                </p>
                <div className="bg-white p-4 rounded border text-left">
                  <h4 className="font-medium mb-2">Sample Content:</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequat.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>File:</strong> {resource.name}</p>
              <p><strong>Size:</strong> {resource.size}</p>
              <p><strong>Course:</strong> {resource.course}</p>
              <p><strong>Uploaded by:</strong> {resource.uploadedBy}</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Preview not available for this file type.</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Resource Viewer - {resource.name}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button size="sm" variant="outline" onClick={handleOpenExternal}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open External
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceViewer;
