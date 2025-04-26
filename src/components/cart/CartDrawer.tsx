
import { useCart } from "../../context/CartContext";
import { X, ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const CartDrawer = () => {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleClose}
        ></div>
      )}
      
      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-background p-4 shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" /> Your Cart
            </h2>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          {/* Cart Items */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button className="mt-6" onClick={handleClose} asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto -mx-4 px-4">
              <ul className="divide-y divide-border">
                {cart.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-24 h-24 border border-border rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-foreground">
                          <Link to={`/products/${item.productId}`} onClick={handleClose}>
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-foreground font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                      
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center border border-border rounded-md">
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-2 text-sm">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Footer */}
          {cart.length > 0 && (
            <>
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex justify-between text-foreground">
                  <p>Subtotal</p>
                  <p className="font-semibold">${cartTotal.toFixed(2)}</p>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handleClose} 
                    asChild
                    className="w-full"
                  >
                    <Link to="/checkout">
                      Checkout
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleClose} 
                    asChild
                    className="w-full"
                  >
                    <Link to="/cart">
                      View Cart
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
