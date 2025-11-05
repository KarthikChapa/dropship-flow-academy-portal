
import React from 'react';
import VideoSection from './VideoSection';
import NotesSection from './NotesSection';
import BulkUploadSection from './BulkUploadSection';
import ApiSection from './ApiSection';
import InteractiveSection from './InteractiveSection';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Module {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  sections: string[];
  video: {
    title: string;
    description: string;
    duration: string;
    url?: string;
  };
  progress: number;
  notes?: string[];
  scenarios: Array<{
    id: string;
    title: string;
    status: 'not-started' | 'in-progress' | 'completed';
    estimatedTime: string;
  }>;
  estimatedTime: string;
}

interface Scenario {
  id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  estimatedTime: string;
  video: {
    title: string;
    description: string;
    duration: string;
    url?: string;
  };
  notes?: string[];
}

interface ModuleContentProps {
  module: Module;
  scenario?: Scenario;
  onFileUpload: (file: File, type: string) => void;
  onApiTest: (endpoint: string, data: any) => void;
}

const ModuleContent = ({ module, scenario, onFileUpload, onApiTest }: ModuleContentProps) => {
  const getStatusColor = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
            <p className="text-gray-600 mt-2">{module.description}</p>
          </div>
          <Badge className={getStatusColor(module.status)}>
            {getStatusText(module.status)}
          </Badge>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Module Progress</span>
            <span>{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="w-full" />
        </div>
      </div>

      <div className="space-y-6">
        <VideoSection
          title={scenario ? scenario.video.title : module.video.title}
          description={scenario ? scenario.video.description : module.video.description}
          videoUrl={scenario ? scenario.video.url : module.video.url}
          duration={scenario ? scenario.video.duration : module.video.duration}
        />

        <NotesSection notes={scenario ? (scenario.notes || []) : (module.notes || [])} />

        {scenario && <InteractiveSection scenarioId={scenario.id} />}

        <BulkUploadSection
          moduleId={module.id}
          onUpload={onFileUpload}
        />

        <ApiSection
          moduleId={module.id}
          onApiTest={onApiTest}
        />
      </div>
    </div>
  );
};

export default ModuleContent;
