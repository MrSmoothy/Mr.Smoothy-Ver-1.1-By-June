export interface User {
  id: string;
  username: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  healthGoal: 'Low Sugar' | 'High Protein' | 'Weight Control';
  lifestyles: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'Organic Fruits' | 'Organic Vegetables' | 'Superfoods' | 'Protein' | 'Base' | 'Topping' | 'Sweetener';
  kcal: number;
  protein_g: number;
  sugar_g: number;
  icon: string;
}

export interface Menu {
  id: string;
  category: 'Signature' | 'Classic' | 'Green Booster' | 'High-Protein Smoothies' | 'Superfruits';
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  tags: string[];
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  sugar: number;
}

export interface SelectedIngredient {
  ingredient: Ingredient;
  quantity: number;
}

export interface Packaging {
  id: string;
  type: 'Standard Cup' | 'Eco Cup' | 'Glass Bottle' | 'Tumbler';
  size: 'S' | 'M' | 'L';
  style?: string;
  price: number;
  image: string;
}

export interface Straw {
  id: string;
  type: 'Plastic Straw' | 'Paper Straw';
  price: number;
  image: string;
}

export interface CartItem {
  id: string;
  type: 'ready' | 'custom';
  name: string;
  price: number;
  nutrition: NutritionSummary;
  packaging?: Packaging;
  straw?: Straw;
  quantity: number;
  ingredients?: SelectedIngredient[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
}