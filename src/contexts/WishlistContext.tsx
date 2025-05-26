
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WishlistItem {
  id: number;
  title: string;
  instructor: string;
  price: number;
  image: string;
  rating: number;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (courseId: number) => void;
  isInWishlist: (courseId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      if (!prev.find(i => i.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromWishlist = (courseId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== courseId));
  };

  const isInWishlist = (courseId: number) => {
    return wishlistItems.some(item => item.id === courseId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
