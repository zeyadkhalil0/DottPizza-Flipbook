export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
}

export interface MenuData {
  appetizers: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
}