
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrderById } from '../services/orderService';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';
import { CheckCircle, Loader, Package } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd fetch the order details from Firestore
    // Here we simulate a successful order for demo purposes
    const fetchOrder = async () => {
      setLoading(true);
      
      if (!orderId) {
        toast({
          title: "Error",
          description: "No order ID provided.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      if (user) {
        // If user is logged in, try to fetch a real order
        try {
          const fetchedOrder = await getOrderById(orderId);
          if (fetchedOrder) {
            setOrder(fetchedOrder);
          } else {
            // If no order found, create a mock one for demo purposes
            createMockOrder();
          }
        } catch (error) {
          console.error("Error fetching order:", error);
          createMockOrder();
        }
      } else {
        // If user is not logged in, create a mock order
        createMockOrder();
      }
      
      setLoading(false);
    };
    
    // Create a mock order for demo purposes
    const createMockOrder = () => {
      const mockOrder: Order = {
        id: orderId || `ord-${Date.now()}`,
        userId: user?.id || 'guest',
        items: [
          {
            id: 'item1',
            productId: 'prod1',
            name: 'Sample Product 1',
            price: 49.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&q=75&fit=crop&w=300',
          },
          {
            id: 'item2',
            productId: 'prod2',
            name: 'Sample Product 2',
            price: 29.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&q=75&fit=crop&w=300',
          },
        ],
        total: 129.97,
        status: 'pending',
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          postalCode: '12345',
          country: 'US',
        },
        paymentIntentId: 'pi_simulated',
        createdAt: new Date(),
      };
      
      setOrder(mockOrder);
    };
    
    fetchOrder();
  }, [orderId, user, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-8">We couldn't find the order you're looking for.</p>
        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>
      
      <div className="rounded-lg border border-border overflow-hidden mb-8">
        <div className="bg-muted p-4 border-b border-border">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium">Order #{order.id}</h2>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {order.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden border border-border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border mt-6 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Tax</span>
              <span>${(order.total * 0.07).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-border mt-2 pt-2">
              <span>Total</span>
              <span>${(order.total + order.total * 0.07).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-medium mb-2">Shipping Address</h3>
          <address className="not-italic text-muted-foreground">
            {order.shippingAddress.name}<br />
            {order.shippingAddress.street}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
            {order.shippingAddress.country}
          </address>
        </div>
        
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-medium mb-2">Delivery Information</h3>
          <div className="text-muted-foreground">
            <p className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Estimated delivery: 3-5 business days
            </p>
            <p className="mt-2">
              You will receive shipping confirmation and tracking information once your order ships.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
