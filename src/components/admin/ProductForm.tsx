import { useState } from "react";
import { Product } from "../../types";
import { addProduct, updateProduct } from "../../services/productService";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { Loader, X, Upload } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const isEdit = !!product;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    compareAtPrice: product?.compareAtPrice || 0,
    category: product?.category || "clothing",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(product?.images || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs
    if (type === "number") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setImages((prevImages) => [...prevImages, ...newFiles]);
      
      // Preview images
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Remove from previews
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    
    // If it's a new uploaded image, also remove from the files array
    if (index >= (product?.images.length || 0)) {
      const adjustedIndex = index - (product?.images.length || 0);
      setImages((prevImages) => prevImages.filter((_, i) => i !== adjustedIndex));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a product name",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a product description",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.price <= 0) {
      toast({
        title: "Invalid price",
        description: "Price must be greater than zero",
        variant: "destructive",
      });
      return false;
    }
    
    if (imageUrls.length === 0 && images.length === 0) {
      toast({
        title: "Missing images",
        description: "Please add at least one product image",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isEdit && product) {
        // Update existing product
        await updateProduct(product.id, formData, images);
        toast({
          title: "Product updated",
          description: `${formData.name} has been updated successfully.`,
        });
      } else {
        // Add new product
        await addProduct(formData as any, images);
        toast({
          title: "Product added",
          description: `${formData.name} has been added successfully.`,
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="min-h-[120px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="compareAtPrice">Compare At Price ($)</Label>
              <Input
                id="compareAtPrice"
                name="compareAtPrice"
                type="number"
                value={formData.compareAtPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) =>
                  handleSwitchChange("inStock", checked)
                }
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  handleSwitchChange("featured", checked)
                }
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>
          </div>
        </div>
        
        {/* Images */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {/* Existing and new image previews */}
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-md overflow-hidden border border-border group"
                >
                  <img
                    src={url}
                    alt={`Product preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {/* Upload button */}
              <label className="aspect-square rounded-md border border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Upload up to 8 images in JPG, PNG or GIF format.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Updating..." : "Creating..."}
            </>
          ) : isEdit ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
