export interface Item {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface CartItem extends Item {
  quantity: number;
}


export interface ContextType {
  items: Item[];
  cartItems: CartItem[];
  processedItems: CartItem[];
  addProduct: (item: Item) => Promise<void>;
  updateProduct: (id: string, updatedData: Partial<Item>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  onAddToCart: (item: Item) => Promise<void>;
  onRemoveItem: (id: string) => Promise<void>;
  isItemInCart: (title: string) => boolean;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  error: string | null;
  favorites: Item[];
  addToFavorites: (item: Item) => void;
  removeFromFavorites: (id: string) => void;
  isItemInFavorites: (id: string) => boolean;
}

// const value = {
//   items,
//   cartItems,
//   processedItems,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   onAddToCart,
//   onRemoveItem,
//   isItemInCart,
//   activeCategory,
//   setActiveCategory,
//   loading,
//   error,
// };
