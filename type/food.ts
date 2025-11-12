export interface FoodItem {
  id: string;
  name: string;
  image: string;
  price?: string;
  rating?: number;
  restaurant?: {
    name?: string;
    logo?: string;
    status?: string;
  };
}