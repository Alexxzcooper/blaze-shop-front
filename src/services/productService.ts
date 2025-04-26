
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  limit,
  orderBy,
  serverTimestamp,
  QueryConstraint,
  DocumentData
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Product, Category } from '../types';

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
};

// Get products by category
export const getProductsByCategory = async (category: Category): Promise<Product[]> => {
  if (category === 'all') {
    return getProducts();
  }
  
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('category', '==', category));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
};

// Get featured products
export const getFeaturedProducts = async (limitCount = 4): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const q = query(
    productsRef, 
    where('featured', '==', true),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  const productRef = doc(db, 'products', id);
  const productDoc = await getDoc(productRef);
  
  if (!productDoc.exists()) {
    return null;
  }
  
  return {
    id: productDoc.id,
    ...productDoc.data()
  } as Product;
};

// Search products
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  // Note: Firestore doesn't support text search natively
  // This is a simple implementation that searches by name
  // For a production app, consider using Algolia or similar
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Admin Functions

// Add a new product
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>, imageFiles: File[]): Promise<string> => {
  // Upload images first
  const imageUrls: string[] = [];
  
  for (const file of imageFiles) {
    const storageRef = ref(storage, `products/${file.name}-${Date.now()}`);
    const uploadResult = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadResult.ref);
    imageUrls.push(downloadUrl);
  }
  
  // Add the product to Firestore
  const productRef = await addDoc(collection(db, 'products'), {
    ...product,
    images: imageUrls,
    createdAt: serverTimestamp()
  });
  
  return productRef.id;
};

// Update a product
export const updateProduct = async (id: string, updates: Partial<Product>, newImageFiles?: File[]): Promise<void> => {
  const productRef = doc(db, 'products', id);
  
  let updates_with_images = { ...updates };
  
  // Upload new images if any
  if (newImageFiles && newImageFiles.length > 0) {
    const imageUrls: string[] = [];
    
    for (const file of newImageFiles) {
      const storageRef = ref(storage, `products/${file.name}-${Date.now()}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      imageUrls.push(downloadUrl);
    }
    
    // If we have an existing product, append to images array or replace
    const productDoc = await getDoc(productRef);
    if (productDoc.exists()) {
      const existingImages = productDoc.data().images || [];
      updates_with_images.images = [...existingImages, ...imageUrls];
    } else {
      updates_with_images.images = imageUrls;
    }
  }
  
  await updateDoc(productRef, {
    ...updates_with_images,
  });
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id));
};

// Get categories
export const getCategories = async (): Promise<string[]> => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  
  const categories = new Set<string>();
  
  snapshot.docs.forEach(doc => {
    const category = doc.data().category;
    if (category) {
      categories.add(category);
    }
  });
  
  return ['all', ...Array.from(categories)];
};
