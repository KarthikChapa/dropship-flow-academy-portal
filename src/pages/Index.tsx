import React, { useState } from 'react';
import Header from '@/components/Header';
import ModuleSidebar from '@/components/ModuleSidebar';
import ModuleContent from '@/components/ModuleContent';
import LogSection from '@/components/LogSection';
import { useToast } from '@/hooks/use-toast';

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
  notes?: string[];
  scenarios: Scenario[];
  estimatedTime: string;
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
  
  const [modules] = useState<Module[]>([
    {
      id: 'advert-variant-creation',
      title: 'Advert and Variant Creation',
      description: 'Learn to create advertisements with single and multiple variants',
      status: 'in-progress',
      sections: ['Video Tutorial', 'Scenarios'],
      video: {
        title: 'Advert Creation Guide',
        description: 'Complete guide to creating adverts with variants.',
        duration: '20:00',
      },
      progress: 50,
      notes: [
        "Adverts are the foundation of your product listings across platforms.",
        "Single variant adverts are perfect for unique products without variations.",
        "Multiple variant adverts allow customers to choose from size, color, or other options.",
        "Ensure all variant details are accurate before publishing."
      ],
      estimatedTime: '45 mins',
      scenarios: [
        { 
          id: 'avc-single', 
          title: 'Create Advert with 1 variant', 
          status: 'completed',
          estimatedTime: '20 mins'
        },
        { 
          id: 'avc-multiple', 
          title: 'Create Advert with Multiple variant', 
          status: 'in-progress',
          estimatedTime: '25 mins'
        },
      ],
    },
    {
      id: 'variant-update',
      title: 'Variant Update',
      description: 'Update stock levels, pricing, EOL status and add product images',
      status: 'not-started',
      sections: ['Video Tutorial', 'Scenarios'],
      video: {
        title: 'Variant Management Tutorial',
        description: 'Learn how to update all aspects of your product variants.',
        duration: '25:00',
      },
      progress: 0,
      notes: [
        "Regular variant updates ensure accurate inventory and pricing.",
        "Stock updates should be done frequently to avoid overselling.",
        "Wholesale pricing affects your profit margins - update carefully.",
        "EOL (End of Life) marking helps manage discontinued products."
      ],
      estimatedTime: '1 hour 30 mins',
      scenarios: [
        { 
          id: 'vu-stocks', 
          title: 'Update Stocks', 
          status: 'not-started',
          estimatedTime: '20 mins'
        },
        { 
          id: 'vu-wholesale', 
          title: 'Update Wholesale price', 
          status: 'not-started',
          estimatedTime: '25 mins'
        },
        { 
          id: 'vu-eol', 
          title: 'Update EOL', 
          status: 'not-started',
          estimatedTime: '15 mins'
        },
        { 
          id: 'vu-images', 
          title: 'Add Images', 
          status: 'not-started',
          estimatedTime: '30 mins'
        },
      ],
    },
    {
      id: 'order-fulfilment',
      title: 'Order Fulfilment',
      description: 'Complete order processing from query to delivery',
      status: 'not-started',
      sections: ['Video Tutorial', 'Scenarios'],
      video: {
        title: 'Order Fulfilment Process',
        description: 'End-to-end order fulfilment workflow.',
        duration: '30:00',
      },
      progress: 0,
      notes: [
        "Order fulfilment is critical for customer satisfaction.",
        "Invoice queries help resolve customer payment issues.",
        "Timely acknowledgement builds customer confidence.",
        "Accurate dispatch and delivery tracking reduces support queries."
      ],
      estimatedTime: '2 hours',
      scenarios: [
        { 
          id: 'of-query', 
          title: 'Query the invoice', 
          status: 'not-started',
          estimatedTime: '25 mins'
        },
        { 
          id: 'of-acknowledgement', 
          title: 'Order Acknowledgement', 
          status: 'not-started',
          estimatedTime: '20 mins'
        },
        { 
          id: 'of-dispatch', 
          title: 'Order Dispatch', 
          status: 'not-started',
          estimatedTime: '35 mins'
        },
        { 
          id: 'of-delivery', 
          title: 'Order Delivery', 
          status: 'not-started',
          estimatedTime: '40 mins'
        },
      ],
    },
    {
      id: 'order-cancellations',
      title: 'Order Cancellations',
      description: 'Handle order cancellations before and after dispatch',
      status: 'not-started',
      sections: ['Video Tutorial', 'Scenarios'],
      video: {
        title: 'Order Cancellation Management',
        description: 'Learn to handle different types of order cancellations.',
        duration: '18:00',
      },
      progress: 0,
      notes: [
        "Pre-dispatch cancellations are easier to process than post-dispatch.",
        "Post-dispatch cancellations may require coordination with shipping partners.",
        "Always communicate cancellation status clearly to customers.",
        "Update inventory levels appropriately after cancellations."
      ],
      estimatedTime: '50 mins',
      scenarios: [
        { 
          id: 'oc-predispatch', 
          title: 'PreDispatch cancellation', 
          status: 'not-started',
          estimatedTime: '20 mins'
        },
        { 
          id: 'oc-postdispatch', 
          title: 'PostDispatch Cancellation', 
          status: 'not-started',
          estimatedTime: '30 mins'
        },
      ],
    },
    {
      id: 'returns-refunds',
      title: 'Returns & Refunds',
      description: 'Manage product returns and process various types of refunds',
      status: 'not-started',
      sections: ['Video Tutorial', 'Scenarios'],
      video: {
        title: 'Returns and Refunds Processing',
        description: 'Complete guide to handling returns and refund requests.',
        duration: '22:00',
      },
      progress: 0,
      notes: [
        "Clear return policies reduce customer disputes.",
        "Accepting refunds builds customer trust and loyalty.",
        "Denying refunds should be done carefully with proper justification.",
        "Partial refunds can be used for damaged or incomplete returns."
      ],
      estimatedTime: '1 hour 15 mins',
      scenarios: [
        { 
          id: 'rr-accept', 
          title: 'Accept the Refund', 
          status: 'not-started',
          estimatedTime: '25 mins'
        },
        { 
          id: 'rr-deny', 
          title: 'Deny the Refund', 
          status: 'not-started',
          estimatedTime: '20 mins'
        },
        { 
          id: 'rr-partial', 
          title: 'Partial Refund', 
          status: 'not-started',
          estimatedTime: '30 mins'
        },
      ],
    },
    {
      id: 'invoice-credit-flows',
      title: 'Invoice & Credit Note Flows',
      description: 'Handle invoicing and credit note processes',
      status: 'not-started',
      sections: ['Video Tutorial', 'Scenarios'],
      video: {
        title: 'Invoice and Credit Note Management',
        description: 'Learn to manage invoices and credit notes effectively.',
        duration: '15:00',
      },
      progress: 0,
      notes: [
        "Proper invoicing ensures smooth financial operations.",
        "Credit notes are essential for refund and return processing.",
        "Maintain accurate records for accounting and tax purposes.",
        "Automated flows reduce manual errors and processing time."
      ],
      estimatedTime: '35 mins',
      scenarios: [
        { 
          id: 'icf-invoice', 
          title: 'Invoice Generation', 
          status: 'not-started',
          estimatedTime: '20 mins'
        },
        { 
          id: 'icf-credit', 
          title: 'Credit Note Processing', 
          status: 'not-started',
          estimatedTime: '15 mins'
        },
      ],
    },
  ]);

  const [activeModule, setActiveModule] = useState('advert-variant-creation');
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
        />
        
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="flex-1 overflow-y-auto">
            <ModuleContent
              module={currentModule}
              onFileUpload={handleFileUpload}
              onApiTest={handleApiTest}
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
