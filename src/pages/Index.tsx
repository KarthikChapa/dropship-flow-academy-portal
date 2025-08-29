import React, { useState } from 'react';
import Header from '@/components/Header';
import ModuleSidebar from '@/components/ModuleSidebar';
import ModuleContent from '@/components/ModuleContent';
import LogSection from '@/components/LogSection';
import { useToast } from '@/hooks/use-toast';
import { useModuleTimer } from '@/hooks/useModuleTimer';

interface SubModule {
  id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  type: 'video' | 'bulk-upload' | 'api';
  estimatedTime?: string;
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
  estimatedTime?: {
    total: string;
    bulkUpload: string;
    apiIntegration: string;
  };
}

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'bulk' | 'api';
  operation: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

const Index = () => {
  const { toast } = useToast();
  const { startModule, getElapsedTime, isModuleStarted } = useModuleTimer();
  
  const [modules] = useState<Module[]>([
    {
      id: 'product-catalog',
      title: 'Product Catalog Management',
      description: 'Learn to manage and sync your product catalog across platforms',
      status: 'in-progress',
      sections: ['Video Tutorial', 'Bulk Upload', 'API Integration'],
      video: {
        title: 'Product Catalog Integration Tutorial',
        description: 'Complete guide to product catalog management including bulk upload and API integration methods.',
        duration: '15:30',
      },
      progress: 65,
      estimatedTime: {
        total: '2-3 hours',
        bulkUpload: '45 mins',
        apiIntegration: '1.5 hours'
      },
      subModules: [
        { 
          id: 'pc-video', 
          title: 'Introduction Video', 
          status: 'completed', 
          type: 'video',
          estimatedTime: '15 mins'
        },
        { 
          id: 'pc-bulk', 
          title: 'Bulk Product Upload', 
          status: 'in-progress', 
          type: 'bulk-upload',
          estimatedTime: '45 mins'
        },
        { 
          id: 'pc-api', 
          title: 'Product API Integration', 
          status: 'not-started', 
          type: 'api',
          estimatedTime: '1.5 hours'
        },
      ],
    },
    {
      id: 'inventory-sync',
      title: 'Inventory Synchronization',
      description: 'Real-time inventory updates and stock management across channels',
      status: 'not-started',
      sections: ['Video Tutorial', 'Bulk Upload', 'API Integration'],
      video: {
        title: 'Inventory Sync Integration Tutorial',
        description: 'Learn how to keep your inventory synchronized across all platforms.',
        duration: '12:45',
      },
      progress: 0,
      estimatedTime: {
        total: '1.5-2 hours',
        bulkUpload: '30 mins',
        apiIntegration: '1 hour'
      },
      subModules: [
        { 
          id: 'is-video', 
          title: 'Sync Fundamentals', 
          status: 'not-started', 
          type: 'video',
          estimatedTime: '12 mins'
        },
        { 
          id: 'is-bulk', 
          title: 'Bulk Inventory Update', 
          status: 'not-started', 
          type: 'bulk-upload',
          estimatedTime: '30 mins'
        },
        { 
          id: 'is-api', 
          title: 'Real-time Sync API', 
          status: 'not-started', 
          type: 'api',
          estimatedTime: '1 hour'
        },
      ],
    },
    {
      id: 'order-management',
      title: 'Order Management',
      description: 'Process and track orders efficiently from creation to fulfillment',
      status: 'completed',
      sections: ['Video Tutorial', 'Bulk Upload', 'API Integration'],
      video: {
        title: 'Order Management Integration Tutorial',
        description: 'Complete order lifecycle management from creation to fulfillment.',
        duration: '18:20',
      },
      progress: 100,
      estimatedTime: {
        total: '2.5-3 hours',
        bulkUpload: '1 hour',
        apiIntegration: '1.5 hours'
      },
      subModules: [
        { 
          id: 'om-video', 
          title: 'Order Flow Overview', 
          status: 'completed', 
          type: 'video',
          estimatedTime: '18 mins'
        },
        { 
          id: 'om-bulk', 
          title: 'Bulk Order Processing', 
          status: 'completed', 
          type: 'bulk-upload',
          estimatedTime: '1 hour'
        },
        { 
          id: 'om-api', 
          title: 'Order Management API', 
          status: 'completed', 
          type: 'api',
          estimatedTime: '1.5 hours'
        },
      ],
    },
    {
      id: 'pricing-updates',
      title: 'Pricing Updates',
      description: 'Dynamic pricing strategies and bulk price modifications',
      status: 'not-started',
      sections: ['Video Tutorial', 'Bulk Upload', 'API Integration'],
      video: {
        title: 'Pricing Integration Tutorial',
        description: 'Learn to implement dynamic pricing strategies and bulk price updates.',
        duration: '10:15',
      },
      progress: 0,
      estimatedTime: {
        total: '1-1.5 hours',
        bulkUpload: '25 mins',
        apiIntegration: '45 mins'
      },
      subModules: [
        { 
          id: 'pu-video', 
          title: 'Pricing Strategy Guide', 
          status: 'not-started', 
          type: 'video',
          estimatedTime: '10 mins'
        },
        { 
          id: 'pu-bulk', 
          title: 'Bulk Price Updates', 
          status: 'not-started', 
          type: 'bulk-upload',
          estimatedTime: '25 mins'
        },
        { 
          id: 'pu-api', 
          title: 'Dynamic Pricing API', 
          status: 'not-started', 
          type: 'api',
          estimatedTime: '45 mins'
        },
      ],
    },
    {
      id: 'shipping-tracking',
      title: 'Shipping & Tracking',
      description: 'Shipping integration and automated tracking updates',
      status: 'not-started',
      sections: ['Video Tutorial', 'Bulk Upload', 'API Integration'],
      video: {
        title: 'Shipping Integration Tutorial',
        description: 'Set up shipping methods and automated tracking updates.',
        duration: '14:30',
      },
      progress: 0,
      estimatedTime: {
        total: '2-2.5 hours',
        bulkUpload: '50 mins',
        apiIntegration: '1.25 hours'
      },
      subModules: [
        { 
          id: 'st-video', 
          title: 'Shipping Setup Guide', 
          status: 'not-started', 
          type: 'video',
          estimatedTime: '14 mins'
        },
        { 
          id: 'st-bulk', 
          title: 'Bulk Shipping Config', 
          status: 'not-started', 
          type: 'bulk-upload',
          estimatedTime: '50 mins'
        },
        { 
          id: 'st-api', 
          title: 'Tracking API Integration', 
          status: 'not-started', 
          type: 'api',
          estimatedTime: '1.25 hours'
        },
      ],
    },
  ]);

  const [activeModule, setActiveModule] = useState('product-catalog');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'bulk',
      operation: 'Product Catalog Upload',
      status: 'success',
      message: 'Successfully uploaded 150 products',
      details: 'File: products_batch_1.xlsx\nProcessed: 150 items\nTime: 2.3 seconds'
    },
    {
      id: '2',
      timestamp: '2024-01-15T09:15:00Z',
      type: 'api',
      operation: 'Inventory Sync API',
      status: 'error',
      message: 'API authentication failed',
      details: 'Error: Invalid API key\nEndpoint: /api/v1/inventory\nStatus: 401 Unauthorized'
    },
    {
      id: '3',
      timestamp: '2024-01-15T08:45:00Z',
      type: 'bulk',
      operation: 'Price Update',
      status: 'warning',
      message: 'Partial upload completed with warnings',
      details: 'File: prices_update.xlsx\nProcessed: 95/100 items\nWarnings: 5 items had invalid price format'
    }
  ]);

  const currentModule = modules.find(m => m.id === activeModule) || modules[0];

  const handleFileUpload = (file: File, type: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'bulk',
      operation: `${currentModule.title} - Bulk Upload`,
      status: Math.random() > 0.3 ? 'success' : 'error',
      message: Math.random() > 0.3 
        ? `Successfully processed ${file.name}` 
        : `Failed to process ${file.name}`,
      details: `File: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB\nModule: ${currentModule.title}`
    };

    setLogs(prev => [newLog, ...prev]);
    
    toast({
      title: newLog.status === 'success' ? "Upload Successful" : "Upload Failed",
      description: newLog.message,
      variant: newLog.status === 'success' ? "default" : "destructive",
    });
  };

  const handleApiTest = (endpoint: string, data: any) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'api',
      operation: `${currentModule.title} - API Test`,
      status: Math.random() > 0.4 ? 'success' : 'error',
      message: Math.random() > 0.4 
        ? 'API test completed successfully' 
        : 'API test failed',
      details: `Endpoint: ${endpoint}\nPayload: ${JSON.stringify(data, null, 2)}\nModule: ${currentModule.title}`
    };

    setLogs(prev => [newLog, ...prev]);
    
    toast({
      title: newLog.status === 'success' ? "API Test Successful" : "API Test Failed",
      description: newLog.message,
      variant: newLog.status === 'success' ? "default" : "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <ModuleSidebar
          modules={modules}
          activeModule={activeModule}
          onModuleSelect={setActiveModule}
          getElapsedTime={getElapsedTime}
          isModuleStarted={isModuleStarted}
        />
        
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="flex-1 overflow-y-auto">
            <ModuleContent
              module={currentModule}
              onFileUpload={handleFileUpload}
              onApiTest={handleApiTest}
              onVideoStart={() => startModule(currentModule.id)}
            />
          </div>
          
          <div className="lg:w-96 border-l border-gray-200 bg-white p-4 overflow-y-auto">
            <LogSection logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
