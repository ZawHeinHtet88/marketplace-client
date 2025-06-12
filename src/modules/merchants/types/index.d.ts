export interface Merchant {
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    full: string;
  };
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  businessName: string;
  logo: string;
  description: string;
  balance: number;
  rating: number;
  createdAt: number;
  updatedAt: number;
  id: string;
}
