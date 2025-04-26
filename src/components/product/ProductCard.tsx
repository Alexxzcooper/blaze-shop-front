
import { Link } from "react-router-dom";
import { Product } from "../../types";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-background">
      <Link to={`/products/${product.id}`} className="aspect-square overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2.5 py-0.5 rounded">
            Sale
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-brand-purple text-white text-xs font-medium px-2.5 py-0.5 rounded">
            Featured
          </div>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <div>
            {product.compareAtPrice ? (
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-foreground">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-lg font-semibold text-foreground">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          
          <Button 
            size="icon"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="h-8 w-8 rounded-full"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
        
        {!product.inStock && (
          <p className="mt-2 text-xs text-red-600">Out of stock</p>
        )}
        
        {product.rating && (
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {/* Star Rating */}
              {[...Array(5)].map((_, index) => (
                <svg 
                  key={index}
                  className={`h-4 w-4 ${index < Math.floor(product.rating as number) ? 'text-yellow-400' : 'text-gray-300'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="ml-1 text-xs text-muted-foreground">
              ({product.reviewCount || 0} reviews)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
