export interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  img : string
}

export interface CartItem extends Product {
  quantity: number;
}
