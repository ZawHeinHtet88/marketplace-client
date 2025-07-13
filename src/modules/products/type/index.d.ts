export interface Category {
  _id: string;
  type: string;
  name: string;
  id: string;
}

export interface Tag {
  _id: string;
  name: string;
}

export interface Product {
  name: string;
  body: string;
  description: string;
  category: Category;
  type: {
    _id: string;
    name: string;
  };
  brand: string;
  tags: Tag[];
  colors: [];
  sizes: [];
  images: string[];
  price: number;
  discount: number;
  inventory: number;
  shipping: number;
  status: string;
  cashOnDelivery: boolean;
  merchant: Merchant;
  createdAt: string;
  updatedAt: string;
  id: string;
  relatedProducts : this[]
}


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
  randToken: string;
  phone: string;
  businessName: string;
  logo: string;
  description: string;
  NRCNumber: string;
  NRCFront: string;
  NRCBack: string;
  balance: boolean;
  rating: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Type {
  _id: string;
  name: string;
  image : string;
}
