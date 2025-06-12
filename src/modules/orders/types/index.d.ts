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
