
import React, { useState } from 'react';
import { Download, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface BulkUploadSectionProps {
  moduleId: string;
  onUpload: (file: File, type: string) => void;
}

const BulkUploadSection = ({ moduleId, onUpload }: BulkUploadSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select an Excel file (.xlsx or .xls)",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile, 'bulk');
      setSelectedFile(null);
      // Reset the input
      const input = document.getElementById('file-upload') as HTMLInputElement;
      if (input) input.value = '';
    }
  };

  const handleDownloadSample = () => {
    toast({
      title: "Downloading Sample Excel",
      description: "Sample file download started",
    });
    // Simulate download
    console.log(`Downloading sample excel for module: ${moduleId}`);
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Downloading Template",
      description: "Template file download started",
    });
    // Simulate download
    console.log(`Downloading template for module: ${moduleId}`);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileSpreadsheet className="h-5 w-5 text-green-600" />
          <span>Bulk Upload Integration</span>
        </CardTitle>
        <CardDescription>
          Upload your data in bulk using Excel files. Download sample files to understand the format.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={handleDownloadSample}
            className="flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Sample Excel</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadTemplate}
            className="flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Template</span>
          </Button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </span>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </Label>
              <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
            </div>
          </div>
        </div>

        {selectedFile && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
              <span className="text-xs text-gray-500">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <Button onClick={handleUpload} size="sm">
              Upload File
            </Button>
          </div>
        )}

        <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Important Notes:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Follow the exact format shown in the sample file</li>
              <li>Maximum file size: 10 MB</li>
              <li>Ensure all required fields are filled</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkUploadSection;
