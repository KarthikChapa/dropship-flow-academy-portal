import React, { useState } from 'react';
import Header from '@/components/Header';
import ModuleSidebar from '@/components/ModuleSidebar';
import ModuleContent from '@/components/ModuleContent';
import SummarySection from '@/components/SummarySection';
import { useToast } from '@/hooks/use-toast';

interface IndexProps {
  onLogout?: () => void;
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


const Index = ({ onLogout }: IndexProps) => {
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
          estimatedTime: '20 mins',
          video: {
            title: 'Creating Single Variant Advert',
            description: 'Step-by-step guide to create an advert with one variant.',
            duration: '8:30',
          },
          notes: [
            "Single variant adverts are ideal for unique products without variations.",
            "Ensure all product details are accurate before creating the advert.",
            "Upload high-quality images for better customer engagement."
          ]
        },
        { 
          id: 'avc-multiple', 
          title: 'Create Advert with Multiple variant', 
          status: 'in-progress',
          estimatedTime: '25 mins',
          video: {
            title: 'Creating Multiple Variant Advert',
            description: 'Learn to create adverts with multiple product variants.',
            duration: '11:30',
          },
          notes: [
            "Multiple variants allow customers to choose from different options.",
            "Define clear variant attributes like size, color, or material.",
            "Each variant should have distinct pricing and stock information."
          ]
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
          estimatedTime: '20 mins',
          video: {
            title: 'Stock Management Tutorial',
            description: 'Learn to update stock levels for your variants.',
            duration: '7:45',
          },
          notes: [
            "Keep stock levels updated to prevent overselling.",
            "Use bulk update features for efficiency.",
            "Monitor low stock alerts regularly."
          ]
        },
        { 
          id: 'vu-wholesale', 
          title: 'Update Wholesale price', 
          status: 'not-started',
          estimatedTime: '25 mins',
          video: {
            title: 'Wholesale Pricing Guide',
            description: 'Update wholesale prices for your product variants.',
            duration: '9:20',
          },
          notes: [
            "Wholesale prices directly impact your profit margins.",
            "Consider market conditions when updating prices.",
            "Apply changes during off-peak hours to minimize disruption."
          ]
        },
        { 
          id: 'vu-eol', 
          title: 'Update EOL', 
          status: 'not-started',
          estimatedTime: '15 mins',
          video: {
            title: 'End of Life Product Management',
            description: 'Mark products as End of Life (EOL) when discontinuing.',
            duration: '5:30',
          },
          notes: [
            "EOL marking helps manage discontinued products.",
            "Clear remaining stock before marking as EOL.",
            "Notify customers about product discontinuation."
          ]
        },
        { 
          id: 'vu-images', 
          title: 'Add Images', 
          status: 'not-started',
          estimatedTime: '30 mins',
          video: {
            title: 'Product Image Management',
            description: 'Add and manage product images for better presentation.',
            duration: '12:15',
          },
          notes: [
            "High-quality images increase conversion rates.",
            "Use multiple angles and close-up shots.",
            "Optimize image sizes for faster loading times."
          ]
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
          estimatedTime: '25 mins',
          video: {
            title: 'Invoice Query Process',
            description: 'Learn to query and retrieve invoice information.',
            duration: '10:00',
          },
          notes: [
            "Invoice queries help resolve customer payment issues.",
            "Use proper filters to find specific invoices quickly.",
            "Maintain accurate invoice records for accounting."
          ]
        },
        { 
          id: 'of-acknowledgement', 
          title: 'Order Acknowledgement', 
          status: 'not-started',
          estimatedTime: '20 mins',
          video: {
            title: 'Order Acknowledgement Process',
            description: 'Acknowledge orders to confirm receipt and processing.',
            duration: '8:15',
          },
          notes: [
            "Timely acknowledgement builds customer confidence.",
            "Include estimated processing and delivery times.",
            "Automated acknowledgements improve efficiency."
          ]
        },
        { 
          id: 'of-dispatch', 
          title: 'Order Dispatch', 
          status: 'not-started',
          estimatedTime: '35 mins',
          video: {
            title: 'Order Dispatch Management',
            description: 'Process and dispatch orders efficiently.',
            duration: '14:30',
          },
          notes: [
            "Ensure all items are packed securely before dispatch.",
            "Generate shipping labels and tracking numbers.",
            "Update order status once dispatched."
          ]
        },
        { 
          id: 'of-delivery', 
          title: 'Order Delivery', 
          status: 'not-started',
          estimatedTime: '40 mins',
          video: {
            title: 'Delivery Tracking and Management',
            description: 'Track deliveries and handle delivery-related issues.',
            duration: '16:45',
          },
          notes: [
            "Monitor delivery status and update customers.",
            "Handle delivery exceptions and failures promptly.",
            "Collect delivery confirmations and feedback."
          ]
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
          estimatedTime: '20 mins',
          video: {
            title: 'Pre-Dispatch Cancellation Process',
            description: 'Handle order cancellations before dispatch.',
            duration: '7:30',
          },
          notes: [
            "Pre-dispatch cancellations are easier to process.",
            "Update inventory levels after cancellation.",
            "Process refunds promptly for cancelled orders."
          ]
        },
        { 
          id: 'oc-postdispatch', 
          title: 'PostDispatch Cancellation', 
          status: 'not-started',
          estimatedTime: '30 mins',
          video: {
            title: 'Post-Dispatch Cancellation Management',
            description: 'Handle cancellations after order dispatch.',
            duration: '10:30',
          },
          notes: [
            "Post-dispatch cancellations require coordination with shipping partners.",
            "Consider return shipping costs in refund calculations.",
            "Communicate clearly with customers about the process."
          ]
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
          estimatedTime: '25 mins',
          video: {
            title: 'Refund Acceptance Process',
            description: 'Process and approve customer refund requests.',
            duration: '9:45',
          },
          notes: [
            "Accepting refunds builds customer trust and loyalty.",
            "Verify return conditions before approving refunds.",
            "Process refunds within promised timeframes."
          ]
        },
        { 
          id: 'rr-deny', 
          title: 'Deny the Refund', 
          status: 'not-started',
          estimatedTime: '20 mins',
          video: {
            title: 'Refund Denial Guidelines',
            description: 'When and how to deny refund requests appropriately.',
            duration: '7:15',
          },
          notes: [
            "Denying refunds should be done carefully with proper justification.",
            "Provide clear reasons for refund denial.",
            "Offer alternative solutions when possible."
          ]
        },
        { 
          id: 'rr-partial', 
          title: 'Partial Refund', 
          status: 'not-started',
          estimatedTime: '30 mins',
          video: {
            title: 'Partial Refund Processing',
            description: 'Handle partial refunds for damaged or incomplete returns.',
            duration: '11:20',
          },
          notes: [
            "Partial refunds can be used for damaged or incomplete returns.",
            "Calculate refund amounts based on item condition.",
            "Document the reasons for partial refund amounts."
          ]
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
          estimatedTime: '20 mins',
          video: {
            title: 'Invoice Generation Process',
            description: 'Generate accurate invoices for orders.',
            duration: '8:00',
          },
          notes: [
            "Proper invoicing ensures smooth financial operations.",
            "Include all necessary details like tax and shipping.",
            "Automate invoice generation to reduce errors."
          ]
        },
        { 
          id: 'icf-credit', 
          title: 'Credit Note Processing', 
          status: 'not-started',
          estimatedTime: '15 mins',
          video: {
            title: 'Credit Note Management',
            description: 'Process credit notes for returns and refunds.',
            duration: '6:30',
          },
          notes: [
            "Credit notes are essential for refund and return processing.",
            "Maintain accurate records for accounting purposes.",
            "Link credit notes to original invoices for tracking."
          ]
        },
      ],
    },
  ]);

  const [activeModule, setActiveModule] = useState('advert-variant-creation');
  const [activeScenario, setActiveScenario] = useState<string>();

  const handleScenarioSelect = (moduleId: string, scenarioId: string) => {
    setActiveModule(moduleId);
    setActiveScenario(scenarioId);
  };

  const currentModule = modules.find(m => m.id === activeModule) || modules[0];
  const currentScenario = activeScenario 
    ? currentModule.scenarios.find(s => s.id === activeScenario)
    : undefined;

  const handleFileUpload = (file: File, type: string) => {
    const success = Math.random() > 0.3;
    
    toast({
      title: success ? "Upload Successful" : "Upload Failed",
      description: success 
        ? `Successfully processed ${file.name}` 
        : `Failed to process ${file.name}`,
      variant: success ? "default" : "destructive",
    });
  };

  const handleApiTest = (endpoint: string, data: any) => {
    const success = Math.random() > 0.4;
    
    toast({
      title: success ? "API Test Successful" : "API Test Failed",
      description: success 
        ? 'API test completed successfully' 
        : 'API test failed',
      variant: success ? "default" : "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={onLogout} />
      
      <div className="flex">
        <ModuleSidebar
          modules={modules}
          activeModule={activeModule}
          activeScenario={activeScenario}
          onModuleSelect={setActiveModule}
          onScenarioSelect={handleScenarioSelect}
        />
        
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="flex-1 overflow-y-auto">
            <ModuleContent
              module={currentModule}
              scenario={currentScenario}
              onFileUpload={handleFileUpload}
              onApiTest={handleApiTest}
            />
          </div>
          
          <div className="lg:w-96 border-l border-gray-200 bg-white p-4 overflow-y-auto">
            <SummarySection module={currentModule} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
