export interface IImage {
  id: string;
  url: string;
}

export interface IBillboard {
  data: {
    id: string;  
    image: string;
    description: string;
  }  
}

export interface CategoryFilter {
  id:          string;
  title:       string;
  category_id: string;
}

export interface Tag {
  id:                 string;
  title:              string;
  category_filter_id: string;
}

export interface Category {
  id: string;
  title: string;
  preview: string;
  category_filters: CategoryFilter[];
  tags: Tag[];
}

export interface ICategoryResource {
  data: Category[]
}

export interface IProduct {  
  id: string;  
  title: string;
  description: string;
  content: string;
  preview: string;
  images?: IImage[];
  price: string;
  category: Category;
  isFeatured?: boolean;
  size?: ISize;
  color?: IColor;    
}

export interface IProductResource {
  data: IProduct
  id: string;  
  title: string;
  description: string;
  content: string;
  preview: string;
  images?: IImage[];
  price: string;
  category: Category;
  isFeatured?: boolean;
  size?: ISize;
  color?: IColor;    
}

export interface ISize {
  id: string;
  name: string;
  value: string;
}

export interface IColor {
  id: string;
  name: string;
  value: string;
}

export interface IProductsResource {
  data: IProduct[]
}

export interface ListApiItem {
  id: number;
  value: string;
  label: string;
}

export interface IUser {
  firstName: string | null;
}

export interface IOrder {
  id: number;
  session_id: string;
  customer_name: string;
  customer_email: string;
  payment_status: number;
  total_amount: string;
  payment_method: string;
  shipping_address: string | null;
  billing_address: string | null;
  discount_amount: string | null;
  created_at: string;
}