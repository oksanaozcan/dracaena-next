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

export interface Category {
  id: string;
  title: string;
  preview: string;
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