export interface Customer {
  shippingAddresse: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: number;
  };
  _id: string;
  phone : string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  optimize_images : string;
  id: string;
}
