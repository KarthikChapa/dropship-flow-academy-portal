
import React, { useState } from 'react';
import { Code, Copy, Play, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ApiSectionProps {
  moduleId: string;
  onApiTest: (endpoint: string, data: any) => void;
}

const ApiSection = ({ moduleId, onApiTest }: ApiSectionProps) => {
  const { toast } = useToast();

  const apiTemplate = {
    endpoint: "https://api.dropship-portal.com/v1/products",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY",
      "X-Client-ID": "YOUR_CLIENT_ID"
    },
    requiredFields: [
      { name: "product_name", type: "string", description: "Name of the product" },
      { name: "sku", type: "string", description: "Stock Keeping Unit" },
      { name: "price", type: "number", description: "Product price" },
      { name: "category", type: "string", description: "Product category" },
      { name: "description", type: "string", description: "Product description" }
    ],
    optionalFields: [
      { name: "tags", type: "array", description: "Product tags" },
      { name: "images", type: "array", description: "Product image URLs" }
    ]
  };

  const samplePayload = {
    product_name: "Premium Wireless Headphones",
    sku: "PWH-001",
    price: 99.99,
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    tags: ["wireless", "audio", "premium"],
    images: [
      "https://example.com/images/headphones1.jpg",
      "https://example.com/images/headphones2.jpg"
    ]
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
    });
  };

  const testApi = () => {
    onApiTest(apiTemplate.endpoint, samplePayload);
    toast({
      title: "API Test Initiated",
      description: "Check the logs section for results",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-purple-600" />
          <span>API Integration</span>
        </CardTitle>
        <CardDescription>
          Learn how to integrate with our API endpoints for real-time data synchronization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="template" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="template">API Template</TabsTrigger>
            <TabsTrigger value="sample">Sample Request</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Endpoint Information</h4>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{apiTemplate.method}</Badge>
                      <code className="text-sm">{apiTemplate.endpoint}</code>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(apiTemplate.endpoint)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Headers</h4>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(apiTemplate.headers, null, 2)}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => copyToClipboard(JSON.stringify(apiTemplate.headers, null, 2))}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Headers
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Required Fields</h4>
                <div className="space-y-2">
                  {apiTemplate.requiredFields.map((field, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <div>
                        <code className="text-sm font-medium text-red-800">{field.name}</code>
                        <Badge variant="secondary" className="ml-2">{field.type}</Badge>
                      </div>
                      <span className="text-xs text-gray-600">{field.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Optional Fields</h4>
                <div className="space-y-2">
                  {apiTemplate.optionalFields.map((field, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div>
                        <code className="text-sm font-medium text-blue-800">{field.name}</code>
                        <Badge variant="secondary" className="ml-2">{field.type}</Badge>
                      </div>
                      <span className="text-xs text-gray-600">{field.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sample" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Sample Request Payload</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(samplePayload, null, 2)}
                </pre>
                <div className="flex space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(samplePayload, null, 2))}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Sample
                  </Button>
                  <Button
                    size="sm"
                    onClick={testApi}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Test API
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Book className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Integration Tips:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Always include proper authentication headers</li>
                    <li>Validate data before sending requests</li>
                    <li>Handle error responses appropriately</li>
                    <li>Implement retry logic for failed requests</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApiSection;
