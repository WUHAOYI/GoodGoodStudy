
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, FileText, Image, Video, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  preview?: string;
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
}

const FileUpload = ({ onFilesChange, acceptedTypes = ['*'], maxFiles = 10 }: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length && uploadedFiles.length + newFiles.length < maxFiles; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      const uploadedFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url,
      };

      if (file.type.startsWith('image/')) {
        uploadedFile.preview = url;
      }

      newFiles.push(uploadedFile);
    }

    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);

    if (newFiles.length > 0) {
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file(s) uploaded successfully`,
      });
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== id);
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files) {
            handleFileUpload(e.dataTransfer.files);
          }
        }}
      >
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop files here, or click to select
        </p>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={(e) => {
            if (e.target.files) {
              handleFileUpload(e.target.files);
            }
          }}
        />
        <p className="text-xs text-gray-500 mt-2">
          Supports images, videos, and documents. Max {maxFiles} files.
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Uploaded Files ({uploadedFiles.length})</h4>
          {uploadedFiles.map((file) => (
            <Card key={file.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {file.type.startsWith('image/') && file.preview && (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  {file.type.startsWith('video/') && (
                    <div className="relative w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <Video className="h-6 w-6 text-gray-500" />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute inset-0 w-full h-full"
                        onClick={() => setVideoPreview(file.url)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {!file.type.startsWith('image/') && !file.type.startsWith('video/') && (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{file.name}</h5>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    <p className="text-xs text-gray-400">{file.type}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Video Preview Modal */}
      {videoPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Video Preview</h3>
              <Button variant="ghost" onClick={() => setVideoPreview(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <video controls className="w-full">
              <source src={videoPreview} />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
