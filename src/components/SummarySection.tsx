import React from 'react';
import { TrendingUp, Package, ShoppingCart, RotateCcw, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Module {
  id: string;
  title: string;
  scenarios: Array<{
    id: string;
    title: string;
    status: 'not-started' | 'in-progress' | 'completed';
    estimatedTime: string;
  }>;
}

interface SummarySectionProps {
  module: Module;
}

const SummarySection = ({ module }: SummarySectionProps) => {
  const completedScenarios = module.scenarios.filter(s => s.status === 'completed').length;
  const completionPercentage = Math.round((completedScenarios / module.scenarios.length) * 100);

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'advert-variant-creation':
        return <Package className="h-5 w-5" />;
      case 'variant-update':
        return <TrendingUp className="h-5 w-5" />;
      case 'order-fulfilment':
        return <ShoppingCart className="h-5 w-5" />;
      case 'order-cancellations':
        return <RotateCcw className="h-5 w-5" />;
      case 'returns-refunds':
        return <RotateCcw className="h-5 w-5" />;
      case 'invoice-credit-flows':
        return <FileText className="h-5 w-5" />;
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };

  const getModuleMetrics = (moduleId: string) => {
    switch (moduleId) {
      case 'advert-variant-creation':
        return [
          { label: 'SKUs created', value: 127 },
          { label: 'Single product variants', value: 89 },
          { label: 'Product-variant groups', value: 38 },
        ];
      
      case 'variant-update':
        return [
          { label: 'SKUs created', value: 156 },
          { label: 'SKUs having stock', value: 142 },
          { label: 'SKUs having wholesale price', value: 138 },
          { label: 'SKUs marked as EOL', value: 23 },
          { label: 'SKUs having images', value: 134 },
        ];
      
      case 'order-fulfilment':
        return [
          { label: 'Orders created', value: 84 },
          { label: 'Order invoices queried', value: 76 },
          { label: 'Orders acknowledged', value: 81 },
          { label: 'Orders dispatched', value: 79 },
          { label: 'Orders delivered', value: 74 },
        ];
      
      case 'order-cancellations':
        return [
          { label: 'Orders created', value: 67 },
          { label: 'Orders acknowledged', value: 63 },
          { label: 'Pre-dispatch cancellations', value: 12 },
          { label: 'Post-dispatch cancellations', value: 5 },
        ];
      
      case 'returns-refunds':
        return [
          { label: 'Orders created', value: 92 },
          { label: 'Orders acknowledged', value: 89 },
          { label: 'Orders delivered', value: 85 },
          { label: 'Returns raised', value: 18 },
          { label: 'Refunds accepted', value: 14 },
          { label: 'Refunds denied', value: 2 },
          { label: 'Partial refunds done', value: 7 },
        ];
      
      case 'invoice-credit-flows':
        return [
          { label: 'Invoices generated', value: 156 },
          { label: 'Credit notes processed', value: 23 },
        ];
      
      default:
        return [];
    }
  };

  const metrics = getModuleMetrics(module.id);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getModuleIcon(module.id)}
          <span>Module Summary</span>
        </CardTitle>
        <CardDescription>
          Performance metrics for {module.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario Completion */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Scenario Completion</span>
            <Badge variant="secondary">{completionPercentage}%</Badge>
          </div>
          <Progress value={completionPercentage} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            {completedScenarios} of {module.scenarios.length} scenarios completed
          </p>
        </div>

        {/* Module-specific Metrics */}
        <div>
          <h4 className="text-sm font-medium mb-3">Key Metrics</h4>
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className="text-sm font-medium">{metric.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scenario Status */}
        <div>
          <h4 className="text-sm font-medium mb-3">Scenario Status</h4>
          <div className="space-y-2">
            {module.scenarios.map((scenario) => (
              <div key={scenario.id} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex-1 mr-2">
                  {scenario.title}
                </span>
                <Badge 
                  variant={
                    scenario.status === 'completed' ? 'default' : 
                    scenario.status === 'in-progress' ? 'secondary' : 'outline'
                  }
                  className="text-xs"
                >
                  {scenario.status === 'completed' ? 'Done' : 
                   scenario.status === 'in-progress' ? 'Active' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummarySection;