export interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}
