
import React from 'react';
import { CheckCircle, Circle, Play, Book, Upload, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Module {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  sections: string[];
}

interface ModuleSidebarProps {
  modules: Module[];
  activeModule: string;
  onModuleSelect: (moduleId: string) => void;
}

const ModuleSidebar = ({ modules, activeModule, onModuleSelect }: ModuleSidebarProps) => {
  const getStatusIcon = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return 'border-l-green-500 bg-green-50';
      case 'in-progress':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-300 bg-white';
    }
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Modules</h2>
        
        <div className="space-y-3">
          {modules.map((module) => (
            <div
              key={module.id}
              className={cn(
                "border-l-4 p-4 cursor-pointer transition-all duration-200 hover:shadow-md rounded-r-lg",
                getStatusColor(module.status),
                activeModule === module.id && "ring-2 ring-blue-500"
              )}
              onClick={() => onModuleSelect(module.id)}
            >
              <div className="flex items-start space-x-3">
                {getStatusIcon(module.status)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {module.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {module.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Book className="h-3 w-3 mr-1" />
                      Video
                    </div>
                    <div className="flex items-center">
                      <Upload className="h-3 w-3 mr-1" />
                      Bulk Upload
                    </div>
                    <div className="flex items-center">
                      <Code className="h-3 w-3 mr-1" />
                      API
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
