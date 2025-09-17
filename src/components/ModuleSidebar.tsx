
import React, { useState } from 'react';
import { CheckCircle, Circle, Play, Book, Upload, Code, ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Scenario {
  id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  estimatedTime: string;
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
  scenarios: Scenario[];
  estimatedTime: string;
}

interface ModuleSidebarProps {
  modules: Module[];
  activeModule: string;
  activeScenario?: string;
  onModuleSelect: (moduleId: string) => void;
  onScenarioSelect: (moduleId: string, scenarioId: string) => void;
}

const ModuleSidebar = ({ modules, activeModule, activeScenario, onModuleSelect, onScenarioSelect }: ModuleSidebarProps) => {
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
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getScenarioIcon = () => {
    return <Play className="h-4 w-4" />;
  };

  const getProgressColor = (progress: number, status: Module['status']) => {
    if (status === 'completed') return 'bg-emerald-500';
    if (progress > 0) return 'bg-blue-500';
    return 'bg-gray-300';
  };

  return (
    <div className="w-96 bg-white border-r border-gray-200 h-full overflow-y-auto shadow-sm">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Learning Path</h2>
          <p className="text-base text-gray-600 leading-relaxed">Master integration flows step by step</p>
        </div>
        
        <div className="space-y-4">
          {modules.map((module, index) => {
            const isExpanded = expandedModules.includes(module.id);
            const isActive = activeModule === module.id;
            
            return (
              <div
                key={module.id}
                className="rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={cn(
                    "p-6 cursor-pointer rounded-xl transition-all duration-300",
                    isActive && "bg-blue-50 border-blue-300 shadow-md"
                  )}
                  onClick={() => {
                    onModuleSelect(module.id);
                    toggleModule(module.id);
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-lg font-bold shadow-md">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          {module.title}
                        </h3>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(module.status)}
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-2">
                        {module.description}
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-semibold text-gray-700">Estimated Time:</span>
                          <span className="text-sm font-medium text-gray-800">{module.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={cn(
                                "h-2.5 rounded-full transition-all duration-500",
                                getProgressColor(module.progress, module.status)
                              )}
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {module.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && module.scenarios && (
                  <div className="px-6 pb-6">
                    <div className="ml-14 space-y-3 border-l-2 border-gray-200 pl-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Scenarios</h4>
                      {module.scenarios.map((scenario) => {
                        const isActiveScenario = activeScenario === scenario.id;
                        return (
                          <div
                            key={scenario.id}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer",
                              isActiveScenario && "bg-blue-100 border border-blue-300"
                            )}
                            onClick={() => onScenarioSelect(module.id, scenario.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {getStatusIcon(scenario.status)}
                              </div>
                              <div className="flex items-center space-x-3">
                                {getScenarioIcon()}
                                <span className="text-sm font-medium text-gray-800">
                                  {scenario.title}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{scenario.estimatedTime}</span>
                            </div>
                          </div>
                        );
                      })}
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
