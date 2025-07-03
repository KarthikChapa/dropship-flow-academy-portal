
import React, { useState } from 'react';
import { CheckCircle, Circle, Play, Book, Upload, Code, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubModule {
  id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  type: 'video' | 'bulk-upload' | 'api';
}

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
  subModules: SubModule[];
}

interface ModuleSidebarProps {
  modules: Module[];
  activeModule: string;
  onModuleSelect: (moduleId: string) => void;
}

const ModuleSidebar = ({ modules, activeModule, onModuleSelect }: ModuleSidebarProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([activeModule]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getStatusIcon = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSubModuleIcon = (type: SubModule['type']) => {
    switch (type) {
      case 'video':
        return <Book className="h-3 w-3" />;
      case 'bulk-upload':
        return <Upload className="h-3 w-3" />;
      case 'api':
        return <Code className="h-3 w-3" />;
    }
  };

  const getProgressColor = (progress: number, status: Module['status']) => {
    if (status === 'completed') return 'bg-emerald-500';
    if (progress > 0) return 'bg-blue-500';
    return 'bg-gray-300';
  };

  return (
    <div className="w-80 bg-white border-r border-gray-100 h-full overflow-y-auto shadow-sm">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Learning Path</h2>
          <p className="text-sm text-gray-500">Master integration flows step by step</p>
        </div>
        
        <div className="space-y-2">
          {modules.map((module, index) => {
            const isExpanded = expandedModules.includes(module.id);
            const isActive = activeModule === module.id;
            
            return (
              <div
                key={module.id}
                className="rounded-lg border border-gray-100 bg-white hover:shadow-md transition-all duration-200"
              >
                <div
                  className={cn(
                    "p-4 cursor-pointer rounded-lg transition-all duration-200",
                    isActive && "bg-blue-50 border-blue-200"
                  )}
                  onClick={() => {
                    onModuleSelect(module.id);
                    toggleModule(module.id);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {module.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(module.status)}
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {module.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                getProgressColor(module.progress, module.status)
                              )}
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {module.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && module.subModules && (
                  <div className="px-4 pb-4">
                    <div className="ml-11 space-y-2 border-l-2 border-gray-100 pl-4">
                      {module.subModules.map((subModule) => (
                        <div
                          key={subModule.id}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div className="flex-shrink-0">
                            {getStatusIcon(subModule.status)}
                          </div>
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            {getSubModuleIcon(subModule.type)}
                            <span className="text-xs font-medium text-gray-700 truncate">
                              {subModule.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
