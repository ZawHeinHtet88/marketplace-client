export interface Order {
  _id: string;
  code: string;
  productId: string;
  userId: string;
  payment: string;
  isPaid: boolean;
  status: string;
  quantity: number;
  merchant: string;
  isDelivered: boolean;
  id: string;
}

export interface PlacedOrder {
  _id: string;
  code: string;
  productId: {
    _id: string;
    name: string;
    images: string[];
    price: number;
    shipping: number;
  };
  userId: string;
  payment: string;
  isPaid: boolean;
  status: string;
  quantity: number;
  merchant: string;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  total: number;
}
