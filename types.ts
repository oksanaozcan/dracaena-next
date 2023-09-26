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