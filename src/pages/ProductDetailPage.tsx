
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/productService';
import { Product } from '../types';
import { Loader, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/components/ui/use-toast';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      setLoading(true);
      try {
        const fetchedProduct = await getProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          // Reset selected image when product changes
          setSelectedImage(0);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId, toast]);
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Back to Shop</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category}`}>{product.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="text-muted-foreground">{product.name}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      
      {/* Back Button - Mobile Only */}
      <div className="mb-4 sm:hidden">
        <Button variant="outline" size="sm" asChild>
          <Link to="/products" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2 space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-border">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border ${
                    selectedImage === index
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : 'border-border'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Image ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          {/* Price */}
          <div className="mt-4 flex items-center">
            <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="ml-2 text-lg text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Rating */}
          {product.rating && (
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg 
                    key={index}
                    className={`h-5 w-5 ${index < Math.floor(product.rating as number) ? 'text-yellow-400' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </p>
            </div>
          )}
          
          {/* Availability */}
          <div className="mt-4">
            <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          
          {/* Short Description */}
          <div className="mt-6">
            <p className="text-muted-foreground">
              {product.description.substring(0, 150)}...
            </p>
          </div>
          
          {/* Add to Cart Section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || !product.inStock}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={!product.inStock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              className="w-full h-12 text-lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-10">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 mt-4">
                    <li>Category: {product.category}</li>
                    <li>Product ID: {product.id}</li>
                    <li>In stock: {product.inStock ? 'Yes' : 'No'}</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>Free shipping on orders over $50. Standard shipping takes 3-5 business days.</p>
                  <p className="mt-2">Express shipping available for an additional fee.</p>
                </div>
              </TabsContent>
              <TabsContent value="returns" className="mt-4">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>We accept returns within 30 days of delivery for a full refund.</p>
                  <p className="mt-2">Items must be in original, unworn condition with tags attached.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
