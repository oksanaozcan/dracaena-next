export interface IBillboard {
  id: string;  
  imageUrl: string;
}

export interface Category {
  id: string;
  title: string;
  preview: string;
}

export interface ICategoryResource {
  data: Category[]
}