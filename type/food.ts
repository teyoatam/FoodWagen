export interface FoodItem {
  id: string;
  name: string;
  avatar:string;
  rating?: number;
  open:boolean;
  logo:string;
  createdAt?: string;
}
export interface FoodItemInput {
  name: string;
  avatar:string;
  rating?: number;
  open:boolean;
  logo:string;
}
export interface FoodItemUpdateInput {
  id:string;
  name?: string;
  avatar?:string;
  rating?: number;
  open?:boolean;
  logo?:string;
}
export type FoodItemResponse = {
  data: FoodItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
export interface PaginatedFoodItems {
  items: FoodItem[];
  totalCount: number;
}