import { create } from 'zustand';
import { User, CartItem, SelectedIngredient, NutritionSummary, Menu } from '../types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  lifestyles: string[];
  
  // Cart state
  cart: CartItem[];
  
  // Custom smoothie state
  selectedIngredients: SelectedIngredient[];
  nutritionSummary: NutritionSummary | null;
  
  // UI state
  selectedMenu: Menu | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLifestyles: (lifestyles: string[]) => void;
  
  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Custom smoothie actions
  addIngredient: (ingredient: SelectedIngredient) => void;
  removeIngredient: (ingredientId: string) => void;
  updateIngredientQuantity: (ingredientId: string, quantity: number) => void;
  clearSelectedIngredients: () => void;
  calculateNutrition: () => void;
  
  // UI actions
  setSelectedMenu: (menu: Menu | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  lifestyles: [],
  cart: [],
  selectedIngredients: [],
  nutritionSummary: null,
  selectedMenu: null,
  
  // User actions
  setUser: (user) => set({ user }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setLifestyles: (lifestyles) => set({ lifestyles }),
  
  // Cart actions
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),
  
  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== itemId)
  })),
  
  updateQuantity: (itemId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0)
  })),
  
  clearCart: () => set({ cart: [] }),
  
  // Custom smoothie actions
  addIngredient: (ingredient) => set((state) => {
    const existingIngredient = state.selectedIngredients.find(
      item => item.ingredient.id === ingredient.ingredient.id
    );
    if (existingIngredient) {
      return {
        selectedIngredients: state.selectedIngredients.map(item =>
          item.ingredient.id === ingredient.ingredient.id
            ? { ...item, quantity: item.quantity + ingredient.quantity }
            : item
        )
      };
    }
    return { selectedIngredients: [...state.selectedIngredients, ingredient] };
  }),
  
  removeIngredient: (ingredientId) => set((state) => ({
    selectedIngredients: state.selectedIngredients.filter(
      item => item.ingredient.id !== ingredientId
    )
  })),
  
  updateIngredientQuantity: (ingredientId, quantity) => set((state) => ({
    selectedIngredients: state.selectedIngredients.map(item =>
      item.ingredient.id === ingredientId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0)
  })),
  
  clearSelectedIngredients: () => set({ 
    selectedIngredients: [], 
    nutritionSummary: null 
  }),
  
  calculateNutrition: () => {
    const { selectedIngredients } = get();
    const totalCalories = selectedIngredients.reduce(
      (sum, item) => sum + (item.ingredient.kcal * item.quantity),
      0
    );
    const totalProtein = selectedIngredients.reduce(
      (sum, item) => sum + (item.ingredient.protein_g * item.quantity),
      0
    );
    const totalSugar = selectedIngredients.reduce(
      (sum, item) => sum + (item.ingredient.sugar_g * item.quantity),
      0
    );
    
    set({
      nutritionSummary: {
        calories: Math.round(totalCalories),
        protein: Math.round(totalProtein * 10) / 10,
        sugar: Math.round(totalSugar * 10) / 10
      }
    });
  },
  
  // UI actions
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
}));