export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  material: string;
  image_url: string;
  product_category_id: number;
  created_at: Date;
}

export enum LOADING_PRODUCTS_STATE {
  NOT_STARTED = 'NOT_STARTED',
  LOADING = 'LOADING',
  FINISHED = 'FINISHED'
}
