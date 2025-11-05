import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, CheckCircle, XCircle, Package, Clock } from 'lucide-react';

interface InteractiveSectionProps {
  scenarioId: string;
}

const InteractiveSection = ({ scenarioId }: InteractiveSectionProps) => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);

  const handleCreateOrder = (type: string) => {
    const orderId = `ORD-${Date.now()}`;
    toast({
      title: 'Order Created',
      description: `${type} created successfully: ${orderId}`,
    });
    
    setOrders(prev => [{
      id: orderId,
      type,
      date: new Date().toISOString(),
      status: 'pending',
      acknowledged: false,
      dispatched: false,
      delivered: false,
      cancelled: false
    }, ...prev]);
  };

  const handleCreateAcknowledgedOrder = () => {
    const orderId = `ORD-${Date.now()}`;
    toast({
      title: 'Order Created & Acknowledged',
      description: `Order created and acknowledged: ${orderId}`,
    });
    
    setOrders(prev => [{
      id: orderId,
      type: 'Acknowledged Order',
      date: new Date().toISOString(),
      status: 'acknowledged',
      acknowledged: true,
      dispatched: false,
      delivered: false,
      cancelled: false
    }, ...prev]);
  };

  const handleCreateDispatchedOrder = () => {
    const orderId = `ORD-${Date.now()}`;
    toast({
      title: 'Order Created, Acknowledged & Dispatched',
      description: `Order fully processed: ${orderId}`,
    });
    
    setOrders(prev => [{
      id: orderId,
      type: 'Dispatched Order',
      date: new Date().toISOString(),
      status: 'dispatched',
      acknowledged: true,
      dispatched: true,
      delivered: false,
      cancelled: false
    }, ...prev]);
  };

  const handleRaiseRefund = (orderId: string) => {
    toast({
      title: 'Refund Raised',
      description: `Return initiated for order ${orderId}`,
    });
  };

  // Render content based on scenario
  const renderScenarioContent = () => {
    switch (scenarioId) {
      case 'avc-single':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Created Adverts - Single Variant</CardTitle>
              <CardDescription>Scrollable list of variants (decreasing order of date)</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Advert ID</TableHead>
                      <TableHead>Advert Name</TableHead>
                      <TableHead>Variant IDs</TableHead>
                      <TableHead>Variant MPN</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">No data yet</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'avc-multiple':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Created Adverts - Multiple Variants</CardTitle>
              <CardDescription>Scrollable list of variants (decreasing order of date)</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Advert ID</TableHead>
                      <TableHead>Advert Name</TableHead>
                      <TableHead>Variant IDs</TableHead>
                      <TableHead>Variant MPN</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">No data yet</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'vu-stocks':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Stock Updates</CardTitle>
              <CardDescription>Variants with no stock appear on top (decreasing order of date created)</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variant ID</TableHead>
                      <TableHead>Variant Name</TableHead>
                      <TableHead>Variant MPN/EAN</TableHead>
                      <TableHead>Stock Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">No data yet</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'vu-wholesale':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Wholesale Price Updates</CardTitle>
              <CardDescription>Variants with no wholesale price appear on top (decreasing order of date created)</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variant ID</TableHead>
                      <TableHead>Variant Name</TableHead>
                      <TableHead>Variant MPN/EAN</TableHead>
                      <TableHead>Wholesale Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">No data yet</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'vu-eol':
        return (
          <Card>
            <CardHeader>
              <CardTitle>EOL Status Updates</CardTitle>
              <CardDescription>Scrollable list of variants</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variant ID</TableHead>
                      <TableHead>Variant Name</TableHead>
                      <TableHead>Variant MPN/EAN</TableHead>
                      <TableHead>EOL Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">No data yet</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'vu-images':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Image Management</CardTitle>
              <CardDescription>Scrollable list of variants</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variant ID</TableHead>
                      <TableHead>Variant Name</TableHead>
                      <TableHead>Variant MPN/EAN</TableHead>
                      <TableHead>Images Uploaded</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">No data yet</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'of-query':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Invoice Query</CardTitle>
              <CardDescription>Query marketplace order invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>MP Order Invoice ID</TableHead>
                      <TableHead>Queried</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">No data yet</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'of-acknowledgement':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Orders</CardTitle>
                <CardDescription>Click buttons to create orders with various combinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button onClick={() => handleCreateOrder('Single item order')} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Single Item Order
                  </Button>
                  <Button onClick={() => handleCreateOrder('Multiple items order')} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Multiple Items Order
                  </Button>
                  <Button onClick={() => handleCreateOrder('Order with every shipping method')} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Every Shipping Method
                  </Button>
                  <Button onClick={() => handleCreateOrder('Order with EE insurance')} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Order with EE Insurance
                  </Button>
                  <Button onClick={() => handleCreateOrder('Order with EE loan')} className="w-full md:col-span-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Order with EE Loan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Orders Pending Acknowledgement</CardTitle>
                <CardDescription>Latest unacknowledged orders appear on top</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date Created</TableHead>
                        <TableHead>Cart Details</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.filter(o => !o.acknowledged).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No pending orders
                          </TableCell>
                        </TableRow>
                      ) : (
                        orders.filter(o => !o.acknowledged).map(order => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                <Clock className="mr-1 h-3 w-3" />
                                Pending
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );

      case 'of-dispatch':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Order Dispatch</CardTitle>
              <CardDescription>Acknowledged orders and dispatch status</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Dispatch Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.filter(o => o.acknowledged).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No acknowledged orders
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.filter(o => o.acknowledged).map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            {order.dispatched ? (
                              <Badge variant="default">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Dispatched
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Pending</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'of-delivery':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Order Delivery</CardTitle>
              <CardDescription>Dispatched orders and delivery status</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Delivery Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.filter(o => o.dispatched).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No dispatched orders
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.filter(o => o.dispatched).map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            {order.delivered ? (
                              <Badge variant="default">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Delivered
                              </Badge>
                            ) : (
                              <Badge variant="secondary">In Transit</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'oc-predispatch':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Acknowledged Orders</CardTitle>
                <CardDescription>Automatically creates and acknowledges an order</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleCreateAcknowledgedOrder} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create & Acknowledge Order
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pre-Dispatch Cancellations</CardTitle>
                <CardDescription>Orders available for pre-dispatch cancellation</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Order Cancelled</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.filter(o => !o.acknowledged).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center text-muted-foreground">
                            No orders available for pre-dispatch cancellation
                          </TableCell>
                        </TableRow>
                      ) : (
                        orders.filter(o => !o.acknowledged).map(order => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              {order.cancelled ? (
                                <Badge variant="destructive">
                                  <XCircle className="mr-1 h-3 w-3" />
                                  Yes
                                </Badge>
                              ) : (
                                <Badge variant="secondary">No</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );

      case 'oc-postdispatch':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Dispatched Orders</CardTitle>
                <CardDescription>Automatically creates, acknowledges, and dispatches an order</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleCreateDispatchedOrder} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create, Acknowledge & Dispatch Order
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Post-Dispatch Cancellations</CardTitle>
                <CardDescription>Acknowledged orders available for post-dispatch cancellation</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Order Cancelled</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.filter(o => o.acknowledged).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center text-muted-foreground">
                            No acknowledged orders available for cancellation
                          </TableCell>
                        </TableRow>
                      ) : (
                        orders.filter(o => o.acknowledged).map(order => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              {order.cancelled ? (
                                <Badge variant="destructive">
                                  <XCircle className="mr-1 h-3 w-3" />
                                  Yes
                                </Badge>
                              ) : (
                                <Badge variant="secondary">No</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );

      case 'rr-accept':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Accept Refund</CardTitle>
                <CardDescription>Delivered orders waiting for refund</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.filter(o => o.delivered).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No delivered orders available for refund</p>
                      <Button onClick={handleCreateDispatchedOrder} className="w-full">
                        <Package className="mr-2 h-4 w-4" />
                        Create Order → Acknowledge → Dispatch → Deliver → Raise Return
                      </Button>
                    </div>
                  ) : (
                    <ScrollArea className="h-[200px] w-full">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.filter(o => o.delivered).map(order => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>
                                <Button size="sm" onClick={() => handleRaiseRefund(order.id)}>
                                  Raise Refund
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refund Status</CardTitle>
                <CardDescription>Return requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Refund Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No refund requests yet
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      {renderScenarioContent()}
    </div>
  );
};

export default InteractiveSection;
