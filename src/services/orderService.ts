
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CartItem, Order } from '../types';

// Create a new order
export const createOrder = async (
  userId: string,
  items: CartItem[],
  total: number,
  shippingAddress: Order['shippingAddress'],
  paymentIntentId: string
): Promise<string> => {
  const orderRef = await addDoc(collection(db, 'orders'), {
    userId,
    items,
    total,
    shippingAddress,
    paymentIntentId,
    status: 'pending',
    createdAt: serverTimestamp()
  });
  
  return orderRef.id;
};

// Get orders for a specific user
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const orderRef = collection(db, 'orders');
  const q = query(
    orderRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Order));
};

// Get a single order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const orderRef = doc(db, 'orders', orderId);
  const orderDoc = await getDoc(orderRef);
  
  if (!orderDoc.exists()) {
    return null;
  }
  
  return {
    id: orderDoc.id,
    ...orderDoc.data()
  } as Order;
};

// Update order status
export const updateOrderStatus = async (
  orderId: string, 
  status: Order['status']
): Promise<void> => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, { status });
};

// Admin: Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  const orderRef = collection(db, 'orders');
  const q = query(orderRef, orderBy('createdAt', 'desc'));
  
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Order));
};
